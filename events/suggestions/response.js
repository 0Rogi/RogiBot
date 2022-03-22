module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.channel == config.idcanali.suggests && message.guild == config.idServer.idServer) {
            if(message.author.bot) return
            if(!message.reference || !message.content) {
                message.delete()
                return
            }
            message.channel.messages.fetch(message.reference.messageId).then(msg => {
                let embed = msg.embeds[0]
                if(embed.fields[0].value == `⚪In attesa...`) {
                    let embed1 = new Discord.MessageEmbed()
                        .setTitle(embed.title.toString())
                        .setDescription(embed.description)
                        .setThumbnail(embed.thumbnail.url)
                        .addField(`📉Stato:`, `🔴Rifiutato da ${message.member.toString()}`)
                        .addField(`💡Suggerimento:`, embed.fields[1].value.toString())
                        .addField(`📤Risposta:`, message.content.toString())
                        .setColor(`RED`)
                msg.edit({embeds: [embed1], components: []})
                message.delete()
                let userid = embed.footer.text.slice(9)
                let user = client.users.cache.get(userid)
                if(!user) return
                let embeduser = new Discord.MessageEmbed()
                    .setTitle(`💡Suggerimento Rifiutato💡`)
                    .setDescription(`${user.toString()} il tuo suggerimento è stato __rifiutato__!`)
                    .addField(`Suggerimento:`, msg.embeds[0].fields[1].value.toString())
                    .addField(`📤Risposta:`, message.content.toString())
                    .setColor(`RED`)
                user.send({embeds: [embeduser]}).catch(() => {})
                } else {
                    message.delete()
                }
            })
        }
    }
}