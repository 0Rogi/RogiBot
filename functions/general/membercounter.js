const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function membercounter() {
    const guild = client.guilds.cache.get(config.idServer.idServer);

    const bots = guild.members.cache.filter(member => member.user.bot).size;
    const unverified = guild.members.cache.filter(member => member.roles.cache.has(config.rolesid.unverified)).size;
    const members = guild.memberCount - bots - unverified;

    client.channels.cache.get(config.channelsid.membri).setName(`—͟͞͞👥】Members: ${members}`);
}