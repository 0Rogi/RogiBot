const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = function checkbadges() {
    const guild = client.guilds.cache.get(config.idServer.idServer);

    guild.members.cache.forEach(async member => {

        let memberbadges = [];

        if (member.roles.cache.has(config.idruoli.vip)) {
            memberbadges.push(`vip`);
        }

        if (member.roles.cache.has(config.idruoli.serverbooster)) {
            memberbadges.push(`booster`);
        }

        if (member.roles.cache.has(config.idruoli.friend)) {
            memberbadges.push(`friend`);
        }

        if (member.permissions.has(`MANAGE_MESSAGES`)) {
            memberbadges.push(`staff`);
        }

        if (member.roles.cache.has(config.idruoli.level50) || member.roles.cache.has(config.idruoli.level60) || member.roles.cache.has(config.idruoli.level70) || member.roles.cache.has(config.idruoli.level80) || member.roles.cache.has(config.idruoli.level90) || member.roles.cache.has(config.idruoli.level100)) {
            memberbadges.push(`level50`);
        }

        if (member.roles.cache.has(config.idruoli.level100)) {
            memberbadges.push(`level100`);
        }

        if (new Date().getTime() - member.joinedAt.getTime() >= 31557600000) {
            memberbadges.push(`1year`);
        }

        if (new Date().getTime() - member.joinedAt.getTime() >= 157788000000) {
            memberbadges.push(`5years`);
        }

        if (new Date().getTime() - member.joinedAt.getTime() >= 315576000000) {
            memberbadges.push(`10years`);
        }

        await database.collection(`UserStats`).find({ id: member.user.id }).toArray(function (err, result) {
            if (err || !result[0]) return;

            if (result[0]) {
                if (result[0].countingcorrect >= 500) {
                    memberbadges.push(`counting500`);
                }
                if (result[0].acceptedsuggests >= 100) {
                    memberbadges.push(`suggests100`);
                }

                database.collection(`UserStats`).updateOne({ id: member.user.id }, {
                    $set: {
                        'customprofile.badges': memberbadges,
                    }
                })

            }
        })
    })
}