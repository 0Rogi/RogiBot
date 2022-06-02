const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `guildBanRemove`,
    async execute(unban) {
        if (unban.guild != config.idServer.idServer) return

        let fetchedLogs = await unban.guild.fetchAuditLogs({
            limit: 1,
            type: `MEMBER_BAN_REMOVE`,
        })

        let logs = fetchedLogs.entries.first()
        if (!logs) return

        let { executor, target } = logs
        if (executor.bot) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`📛 Unban Manuale 📛`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore:`, `Nome: **${executor.username}**, ID: **${executor.id}**\n||${executor.toString()}||`)
            .addField(`👤 Utente:`, `Nome: **${target.username}**, ID: **${target.id}**\n||${target.toString()}||`)
            .setColor(`GREEN`)
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))

        client.channels.cache.get(config.idcanali.logs.moderation.unbans).send({ embeds: [embed] })
    }
}