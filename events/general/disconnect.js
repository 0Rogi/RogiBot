module.exports = {
    name: `voiceStateUpdate`,
    description: `Disconnette da #membri, #iscritti e #natale`,
    execute(oldState, newState) {
        if(newState.channelId == config.idcanali.membri || newState.channelId == config.idcanali.iscritti || newState.channelId == config.idcanali.natale) {
            var server = client.guilds.cache.get(config.idServer.idServer)
            var utente = server.members.cache.find(x => x.id == newState.id);
            utente.voice.disconnect()
        }
    }
}