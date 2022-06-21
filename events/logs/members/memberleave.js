const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)
const adduser = require(`${process.cwd()}/functions/database/adduser.js`)

module.exports = {
    name: `guildMemberRemove`,
    execute(member) {
        if (member.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(member.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(member.id)) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`🙁 Utente Uscito 🙁`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤 Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
            .addField(`👀 Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .addField(`📥 Entrato il:`, `${moment(member.user.joinAt).format(`ddd DD MMM YYYY`)}`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setColor(`RED`)

        client.channels.cache.get(config.idcanali.logs.members.leave).send({ embeds: [embed] })

        database.collection(`users`).find({ id: member.id }).toArray(function (err, result) {
            adduser(member)
            database.collection(`users`).updateOne({ id: member.id }, { $set: { roles: member._roles, leavedAt: new Date().getTime() } })
        })
    }
}