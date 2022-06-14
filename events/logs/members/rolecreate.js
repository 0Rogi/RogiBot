const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `roleCreate`,
    async execute(role) {
        if (role.guild != config.idServer.idServer) return

        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: `ROLE_CREATE`,
        })

        const logs = fetchedLogs.entries.first()

        const { executor } = logs

        if (executor.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(executor.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(executor.id)) return

        if (new Date().getTime() - logs.createdAt > 10000) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`🎯 Ruolo Creato 🎯`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👥 Moderatore:`, executor.toString())
            .addField(`👔 Ruolo:`, role.name)
            .setColor(`ORANGE`)

        client.channels.cache.get(config.idcanali.logs.members.roles).send({ embeds: [embed] })
    }
}