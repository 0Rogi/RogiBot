module.exports = {
    name: `voiceStateUpdate`,
    async execute(oldState, newState) {
    if(newState.channelId == config.idcanali.proomschannel) {
        var server = client.guilds.cache.get(config.idServer.idServer)
        const user = await client.users.fetch(newState.id)
        const member = server.members.cache.find(x => x.id == newState.id)
        if (server.channels.cache.find(canale => canale.name == user.username)) {
            user.send(`\`\`\`diff\n- Hai già creato una stanza privata, per crearne una nuova, connettiti in quella precedente e digita !delete\n\`\`\``).catch(() => { })
            var canale = server.channels.cache.find(canale => canale.name == user.username)
            member.voice.setChannel(canale)
            return
        }
        const channel = await newState.guild.channels.create(user.username, { 
            type: `GUILD_VOICE`,
            parent: config.idcanali.proomsparent,
            permissionOverwrites: [
            {
                id: server.id,
                allow: [`VIEW_CHANNEL`],
                deny: [`CONNECT`]
            },
            {
                id: user.id,
                allow: [`CONNECT`]
            }
            ]
        })
       member.voice.setChannel(channel)
    }}
}