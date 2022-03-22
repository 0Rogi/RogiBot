module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.channel == config.idcanali.thingstodo && message.guild == config.idServer.idServer) {
            if(message.author.bot || !message.content || !message.reference) return
            message.channel.messages.fetch(message.reference.messageId).then(msg => {
                let embed = new Discord.MessageEmbed()
                    .addField(msg.embeds[0].fields[0].name, msg.embeds[0].fields[0].value)
                    .addField(msg.embeds[0].fields[1].name, message.content.toString())
                    .setColor(msg.embeds[0].color)
                message.delete()
                msg.edit({embeds: [embed]})
                let embedlogs = new Discord.MessageEmbed()
                    .setTitle(`📋Things To Do Modificata📋`)
                    .setDescription(`[Message link](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨Moderatore:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.author.toString()}||`)
                    .addField(`💬Vecchio Contenuto:`, msg.embeds[0].fields[1].value.toString())
                    .setColor(`GREEN`)
                    .setThumbnail(message.member.displayAvatarURL({dynamic: true}))
                client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
            })
        }
    }
}