const moment = require(`moment`);
const config = require(`${process.cwd()}/JSON/config.json`);
const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `unban`,
    description: `Sbandisce un utente dal server`,
    data: {
        name: `unban`,
        description: `Sbandisce un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `ID dell'utente da sbandire`,
                type: `STRING`,
                required: true
            }
        ],
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        let id = interaction.options.getString(`utente`);

        let user = await client.users.fetch(id).catch((err) => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        })

        if (!user) return;

        database.collection(`UserStats`).find({ id: user.id }).toArray(async function (err, result) {
            if (!result[0]) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Questo utente non ha uno stato di moderazione*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            if (result[0]?.moderation.type != `banned`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Questo utente non è bannato*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            interaction.guild.members.unban(user).catch(() => { });
            database.collection(`Staff`).find({ id: interaction.user.id }).toArray(function (err, result) {
                if (!result[0]) {
                    database.collection(`Staff`).insertOne({ username: interaction.user.username, id: interaction.user.id, rank: ``, messages: 0, vctime: 0, partnerships: 0, actions: 1 });
                } else if (result[0]) {
                    database.collection(`Staff`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            actions: 1,
                        }
                    })
                }
            })

            let embed1 = new Discord.MessageEmbed()
                .setAuthor({ name: `[UNBAN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(config.images.rogiban)
                .setColor(`PURPLE`)
                .addField(`👤 Utente:`, `Nome: ${user.username} - ID: ${user.id}\n||${user.toString()}||`);

            let embed3 = new Discord.MessageEmbed()
                .setTitle(`📛 UNBAN 📛`)
                .setColor(`GREEN`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`);
            client.channels.cache.get(config.idcanali.logs.moderation.unbans).send({ embeds: [embed3] });
            interaction.editReply({ embeds: [embed1] });

            if (result[0]) {
                database.collection(`UserStats`).updateOne({ id: user.id }, {
                    $set: { moderation: {} }
                })
            }
        })
    }
}