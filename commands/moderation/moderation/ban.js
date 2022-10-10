const moment = require(`moment`);
const config = require(`${process.cwd()}/JSON/config.json`);
const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `ban`,
    data: {
        name: `ban`,
        description: `Bandisce un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `ID dell'utente da bandire`,
                type: `STRING`,
                required: true
            },
            {
                name: `motivo`,
                description: `Motivo del bandimento`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let id = interaction.options.getString(`utente`)
            if (id == `793768313934577664`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`😳 COSA? 😳`)
                    .setDescription(`Vuoi seriamente bannare GiulioAndCode?! 😳😳`)
                    .setColor(`ORANGE`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            let user = await client.users.fetch(id).catch((err) => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            })
            if (!user) return

            let guildMember = await interaction.guild.members.cache.find(x => x.id == user.id)

            if (guildMember) {

                let userpermission = await getUserPermissionLevel(guildMember);
                let staffpermission = await getUserPermissionLevel(interaction.member);

                if (userpermission >= staffpermission) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`ERRORE`)
                        .setDescription(`*Non hai il permesso per bannare quest'utente*`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }
            }

            database.collection(`UserStats`).find({ id: user.id }).toArray(async function (err, result) {
                if (!result[0]) {
                    database.collection(`UserStats`).insertOne({
                        username: user.username, id: user.id, moderation: {}, leavedAt: 0
                    })
                }
                if (result[0]?.moderation.type == `banned`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*${user} è già bannato da questo server*`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`;
                let dm = true;
                let embed1 = new Discord.MessageEmbed()
                    .setAuthor({ name: `[BAN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`⚠️ **HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                    .setThumbnail(config.images.rogiban)
                    .setColor(`PURPLE`)
                    .addField(`👤 Utente:`, `Nome: ${user.username} - ID: ${user.id}\n||${user.toString()}||`)
                    .addField(`📖 Motivo:`, reason.toString());

                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`SEI STATO BANDITO`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setColor(`RED`)
                    .addField(`👤 Bandito da:`, interaction.member.toString(), true)
                    .addField(`🏠 Bandito in:`, interaction.guild.name, true)
                    .addField(`📖 Per il motivo:`, reason.toString(), true);
                await user.send({ embeds: [embed2] }).catch(() => { dm = false });

                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`🚫 BAN 🚫`)
                    .setColor(`RED`)
                    .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
                    .addField(`📖 Motivo:`, reason);

                if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`);
                if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`);

                client.channels.cache.get(config.idcanali.logs.moderation.bans).send({ embeds: [embed3] });
                client.channels.cache.get(config.idcanali.publiclogs).send({ embeds: [embed3] });

                interaction.editReply({ embeds: [embed1] });
                interaction.guild.members.ban(user, { reason: reason });

                database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {
                    if (!result[0]) {
                        database.collection(`UserStats`).insertOne({
                            username: user.username, id: user.id, moderation: {
                                type: `tempmuted`,
                                moderator: interaction.user.id,
                                reason: reason,
                                time: time
                            },
                            leavedAt: 0
                        })
                    }
                    if (result[0]) {
                        database.collection(`UserStats`).updateOne({ id: user.id }, {
                            $set: {
                                moderation: {
                                    type: `banned`,
                                    moderator: interaction.user.id,
                                    reason: reason
                                }
                            }
                        })
                    }
                })
            })
        })
    }
}