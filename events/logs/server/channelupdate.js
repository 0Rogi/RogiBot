const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `channelUpdate`,
    async execute(oldChannel, newChannel) {
        if (oldChannel.guild != config.idServer.idServer) return

        const fetchedLogs = await oldChannel.guild.fetchAuditLogs({
            limit: 1,
            type: `CHANNEL_UPDATE`,
        })

        const logs = fetchedLogs.entries.first()
        const { executor } = logs

        if (executor.bot) return
        if (new Date().getTime() - logs.createdAt > 10000) return

        let text = ``

        switch (change.key) {
            case `name`: change.key = `Nome`; break
            case `bitrate`: change.key = `Bitrate`; break
            case `nsfw`: change.key = `NSFW`; break
            case `rate_limit_per_user`: change.key = `Slowmode`; break
            case `topic`: change.key = `Descrizione`; break
        }

        logs.changes.forEach(change => {
            text += `**${change.key}**\nPrima: **${change.old}** - Ora: **${change.new}**`
        })

        let embed = new Discord.MessageEmbed()
            .setTitle(`📝 Canale Modificato 📝`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore`, executor.toString())
            .addField(`😀 Nome:`, newChannel.name, true)
            .addField(`✏️ Cambiamenti:`, text)
        client.channels.cache.get(config.idcanali.logs.server.channels).send({ embeds: [embed] })
    }
}