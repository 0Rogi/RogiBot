const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function setpermissions() {
    let guild = client.guilds.cache.get(config.idServer.idServer)
    guild.channels.cache.forEach(channel => {
        try {
            if (channel == config.idcanali.testing) return
            if (channel != config.idcanali.muted) {
                let role1 = guild.roles.cache.find(role => role.id == config.idruoli.muted)
                let role2 = guild.roles.cache.find(role => role.id == config.idruoli.tempmuted)
                channel.permissionOverwrites.edit(role2, {
                    VIEW_CHANNEL: false
                }).catch(() => { })
                channel.permissionOverwrites.edit(role1, {
                    VIEW_CHANNEL: false
                }).catch(() => { })
            }
            if (channel == config.idcanali.muted) {
                let role1 = guild.roles.cache.find(role => role.id == config.idruoli.muted)
                let role2 = guild.roles.cache.find(role => role.id == config.idruoli.tempmuted)
                channel.permissionOverwrites.edit(role1, {
                    VIEW_CHANNEL: true
                }).catch(() => { })
                channel.permissionOverwrites.edit(role2, {
                    VIEW_CHANNEL: true
                }).catch(() => { })
            }
            if (channel != config.idcanali.verify) {
                let role = guild.roles.cache.find(role => role.id == config.idruoli.unverified)
                channel.permissionOverwrites.edit(role, {
                    VIEW_CHANNEL: false
                }).catch(() => { })
            }
            if (channel == config.idcanali.verify) {
                let role = guild.roles.cache.find(role => role.id == config.idruoli.unverified)
                channel.permissionOverwrites.edit(role, {
                    VIEW_CHANNEL: true
                }).catch(() => { })
            }
        } catch {

        }
    })
}