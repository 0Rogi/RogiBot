const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `roleUpdate`,
    async execute(oldRole, newRole) {
        if (oldRole.guild != config.idServer.idServer) return

        const fetchedLogs = await newRole.guild.fetchAuditLogs({
            limit: 1,
            type: `ROLE_UPDATE`,
        })

        const logs = fetchedLogs.entries.first()
        const { executor } = logs

        if (executor.bot) return
        if (new Date().getTime() - logs.createdAt > 10000) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`📝 Ruolo Modificato 📝`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👥 Moderatore:`, executor.toString())
            .addField(`👔 Ruolo:`, oldRole.name)
            .setColor(`ORANGE`)

        let text = ``
        logs.changes.forEach(change => {
            switch (change.key) {
                case `color`: {
                    change.key = `Colore`
                } break;
                case `hoist`: {
                    change.key = `Separato`
                } break;
                case `mentionable`: {
                    change.key = `Menzionabile`
                } break;
                case `position`: {
                    change.key = `Posizione`
                } break;
                case `permissions`: {
                    change.key = `Permessi`
                } break
            }
            text += `**${change.key}**\n Prima: **${change.old}** - Ora: **${change.new}**\n`
        })

        embed.addField(`✏️ Cambiamenti:`, text)
        client.channels.cache.get(config.idcanali.logs.members.roles).send({ embeds: [embed] })
    }
}