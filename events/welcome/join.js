const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `guildMemberAdd`,
    async execute(member) {
        if (member.guild.id != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(member.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(member.user.id)) return

        member.roles.add(config.idruoli.unverified)

        const embed = new Discord.MessageEmbed()
            .setTitle(`SEI ENTRATO IN ROGI DISCORD`)
            .setDescription(`Benvenuto in **Rogi Discord**!\n\nPer poter avere l'accesso a **tutti i canali**, premi il pulsante verde in <#${config.idcanali.verify}> e verificati!`)
            .setColor(`#808080`)
            .setThumbnail(member.guild.iconURL({ dynamic: true }));
        member.user.send({ embeds: [embed] }).catch(() => { });

        client.channels.cache.get(config.idcanali.verify).send({ content: `<@&963853288351084586>`, allowedMentions: { users: ['963853288351084586'] } }).then(msg => {
            setTimeout(() => {
                msg.delete();
            }, 1000);
        });

        database.collection(`UserStats`).find({ id: member.id }).toArray(function (err, result) {
            if (!result[0]) return
            if (result[0])
                database.collection(`UserStats`).updateOne({ id: member.id }, { $set: { leavedAt: 0 } })
        })
    }
}