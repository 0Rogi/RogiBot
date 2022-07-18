const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    execute(message) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.author.bot) return
        if (message.channel == config.idcanali.lastvideo || message.channel == config.idcanali.announcement) message.crosspost().catch(() => { })
    }
}