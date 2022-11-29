const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberAdd`,
    execute(member) {
        if (member.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(member.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(member.id)) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`🎉 Nuovo Utente 🎉`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤 Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
            .addField(`👀 Creazione Account:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setColor(`GREEN`)

        database.collection(`UserStats`).find({ id: member.id }).toArray(async function (err, result) {
            if (!result[0]) {
                client.channels.cache.get(config.idcanali.logs.members.join).send({ embeds: [embed] })
                client.channels.cache.get(config.idcanali.publiclogs).send({ embeds: [embed] })
            } else if (result[0]) {
                let roles = ``
                await result[0].roles.forEach(role => {
                    if (role == config.idruoli.serverbooster) return
                    role = client.guilds.cache.get(config.idServer.idServer).roles.cache.find(r => r.id == role)
                    if (!role) return
                    roles += `${role.name}\n`
                })
                if (roles == ``) roles = `_Nessun Ruolo_`
                embed.addField(`👔 Ruoli:`, roles)
                embed.setTitle(`🎉 Utente Ritornato 🎉`)
                client.channels.cache.get(config.idcanali.logs.members.join).send({ embeds: [embed] })
                client.channels.cache.get(config.idcanali.publiclogs).send({ embeds: [embed] })
            }
        })
    }
}