module.exports = {
    name: `voiceStateUpdate`,
    execute(oldState, newState) {
        if(oldState.guild != config.idServer.idServer || newState.guild != config.idServer.idServer) return
        if(newState.channelId == config.idcanali.membri || newState.channelId == config.idcanali.iscritti) {
            let server = client.guilds.cache.get(config.idServer.idServer)
            let utente = server.members.cache.find(x => x.id == newState.id);
            utente.voice.disconnect()
        }
    }
}