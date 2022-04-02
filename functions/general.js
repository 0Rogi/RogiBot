setInterval(() => {
    const ms = require(`ms`)
    const date = new Date()
    const server = client.guilds.cache.get(config.idServer.idServer)
    //* Member Counter
    let bots = server.members.cache.filter(member => member.user.bot).size 
    let members = server.memberCount - bots 
    let channel = client.channels.cache.get(config.idcanali.membri)
    channel.setName(`👥│Members: ${members}`)
    //* Other Logs
    if(date.getHours() == 22 && date.getMinutes() == 0) {
        client.channels.cache.get(config.idcanali.generaltxt).messages.fetch({ limit: 1 }).then(messages => {
            let msg = messages.first()
            let embed = new Discord.MessageEmbed()
                .setTitle(`🟢IL BOT È FUNZIONANTE!`)
                .addField(`⌚Il mio uptime attuale è:`, ms(client.uptime, { long: true }).toString(), true)
                .addField(`💾La mia ram usata attualmente è:`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2).toString()}MB`, true)
                .addField(`🐢Il mio ping attuale è:`, `${client.ws.ping.toString()}ms`, true)
                .addField(`💭L'ultimo messaggio mandato in general è:`, msg.content ? msg.content.toString() : `_Nessun Contenuto_`, true)
                .addField(`🖊️Scritto da:`, msg.author.toString(), true)
                .addField(`🔗Link al messaggio:`, `[Message link](https://discord.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`, true)
                .setColor(`YELLOW`)
                .setThumbnail(client.guilds.cache.get(config.idServer.idServer).iconURL({dynamic: true}))
        client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embed]})
        })
    }
}, 1000 * 60)