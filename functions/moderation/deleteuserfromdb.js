const fs = require("fs");
const moment = require("moment")

module.exports = async function deleteUserFromDB() {
    database.collection(`UserStats`).find().toArray(function (err, result) {
        result.forEach(user => {
            if (user.leavedAt == 0 || user.moderation.type) return;
            if (user.moderation.type) return;
            if (new Date().getTime() - user.leavedAt >= 1209600000) {
                let jsonuser = JSON.stringify(user, null, `\t`);
                fs.writeFile(`${user.id}.json`, jsonuser, async function (err, result) {
                    let userfetch = await client.users.fetch(user.id).catch(() => { });
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`💀 UTENTE ELIMINATO DAL DATABASE 💀`)
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**`)
                        .setThumbnail(userfetch?.displayAvatarURL({ dynamic: true }));
                    client.channels.cache.get(`1012021183014764574`).send({ embeds: [embed], files: [`${process.cwd()}/${user.id}.json`] });
                    database.collection(`UserStats`).deleteOne({ id: user.id });
                })
            }
        })
    })
}