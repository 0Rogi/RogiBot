const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function updateuserindb() {
    client.guilds.cache.get(config.idServer.idServer).members.cache.forEach(member => {
        if (member.roles.cache.has(config.rolesid.unverified)) return;
        database.collection(`UserStats`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`UserStats`).insertOne({ id: member.id, username: member.user.username, roles: member._roles, moderation: {}, leavedAt: 0, acceptedsuggests: 0, countingcorrect: 0, customprofile: {}, economy: {} });
            }
            if (result[0]) {

                const userInventory = result[0].economy?.inventory;

                if (userInventory) {
                    userInventory.forEach(e => {
                        if (e.count <= 0) {
                            database.collection(`UserStats`).updateOne({ id: member.id }, {
                                $pull: {
                                    'economy.inventory': {
                                        object: e.object
                                    }
                                }
                            });
                        }
                    });
                }
                database.collection(`UserStats`).updateOne({ id: member.id }, { $set: { roles: member._roles, username: member.user.username } });
            }
        });
    });
}