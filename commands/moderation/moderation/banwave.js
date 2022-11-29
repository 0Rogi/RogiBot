const moment = require(`moment`);
const config = require(`${process.cwd()}/JSON/config.json`);
const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `banwave`,
    description: `Bandisce più utenti contemporaneamente dal server`,
    data: {
        name: `banwave`,
        description: `Bandisce più utenti dal server`,
        options: [
            {
                name: `utente1`,
                description: `ID del primo utente da bandire`,
                type: `STRING`,
                required: true
            },
            {
                name: `utente2`,
                description: `ID del secondo utente da bandire`,
                type: `STRING`,
                required: true
            },
            {
                name: `utente3`,
                description: `ID del terzo utente da bandire`,
                type: `STRING`,
                required: false
            },
            {
                name: `utente4`,
                description: `ID del quarto utente da bandire`,
                type: `STRING`,
                required: false
            },
            {
                name: `utente5`,
                description: `ID del quinto utente da bandire`,
                type: `STRING`,
                required: false
            },
            {
                name: `motivo`,
                description: `Motivo del bandimento`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 3,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        let usersid = [];

        let id1 = interaction.options.getString(`utente1`);
        let id2 = interaction.options.getString(`utente2`);
        let id3 = interaction.options.getString(`utente3`);
        let id4 = interaction.options.getString(`utente4`);
        let id5 = interaction.options.getString(`utente5`);

        let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`;

        if (id1) usersid.push(id1);
        if (id2) usersid.push(id2);
        if (id3) usersid.push(id3);
        if (id4) usersid.push(id4);
        if (id5) usersid.push(id5);

        let embed1 = new Discord.MessageEmbed()
            .setAuthor({ name: `[BANWAVE] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
            .setColor(`PURPLE`);

        let notbanned = `**😐 UTENTI NON BANDITI:**`;
        let banned = `**🔨 UTENTI BANDITI:**`;

        let i = 0;
        usersid.forEach(async (id) => {
            let toban = true;
            i++;

            let user = await client.users.fetch(id).catch(() => {
                toban = false
                notbanned += `\n-${id} - *Utente non Trovato*`;
            });

            if (user) {

                let guildMember = await interaction.guild.members.cache.find(x => x.id == user.id);

                if (guildMember) {

                    let userpermission = await getUserPermissionLevel(guildMember);
                    let staffpermission = await getUserPermissionLevel(interaction.member);

                    if (userpermission >= staffpermission) {
                        notbanned += `\n-${user.id} - *Permessi Insufficienti*`;
                        return;
                    }
                }
            }

            setTimeout(() => {

                if (toban) banned += `\n-${user.id}`;

                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`SEI STATO BANDITO`)
                    .setColor(`RED`)
                    .addField(`🔨 Bandito da:`, interaction.member.toString(), true)
                    .addField(`🏠 Bandito in:`, interaction.guild.name, true)
                    .addField(`📖 Per il motivo:`, reason.toString(), true);
                if (toban) user.send({ embeds: [embed2] }).catch(() => { })

                if (toban) interaction.guild.members.ban(user, { reason: reason });

                if (i >= usersid.length) {

                    if (banned == `**🔨 UTENTI BANDITI:**`) banned += `\n*Nessun utente è stato banditi*`;
                    if (notbanned == `**😐 UTENTI NON BANDITI:**`) notbanned += `\n*Tutti gli utenti sono stati banditi*`;

                }

                embed1.setDescription(`${banned}\n\n${notbanned}\n\n📖** MOTIVO:**\n${reason}`);
                interaction.editReply({ embeds: [embed1] });
            }, 1000)
        })

        setTimeout(() => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🌊 BANWAVE 🌊`)
                .setDescription(`${banned}\n\n${notbanned}`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                .addField(`📖 Motivo:`, reason)
                .setColor(`RED`);
            client.channels.cache.get(config.idcanali.logs.moderation.banwave).send({ embeds: [embed] });
        }, 5000)
    }
}