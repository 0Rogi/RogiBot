const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberUpdate`,
    async execute(oldMember, newMember) {
        if (oldMember.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(newMember.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(newMember.id)) return

        if (oldMember.nickname == newMember.nickname) return
        let fetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: `MEMBER_UPDATE`,
        })

        let logs = fetchedLogs.entries.first()
        if (!logs) return

        let { executor, target } = logs
        if (executor.bot) return
        if (new Date().getTime() - logs.createdAt > 10000) return

        if (executor == target) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`📝 Nickname Modificato 📝`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👥 Utente:`, `Nome: ${target.toString()} ID: ${target.id}`)
                .addField(`💋 Vecchio Nick: `, oldMember.nickname ? oldMember.nickname : `_Nessun Nick_`)
                .addField(`💋 Nuovo Nick:`, newMember.nickname ? newMember.nickname : `_Nessun Nick_`)
                .setColor(`BLUE`)
            client.channels.cache.get(config.channelsid.logs.members.nicknames).send({ embeds: [embed] })
        } else if (executor != target) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`📝 Nickname Modificato 📝`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👥 Utente:`, `Nome: ${target.toString()} ID: ${target.id}`)
                .addField(`🔨 Moderatore:`, `Nome: ${executor.toString()} ID: ${executor.id}`)
                .addField(`💋 Vecchio Nick: `, oldMember.nickname ? oldMember.nickname : `_Nessun Nick_`)
                .addField(`💋 Nuovo Nick:`, newMember.nickname ? newMember.nickname : `_Nessun Nick_`)
                .setColor(`BLUE`)
            client.channels.cache.get(config.channelsid.logs.members.nicknames).send({ embeds: [embed] })
        }
    }
}