const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `guildMemberUpdate`,
    async execute(oldMember, newMember) {
        if (oldMember.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(newMember.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(newMember.id)) return

        if (oldMember._roles == newMember._roles) return

        const fetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: `MEMBER_ROLE_UPDATE`,
        })

        const logs = fetchedLogs.entries.first();
        const { executor } = logs

        if (executor.bot) return
        if (new Date().getTime() - logs.createdAt > 10000) return

        let embed = new Discord.MessageEmbed()
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore:`, executor.toString())
            .addField(`👥 Utente:`, newMember.toString())
            .setColor(`ORANGE`)

        let text = ``

        if (logs.changes.find(x => x.key == `$add`)) {
            embed.setTitle(`📥 Ruolo Aggiunto 📥`)
            logs.changes.find(x => x.key == `$add`).new.forEach(role => {
                text += role.name
            })
        }

        if (logs.changes.find(x => x.key == `$remove`)) {
            embed.setTitle(`📤 Ruolo Rimosso 📤`)
            logs.changes.find(x => x.key == `$remove`).new.forEach(role => {
                text += role.name
            })
        }

        embed.addField(`👔 Ruolo:`, text)
        client.channels.cache.get(config.channelsid.logs.members.roles).send({ embeds: [embed] })
    }
}