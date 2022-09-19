const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `kick`,
    data: {
        name: `kick`,
        description: `Kicka un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `L'utente da kickare`,
                type: `USER`,
                required: true
            },
            {
                name: `motivo`,
                description: `Motivo del kick`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let user = interaction.options.getUser(`utente`)
            let guildmember = await interaction.guild.members.cache.find(x => x.id == user.id)
            if (!guildmember) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            if (guildmember && guildmember.roles.cache.has(config.idruoli.staff) && !interaction.member.roles.cache.has(config.idruoli.owner)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*${guildmember} è uno staffer, non posso kickarlo*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`
            let dm = true
            let embed1 = new Discord.MessageEmbed()
                .setAuthor({ name: `[KICK] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                .setThumbnail(config.images.rogikick)
                .setColor(`PURPLE`)
                .addField(`Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`Motivo:`, reason.toString())
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`Sei stato kickato!`)
                .setURL(`https://discord.gg/cRXca9N5Kv`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(`RED`)
                .addField(`Kickato da:`, interaction.member.toString(), true)
                .addField(`Kickato in:`, interaction.guild.name, true)
                .addField(`Per il motivo:`, reason.toString(), true)
            await user.send({ embeds: [embed2] }).catch(() => { dm = false })
            let embed3 = new Discord.MessageEmbed()
                .setTitle(`🏓 KICK 🏓`)
                .setColor(`RED`)
                .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                .addField(`👤 Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                .addField(`📖 Motivo:`, reason)
            if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`)
            if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`)
            client.channels.cache.get(config.idcanali.logs.moderation.kick).send({ embeds: [embed3] })
            interaction.editReply({ embeds: [embed1] })
            guildmember.kick({ reason: reason })
        })
    }
}