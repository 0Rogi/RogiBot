const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function getUserPermissionLevel(member) {

    if (member?.roles.cache.has(config.rolesid.owner)) return 4;
    if (member?.roles.cache.has(config.rolesid.admin)) return 3;
    if (member?.roles.cache.has(config.rolesid.moderator)) return 2;
    // if (member?.roles.cache.has(config.rolesid.helper)) return 1;
    if (member?.roles.cache.has(config.rolesid.partnermanager)) return 0.5;

    return 0;
}
