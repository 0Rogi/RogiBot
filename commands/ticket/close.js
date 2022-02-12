module.exports = {
    name: `tclose`,
    execute(message) {
        let topic = message.channel.topic
        if(!topic) {
            message.reply({embeds: [embed]})
            return
        }
        if(topic.startsWith(`User ID:`)) {
        let ID = topic.slice(9)
        if(message.author.id == ID || message.member.permissions.has(`MANAGE_MESSAGES`)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket in chiusura...`)
                .setDescription(`Tra \`20 secondi\` il ticket verrà chiuso...`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogiclosing)
            let button = new Discord.MessageButton()
                .setStyle(`DANGER`)
                .setLabel(`Annulla`)
                .setCustomId(`Annulla`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            global.chiudi = true
            message.channel.send({embeds: [embed], components: [row]}).then(msg => {
                setTimeout(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Ticket in chiusura...`)
                    .setDescription(`Tra \`10 secondi\` il ticket verrà chiuso...`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogiclosing)
                msg.edit({embeds: [embed]})
                }, 1000 * 10);
            })
            setTimeout(async () => {
                if(global.chiudi == true) {
                    let user = message.guild.members.cache.find(x => x.id == ID)
                    let attachment = await discordTranscripts.createTranscript(message.channel)
                    let embedlog = new Discord.MessageEmbed()
                        .setTitle(`🎫Ticket Chiuso🎫`)
                        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`👤Utente:`, `Nome: **${user.user.username}**, ID: **${user.id}**\n${user.toString()}`)
                        .setThumbnail(user.displayAvatarURL({dynamic: true}))
                        .setColor(`RED`)
                    let logs = client.channels.cache.get(config.idcanali.logs.ticket)
                    logs.send({embeds: [embedlog], files: [attachment]})
                    message.channel.delete()
                }
            }, 1000 * 20);
        }
        } else {
            message.reply({embeds: [embed]})
        }
    }
}
let embed = new Discord.MessageEmbed()
    .setTitle(`Errore`)
    .setColor(`RED`)
    .setDescription(`*Questo canale **non è un ticket**\no non hai il permesso per eliminarlo*`)
    .setThumbnail(config.images.roginotfound)