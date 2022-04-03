const ms = require(`ms`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `test`,
    async execute(message) {
        let testo = ``
        let server = client.guilds.cache.get(config.idServer.idServerTest)
        let rogidiscordbot = server.members.cache.get(config.idbot.rogidiscordbot)
        let rogifunbot = server.members.cache.get(config.idbot.rogifunbot)
        let rogitestbot = server.members.cache.get(config.idbot.rogitestbot)
        let uptime = ms(client.uptime, { long: true })
        let ping = client.ws.ping
        let ramused = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
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
        let embed = new Discord.MessageEmbed()
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