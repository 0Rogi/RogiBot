const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `voiceStateUpdate`,
    execute(oldState, newState) {
        if (oldState.guild != config.idServer.idServer || newState.guild != config.idServer.idServer) return
        if (newState.channelId == config.channelsid.membri || newState.channelId == config.channelsid.iscritti) {
            let server = client.guilds.cache.get(config.idServer.idServer)
            let utente = server.members.cache.find(x => x.id == newState.id)

            if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(utente.user.id)) return
            if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(utente.user.id)) return

            utente.voice.disconnect()
        }
    }
}