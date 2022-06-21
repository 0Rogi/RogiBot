const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = function unmute() {
    database.collection(`users`).find().toArray(function (err, result) {

        //? Unmute tempmuted
        result.forEach(r => {
            if (r?.moderation?.type == `tempmuted`) {
                if (r.moderation.time - 1000 <= 0) {
                    let user = client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == r.id)
                    if (!user) return
                    user.roles.remove(config.idruoli.tempmuted)
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle(`🔊 UNMUTE 🔊`)
                        .setColor(`RED`)
                        .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🔨 Moderatore:`, `Nome: **${client.user.username}**, ID: **${client.user.id}**\n||${client.user.toString()}||`)
                        .addField(`👤 Utente:`, `Nome: **${r.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                    client.channels.cache.get(config.idcanali.logs.moderation.unmute).send({ embeds: [embed3] })
                    database.collection(`users`).updateOne({ id: r.id }, { $set: { moderation: {} } })
                }
                database.collection(`users`).updateOne({ id: r.id }, { $set: { 'moderation.time': r?.moderation?.time - 1000 } })
            }
            if (r?.moderation?.time && !r?.moderation?.type) {
                database.collection(`users`).updateOne({ id: r.id }, { $set: { moderation: {} } })
            }
        })

        //? Check roles
        client.guilds.cache.get(config.idServer.idServer).members.cache.forEach(m => {
            if (m.roles.cache.has(config.idruoli.tempmuted)) {
                database.collection(`users`).find({ id: m.id }).toArray(function (err, result) {
                    if (!result[0]) m.roles.remove(config.idruoli.tempmuted)
                    if (result[0] && result[0]?.moderation.type != `tempmuted`) m.roles.remove(config.idruoli.tempmuted)
                })
            }
            if (!m.roles.cache.has(config.idruoli.tempmuted)) {
                database.collection(`users`).find({ id: m.id }).toArray(function (err, result) {
                    if (!result[0]) return
                    if (result[0] && result[0]?.moderation?.type == `tempmuted`) m.roles.add(config.idruoli.tempmuted)
                })
            }
            if (m.roles.cache.has(config.idruoli.muted)) {
                database.collection(`users`).find({ id: m.id }).toArray(function (err, result) {
                    if (!result[0]) m.roles.remove(config.idruoli.muted)
                    if (result[0] && result[0]?.moderation.type != `muted`) m.roles.remove(config.idruoli.muted)
                })
            }
            if (!m.roles.cache.has(config.idruoli.muted)) {
                database.collection(`users`).find({ id: m.id }).toArray(function (err, result) {
                    if (!result[0]) return
                    if (result[0] && result[0]?.moderation?.type == `muted`) m.roles.add(config.idruoli.muted)
                })
            }
        })

    })
}