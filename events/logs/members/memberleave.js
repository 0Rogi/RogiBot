const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberRemove`,
    async execute(member) {
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

        database.collection(`UserStats`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`UserStats`).insertOne({
                    username: member.user.username, id: member.id, roles: member._roles, moderation: {}, leaveAt: new Date().getTime()
                })
            } else if (result[0]) {
                if (member._roles.includes(config.idruoli.unverified)) {
                    member._roles.forEach(role => {
                        if (role.id == config.idruoli.unverified) return
                        member._roles == role.id
                    })
                }
                database.collection(`UserStats`).updateOne({ id: member.id }, {
                    $set: { roles: member._roles, leavedAt: new Date().getTime() }
                })
            }
        })

        let found = false;
        let foundpartnership;
        serverstats?.partnerships?.forEach(p => {
            if (p.user == member.user.id) {
                found = true;
                foundpartnership = p
            }
        })

        if (foundpartnership) {
            if (foundpartnership.user == member.user.id) {
                client.channels.cache.get(config.idcanali.partnership).messages.fetch(foundpartnership.message1).then(m => m.delete());
                client.channels.cache.get(config.idcanali.partnership).messages.fetch(foundpartnership.message2).then(m => m.delete());
                database.collection(`ServerStats`).updateOne({}, { $pull: { "partnerships": { user: member.user.id } } });
                let moderator = await client.users.fetch(foundpartnership.executor);
                let embed = new Discord.MessageEmbed()
                    .setTitle(`❌ PARTNERSHIP ANNULLATA ❌`)
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤 Utente:`, `Nome: **${member.user.username}** - ID: **${member.user.id}**\n||${member.toString()}||`)
                    .addField(`🔨 Moderatore:`, `Nome: **${moderator.username}** - ID: **${moderator.id}**\n||${moderator.toString()}||`)
                    .addField(`🏠 Server:`, `**${foundpartnership.server.toUpperCase()}**`)
                    .setThumbnail(interction.member.displayAvatarURL({ dynamic: true }))
                    .setColor(`RED`);
                client.channels.cache.get(config.idcanali.logs.partnership.leftedpartnership).send({ embeds: [embed] });
            }
        }

    }
}