const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberAdd`,
    async execute(member) {
        if (member.guild.id != config.idServer.idServer) return
        if (member.id == config.rogialt) {
            let testing = client.channels.cache.get(config.idcanali.testing)
            let thingstodo = client.channels.cache.get(config.idcanali.thingstodo)
            testing.permissionOverwrites.create(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true })
            thingstodo.permissionOverwrites.create(member.id, { SEND_MESSAGES: true, VIEW_CHANNEL: true })
            member.roles.add(config.idruoli.fan)
            return
        }
        member.roles.add(config.idruoli.unverified)
    }
}