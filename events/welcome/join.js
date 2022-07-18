const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberAdd`,
    async execute(member) {
        if (member.guild.id != config.idServer.idServer) return
        // if (member.id == config.rogialt) {
        //     let testing = client.channels.cache.get(config.idcanali.testing)
        //     let thingstodo = client.channels.cache.get(config.idcanali.thingstodo)
        //     testing.permissionOverwrites.create(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true })
        //     thingstodo.permissionOverwrites.create(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true })
        //     member.roles.add(config.idruoli.fan)
        //     return
        // }

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(member.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(member.user.id)) return

        member.roles.add(config.idruoli.unverified)

        database.collection(`UserStats`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) return
            if (result[0])
                database.collection(`UserStats`).updateOne({ id: member.id }, { $set: { leavedAt: 0 } })
        })
    }
}