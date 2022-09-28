const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = async function leaveVoiceChannel() {
    let channel = client.guilds.cache.get(config.idServer.idServer).channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id));
    if (!channel) return;

    if (channel.members.size - 1 <= 0) {
        let bot = await client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == client.user.id)

        bot.voice.disconnect();
    }
}