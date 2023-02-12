const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function addStaffInDB() {
    const owners = await client.guilds.cache.get(`602019987279839274`).members.cache.filter(x => x.roles.cache.has(config.rolesid.owner));
    const admins = await client.guilds.cache.get(`602019987279839274`).members.cache.filter(x => x.roles.cache.has(config.rolesid.admin));
    const moderators = await client.guilds.cache.get(`602019987279839274`).members.cache.filter(x => x.roles.cache.has(config.rolesid.moderator));
    const partnermanager = await client.guilds.cache.get(`602019987279839274`).members.cache.filter(x => x.roles.cache.has(config.rolesid.partnermanager));

    owners.forEach(owner => {
        database.collection(`Staff`).insertOne({ username: owner.user.username, id: owner.id, rank: `Owner`, messages: 0, vctime: 0, partnerships: 0, actions: 0 });
    })

    admins.forEach(admin => {
        database.collection(`Staff`).insertOne({ username: admin.user.username, id: admin.id, rank: `Admin`, messages: 0, vctime: 0, partnerships: 0, actions: 0 });
    })

    moderators.forEach(moderator => {
        database.collection(`Staff`).insertOne({ username: moderator.user.username, id: moderator.id, rank: `Moderator`, messages: 0, vctime: 0, partnerships: 0, actions: 0 });
    })

    partnermanager.forEach(manager => {
        database.collection(`Staff`).insertOne({ username: manager.user.username, id: manager.id, rank: `Partner Manager`, messages: 0, vctime: 0, partnerships: 0, actions: 0 });
    })
}