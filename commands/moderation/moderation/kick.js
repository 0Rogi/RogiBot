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
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        let user = interaction.options.getUser(`utente`);
        let guildMember = await interaction.guild.members.cache.find(x => x.id == user.id);

        if (!guildMember) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (guildMember) {

            let userpermission = await getUserPermissionLevel(guildMember);
            let staffpermission = await getUserPermissionLevel(interaction.member);

            if (userpermission >= staffpermission) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`ERRORE`)
                    .setDescription(`*Non hai il permesso per kickare quest'utente*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }
        }

        let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`;
        let dm = true;

        let embed1 = new Discord.MessageEmbed()
            .setAuthor({ name: `[KICK] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
            .setThumbnail(config.images.rogikick)
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

        client.channels.cache.get(config.idcanali.logs.moderation.kick).send({ embeds: [embed3] });
        client.channels.cache.get(config.idcanali.publiclogs).send({ embeds: [embed3] });

        interaction.editReply({ embeds: [embed1] });
        guildMember.kick({ reason: reason });

    }
}