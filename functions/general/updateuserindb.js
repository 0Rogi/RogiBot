const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function updateuserindb() {
    client.guilds.cache.get(config.idServer.idServer).members.cache.forEach(member => {
        database.collection(`UserStats`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`UserStats`).insertOne({ id: member.id, username: member.user.username, roles: member._roles, moderation: {} })
            }
            if (result[0]) {
                database.collection(`UserStats`).updateOne({ id: member.id }, { $set: { roles: member._roles } })
            }
        })
    })
}