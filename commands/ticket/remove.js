const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `tremove`,
    description: `Rimuove un utente dal ticket`,
    data: {
        name: `tremove`,
        description: `Rimuove un utente dal ticket`,
        options: [
            {
                name: `utente`,
                description: `L'utente da rimuovere dal ticket`,
                type: `USER`,
                required: true
            }
        ],
    },
    permissionlevel: 0.5,
    allowedchannels: [`ALL`],
    requirement: `none`,
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
                if (user.permissions.has(`MANAGE_MESSAGES`)) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Non puoi rimuovere lo staff da un ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (user.user.bot) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Non puoi rimuovere un bot da un ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (!interaction.channel.permissionsFor(user).has(`VIEW_CHANNEL`, true)) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Questo utente non ha già accesso a questo ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Rimozione di un Utente`)
                    .setDescription(`${user} è stato **rimosso** dal ticket con successo`)
                    .setColor(`GREEN`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                interaction.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: false })
                interaction.editReply({ embeds: [embed] })
            }
        })
    }
}