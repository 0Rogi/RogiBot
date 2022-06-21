const config = require(`${process.cwd()}/JSON/config.json`)
const adduser = require(`${process.cwd()}/functions/database/adduser.js`)

module.exports = function updateuserindb() {
    client.guilds.cache.get(config.idServer.idServer).members.cache.forEach(member => {
        database.collection(`users`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) {
                adduser(member)
            }
            if (result[0]) {
                database.collection(`users`).updateOne({ id: member.id }, { $set: { roles: member._roles } })
            }
        })
    })
}