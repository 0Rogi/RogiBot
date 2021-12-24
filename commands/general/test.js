module.exports = {
    name: `test`,
    description: `Controlla se tutti i bot di Rogi sono online`,
    async execute(message) {
        var testo = ``
        var server = client.guilds.cache.get(config.idServer.idServerTest)
        var rogidiscordbot = server.members.cache.get(config.idbot.rogidiscordbot)
        var rogifunbot = server.members.cache.get(config.idbot.rogifunbot)
        var rogitestbot = server.members.cache.get(config.idbot.rogitestbot)
        var uptime = ms(client.uptime, { long: true })
        var ping = client.ws.ping
        const ramused = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        if(rogidiscordbot.presence?.status) {
            testo += `<:RogiDiscordBot:854792536694587434>RogiBot - ONLINE 🟢\r`
        } else {
            testo += `<:RogiDiscordBot:854792536694587434>RogiBot - OFFLINE 🔴\r`
        }
        if(rogifunbot.presence?.status) {
            testo += `<:RogiFunBot:854792583490568222>RogiFunBot - ONLINE 🟢\r`
        } else {
            testo += `<:RogiFunBot:854792583490568222>RogiFunBot- OFFLINE 🔴\r`
        }
        if(rogitestbot.presence?.status) {
            testo += `<:RogiTestBot:912021494819852348>RogiTestBot - ONLINE 🟢\r`
        } else {
            testo += `<:RogiTestBot:912021494819852348>RogiTestBot - OFFLINE 🔴\r`
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(`RogiDiscordBot`)
            .addField(`🤖Tutti i bot di Rogi`, testo)
            .addField(`⌚Uptime`, uptime.toString(), true)
            .addField(`🐢Ping`, `${ping.toString()}ms`, true)
            .addField(`💾Ram Usata`, `${ramused.toString()}MB`, true)
            .setColor(`YELLOW`)
            .setThumbnail(rogidiscordbot.displayAvatarURL())
        message.reply({embeds: [embed]})
    }
}