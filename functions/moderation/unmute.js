const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = function unmute() {
    database.collection(`UserStats`).find().toArray(function (err, result) {
        result.forEach(r => {
            if (r?.moderation.type == `tempmuted`) {
                if (r.moderation.time - 1000 <= 0) {
                    let user = client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == r.id)
                    if (!user) return
                    user.roles.remove(config.idruoli.tempmuted)
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle(`🔊UNMUTE🔊`)
                        .setColor(`RED`)
                        //.setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️`)
                        .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🔨Moderatore:`, `Nome: **${client.user.username}**, ID: **${client.user.id}**\n||${client.user.toString()}||`)
                        .addField(`👤Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                    client.channels.cache.get(config.idcanali.logs.moderation.unmute).send({ embeds: [embed3] })
                    database.collection(`UserStats`).updateOne({ id: r.id }, {
                        $set: {
                            moderation: {
                                type: null,
                                moderator: null,
                                reason: null,
                                time: null
                            }
                        }
                    })
                }
                database.collection(`UserStats`).updateOne({ id: r.id }, {
                    $set: {
                        moderation: {
                            type: r.moderation.type,
                            moderator: r.moderation.moderator,
                            reason: r.moderation.reason,
                            time: r.moderation.time - 5000
                        }
                    }
                })
            }
        })
        client.guilds.cache.get(config.idServer.idServer).members.cache.forEach(m => {
            if (m.roles.cache.has(config.idruoli.tempmuted)) {
                database.collection(`UserStats`).find({ id: m.id }).toArray(function (err, result) {
                    if (!result[0]) m.roles.remove(config.idruoli.tempmuted)
                    if (result[0] && result[0]?.moderation.type != `tempmuted`) m.roles.remove(config.idruoli.tempmuted)
                })
            }
            if (m.roles.cache.has(config.idruoli.muted)) {
                database.collection(`UserStats`).find({ id: m.id }).toArray(function (err, result) {
                    if (!result[0]) m.roles.remove(config.idruoli.muted)
                    if (result[0] && result[0]?.moderation.type != `muted`) m.roles.remove(config.idruoli.muted)
                })
            }
        })
    })
}