const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `unban`,
    data: {
        name: `unban`,
        description: `Sbanna un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `ID dell'utente da sbannare`,
                type: `STRING`,
                required: true
            }
        ],
    },
    permissionlevel: 2,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let id = interaction.options.getString(`utente`)
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

            let embed1 = new Discord.MessageEmbed()
                .setAuthor({ name: `[UNBAN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(config.images.rogiban)
                .setColor(`PURPLE`)
                .addField(`👤 Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
            let embed3 = new Discord.MessageEmbed()
                .setTitle(`📛 UNBAN 📛`)
                .setColor(`GREEN`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                .addField(`👤 Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
            client.channels.cache.get(config.idcanali.logs.moderation.unbans).send({ embeds: [embed3] })
            interaction.editReply({ embeds: [embed1] })

            interaction.guild.members.unban(user).catch(() => { })
        })
    }
}