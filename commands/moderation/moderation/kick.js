const moment = require(`moment`);
const config = require(`${process.cwd()}/JSON/config.json`);
const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `kick`,
    description: `Espelle un utente dal server`,
    data: {
        name: `kick`,
        description: `Espelle un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `L'utente da espellere`,
                type: `USER`,
                required: true
            },
            {
                name: `motivo`,
                description: `Motivo dell'espulsione`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        let user = interaction.options.getUser(`utente`);
        let guildMember = await interaction.guild.members.cache.find(x => x.id == user.id);

        if (!guildMember) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (guildMember) {

            let userpermission = await getUserPermissionLevel(guildMember);
            let staffpermission = await getUserPermissionLevel(interaction.member);

            if (userpermission >= staffpermission) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Non hai il permesso per kickare quest'utente*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }
        }

        let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`;
        let dm = true;

        let embed1 = new Discord.MessageEmbed()
            .setAuthor({ name: `[KICK] @${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
            .setColor(`PURPLE`)
            .addField(`👤 Utente:`, `Nome: ${user.username} - ID: ${user.id}\n||${user.toString()}||`)
            .addField(`📖 Motivo:`, reason.toString());

        let embed2 = new Discord.MessageEmbed()
            .setTitle(`SEI STATO ESPULSO`)
            .setURL(`https://discord.gg/cRXca9N5Kv`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(`RED`)
            .addField(`👤 Espulso da:`, interaction.member.toString(), true)
            .addField(`🏠 Espulso in:`, interaction.guild.name, true)
            .addField(`📖 Per il motivo:`, reason.toString(), true)
            .setDescription(`||Puoi premere sul titolo dell'embed per rientrare nel server 👀🤫||`);
        await user.send({ embeds: [embed2] }).catch(() => { dm = false });

        let embed3 = new Discord.MessageEmbed()
            .setTitle(`🏓 KICK 🏓`)
            .setColor(`RED`)
            .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
            .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
            .addField(`📖 Motivo:`, reason);

        if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`);
        if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`);

        client.channels.cache.get(config.channelsid.logs.moderation.kick).send({ embeds: [embed3] });
        const embedplogs = new Discord.MessageEmbed()
            .setAuthor({ name: `[KICK] @${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
            .setColor(`PURPLE`)
        client.channels.cache.get(config.channelsid.publiclogs).send({ embeds: [embedplogs] });

        interaction.editReply({ embeds: [embed1] });
        guildMember.kick({ reason: reason });
        database.collection(`Staff`).find({ id: interaction.user.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`Staff`).insertOne({ username: interaction.user.username, id: interaction.user.id, rank: ``, messages: 0, vctime: 0, actions: 1 });
            } else if (result[0]) {
                database.collection(`Staff`).updateOne({ id: interaction.user.id }, {
                    $inc: {
                        actions: 1,
                    }
                })
            }
        })

    }
}