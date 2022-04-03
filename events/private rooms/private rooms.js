const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `voiceStateUpdate`,
    async execute(oldState, newState) {
    if(oldState.guild != config.idServer.idServer || newState.guild != config.idServer.idServer) return
    if(newState.channelId == config.idcanali.proomschannel) {
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = await client.users.fetch(newState.id)
        let member = server.members.cache.find(x => x.id == newState.id)
        if (server.channels.cache.find(canale => canale.name == user.username)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Hai già aperto una stanza privata!\nPer crearne una nuova, connettiti in quella precedente e usa il comando \`!pdelete\`*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            user.send({embeds: [embed]}).catch(() => { })
            let canale = server.channels.cache.find(canale => canale.name == user.username)
            member.voice.setChannel(canale)
            return
        }
        let channel = await newState.guild.channels.create(user.username, { 
            type: `GUILD_VOICE`,
            parent: config.idcanali.proomsparent,
            permissionOverwrites: [
            {
                id: server.id,
                deny: [`CONNECT`]
            },
            {
                id: user.id,
                allow: [`CONNECT`]
            },
            {
                id: config.idruoli.staff,
                allow: [`VIEW_CHANNEL`]
            },
            {
                id: config.idruoli.muted,
                deny: [`VIEW_CHANNEL`]
            }
            ]
        })
       member.voice.setChannel(channel)
    }}
}