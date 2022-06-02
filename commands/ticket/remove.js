const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `tremove`,
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
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(() => {
            database.collection(`Tickets`).find({ channel: interaction.channel.id }).toArray(function (err, result) {
                if (!result[0]) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Questo canale non è un ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (result[0]) {
                    let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id)
                    if (user.roles.cache.has(config.idruoli.staff)) {
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
                        .setTitle(`Aggiunta di un Utente`)
                        .setDescription(`${user} è stato **rimosso** dal ticket con successo`)
                        .setColor(`GREEN`)
                        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    interaction.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: false })
                    interaction.editReply({ embeds: [embed] })
                }
            })
        })
    }
}