const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = async function checkbans() {
    let bans = await client.guilds.cache.get(config.idServer.idServer).bans.fetch()
    bans.forEach(ban => {
        database.collection(`UserStats`).find({ id: ban.user.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`UserStats`).insertOne({
                    id: ban.user.id, username: ban.user.username, moderation: {
                        type: `banned`,
                        moderator: null,
                        reason: ban.reason
                    }
                })
            }
            if (result[0]?.moderation.type != `banned`) {
                database.collection(`UserStats`).updateOne({ id: ban.user.id }, {
                    $set: {
                        moderation: {
                            type: `banned`,
                            moderator: null,
                            reason: ban.reason
                        }
                    }
                })
            }
        })
    })
    database.collection(`UserStats`).find().toArray(function (err, result) {
        result.forEach(r => {
            if (r?.moderation.type == `banned` && !bans.has(r.id)) {
                database.collection(`UserStats`).updateOne({ id: r.id }, {
                    $set: {
                        moderation: {
                            type: null,
                            moderator: null,
                            reason: null
                        }
                    }
                })
            }
        })
    })
}