const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildBanAdd`,
    async execute(ban) {
        if (ban.guild != config.idServer.idServer) return

        let fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: `MEMBER_BAN_ADD`,
        })

        let logs = fetchedLogs.entries.first()
        if (!logs) return

        let { executor, target, reason } = logs

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(executor.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(executor.id)) return

        if (executor.bot) return

        if (reason == `` || !reason) reason = `Nessun Motivo`

        let embed = new Discord.MessageEmbed()
            .setTitle(`🚫 BAN MANUALE 🚫`)
            .setColor(`RED`)
            .setThumbnail(target.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore:`, `Nome: **${executor.username}**, ID: **${executor.id}**\n||${executor.toString()}||`)
            .addField(`👤 Utente:`, `Nome: **${target.username}**, ID: **${target.id}**\n||${target.toString()}||`)
            .addField(`📖 Motivo:`, reason)

        client.channels.cache.get(config.idcanali.logs.moderation.bans).send({ embeds: [embed] })
    }
}