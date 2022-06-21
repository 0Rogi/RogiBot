const moment = require(`moment`)
const adduser = require(`${process.cwd()}/functions/database/adduser.js`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `ban`,
    data: {
        name: `ban`,
        description: `Banna un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `ID dell'utente da bannare`,
                type: `STRING`,
                required: true
            },
            {
                name: `motivo`,
                description: `Motivo del ban`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 2,
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

            let guildmember = await interaction.guild.members.cache.find(x => x.id == user.id)
            if (guildmember && guildmember.roles.cache.has(config.idruoli.staff) && !interaction.member.roles.cache.has(config.idruoli.owner)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*${guildmember} è uno staffer, non posso bannarlo*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            }

            let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`

            let dm = true
            let embed1 = new Discord.MessageEmbed()
                .setAuthor({ name: `[BAN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`⚠️ **HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                .setThumbnail(config.images.rogiban)
                .setColor(`PURPLE`)
                .addField(`👤 Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`📖 Motivo:`, reason.toString())
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`Sei stato bannato!`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(`RED`)
                .addField(`🔨 Bannato da:`, interaction.member.toString(), true)
                .addField(`🏠 Bannato in:`, interaction.guild.name, true)
                .addField(`📖 Per il motivo:`, reason.toString(), true)
            await user.send({ embeds: [embed2] }).catch(() => { dm = false })
            let embed3 = new Discord.MessageEmbed()
                .setTitle(`🚫 BAN 🚫`)
                .setColor(`RED`)
                .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                .addField(`👤 Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                .addField(`📖 Motivo:`, reason)
            if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`)
            if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`)
            client.channels.cache.get(config.idcanali.logs.moderation.bans).send({ embeds: [embed3] })
            interaction.editReply({ embeds: [embed1] })

            interaction.guild.members.ban(user, { reason: reason })
        })
    }
}