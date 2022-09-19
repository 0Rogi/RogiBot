const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function getUserPermissionLevel(member) {

    if (member.roles.cache.has(config.idruoli.partnermanager)) return 0.5;
    if (member.roles.cache.has(config.idruoli.helper)) return 1;
    if (member.roles.cache.has(config.idruoli.moderator)) return 2;
    if (member.roles.cache.has(config.idruoli.srmoderator)) return 3;
    if (member.roles.cache.has(config.idruoli.owner)) return 4;

    return 0;
}
