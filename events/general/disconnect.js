module.exports = {
    name: `voiceStateUpdate`,
    execute(oldState, newState) {
        if(newState.channelId == config.idcanali.membri || newState.channelId == config.idcanali.iscritti) {
            let server = client.guilds.cache.get(config.idServer.idServer)
            let utente = server.members.cache.find(x => x.id == newState.id);
            utente.voice.disconnect()
        }
    }
}