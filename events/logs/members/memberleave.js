const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberRemove`,
    async execute(member) {
        if (member.guild != config.idServer.idServer) return;

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(member.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(member.id)) return;

        let embed = new Discord.MessageEmbed()
            .setTitle(`🙁 Utente Uscito 🙁`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤 Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
            .addField(`👀 Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .addField(`📥 Entrato il:`, `${moment(member.joinedAt).format(`ddd DD MMM YYYY`)}`)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setColor(`RED`);

        client.channels.cache.get(config.channelsid.logs.members.leave).send({ embeds: [embed] });
        const embedplogs = new Discord.MessageEmbed()
            .setAuthor({ name: `[LEAVE] @${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setColor(`RED`);
        client.channels.cache.get(config.channelsid.publiclogs).send({ embeds: [embedplogs] });

        database.collection(`UserStats`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`UserStats`).insertOne({
                    username: member.user.username, id: member.id, roles: member._roles, moderation: {}, leaveAt: new Date().getTime(), levelling: {}
                })
            } else if (result[0]) {
                if (member.roles.cache.has(config.rolesid.unverified)) {
                    database.collection(`UserStats`).updateOne({ id: member.id }, {
                        $set: { leavedAt: new Date().getTime() }
                    })
                    return;
                } else {
                    database.collection(`UserStats`).updateOne({ id: member.id }, {
                        $set: { roles: member._roles, leavedAt: new Date().getTime() }
                    })
                }
            }
        })
    }
}
