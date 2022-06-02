const ms = require(`ms`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `test`,
    data: {
        name: `test`,
        description: `Comando per vedere se il bot funziona`,
    },
    permissionlevel: 0,
    async execute(interaction) {
        interaction.deferReply().then(() => {
            let text = ``
            let server = client.guilds.cache.get(config.idServer.idServerTest)
            if (server.members.cache.get(config.idbot.rogidiscordbot).presence?.status) {
                text += `<:RogiDiscordBot:854792536694587434>RogiBot - ONLINE 🟢\r`
            } else {
                text += `<:RogiDiscordBot:854792536694587434>RogiBot - OFFLINE 🔴\r`
            }
            if (server.members.cache.get(config.idbot.rogifunbot).presence?.status) {
                text += `<:RogiFunBot:854792583490568222>RogiFunBot - ONLINE 🟢\r`
            } else {
                text += `<:RogiFunBot:854792583490568222>RogiFunBot- OFFLINE 🔴\r`
            }
            if (server.members.cache.get(config.idbot.rogimusicbot).presence?.status) {
                text += `<:RogiMusicBot:854792640180912218>RogiMusicBot - ONLINE 🟢\r`
            } else {
                text += `<:RogiMusicBot:854792640180912218>RogiMusicBot - OFFLINE 🔴\r`
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`🚨BOT INFO🚨`)
                .addField(`🤖Tutti i bot di Rogi`, text)
                .addField(`⌚Uptime`, ms(client.uptime, { long: true }), true)
                .addField(`🐢Ping`, `${client.ws.ping}ms`, true)
                .addField(`💾Ram Usata`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, true)
                .setColor(`YELLOW`)
                .setThumbnail(client.user.displayAvatarURL())
            interaction.editReply({ embeds: [embed] })
        })
    }
}