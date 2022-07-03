const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `tadd`,
    data: {
        name: `tadd`,
        description: `Aggiunge un utente al ticket`,
        options: [
            {
                name: `utente`,
                description: `L'utente da aggiungere al ticket`,
                type: `USER`,
                required: true
            }
        ],
    },
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
            if (!ticket) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setColor(`RED`)
                    .setDescription(`*Questo canale non è un ticket*`)
                    .setThumbnail(config.images.rogierror)
                interaction.editReply({ embeds: [embed] })
                return
            }
            if (ticket) {
                let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id)
                if (interaction.channel.permissionsFor(user).has(`VIEW_CHANNEL`, true)) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Questo utente ha già accesso a questo ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (user.user.bot) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Non puoi aggiungere un bot ad un ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Aggiunta di un Utente`)
                    .setDescription(`${user} è stato **aggiunto** al ticket con successo`)
                    .setColor(`GREEN`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                interaction.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true })
                interaction.editReply({ embeds: [embed] })
            }
        })
    }
}