const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function membercounter() {
    let guild = client.guilds.cache.get(config.idServer.idServer)
    let bots = guild.members.cache.filter(member => member.user.bot).size
    let members = guild.memberCount - bots
    let channel = client.channels.cache.get(config.idcanali.membri)
    channel.setName(`—͟͞͞👥】Members: ${members}`)
}