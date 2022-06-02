const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (message.channel.id == config.idcanali.bugs && message.guild == config.idServer.idServerLogs) {
            if (message.author.bot) return
            if (!message.reference || !message.content) {
                message.delete()
                return
            }
            message.channel.messages.fetch(message.reference.messageId).then(async msg => {
                let embed = msg.embeds[0]
                if (embed.title == `🪲Bug Report🪲`) {
                    let userid = embed.footer.text.slice(9)
                    let user = client.users.cache.get(userid)
                    if (!user) {
                        message.reply(`Quest'utente è uscito dal server`).then(msg => {
                            setTimeout(() => {
                                msg.delete()
                                message.delete()
                            }, 1000 * 2)
                        })
                        return
                    }
                    let embeduser = new Discord.MessageEmbed()
                        .setTitle(`🪲Bug Report🪲`)
                        .setDescription(`${user.toString()}, ${message.author.toString()} ha risposto al tuo bug report!`)
                        .addField(`🪲Bug:`, msg.embeds[0].fields[0].value.toString())
                        .addField(`📤Risposta:`, message.content.toString())
                        .setColor(`RED`)
                    let dm = true
                    await user.send({ embeds: [embeduser] }).catch(() => {
                        dm = false
                        message.reply(`Quest'utente ha i dm chiusi`).then(msg => {
                            setTimeout(() => {
                                msg.delete()
                                message.delete()
                            }, 1000 * 2)
                        })
                        return
                    })
                    if (dm) {
                        let embed1 = new Discord.MessageEmbed()
                            .setTitle(`📤Bug Response📤`)
                            .setDescription(embed.description)
                            .setThumbnail(embed.thumbnail.url)
                            .addField(embed.fields[0].name, embed.fields[0].value)
                            .addField(`📤Risposta da ${message.author.username}:`, message.content.toString())
                            .setColor(`RED`)
                        msg.edit({ embeds: [embed1], components: [] })
                        message.delete()
                    }
                } else {
                    message.delete()
                }
            })
        }
    }
}