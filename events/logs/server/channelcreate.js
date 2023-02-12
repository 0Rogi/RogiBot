const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `channelCreate`,
    async execute(channel) {
        if (channel.guild != config.idServer.idServer) return

        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: `CHANNEL_CREATE`,
        })

        const logs = fetchedLogs.entries.first()
        const { executor } = logs

        if (executor.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(executor.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(executor.id)) return

        if (new Date().getTime() - logs.createdAt > 10000) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`📥 Canale Creato 📥`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore`, executor.toString())
            .addField(`😀 Nome:`, channel.name, true)
            .addField(`👁️ Tipo:`, channel.type, true)
            .addField(`🔢 Posizione:`, channel.rawPosition.toString(), true)
            .setColor(`GREEN`)
        client.channels.cache.get(config.channelsid.logs.server.channels).send({ embeds: [embed] })
    }
}