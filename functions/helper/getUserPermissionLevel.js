const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function getUserPermissionLevel(member) {

    if (member?.roles.cache.has(config.rolesid.owner)) return 3;
    if (member?.roles.cache.has(config.rolesid.admin)) return 2;
    if (member?.roles.cache.has(config.rolesid.moderator)) return 1;

    return 0;
}
