const fs = require(`fs`)
const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = async function databaseBackup(manual) {
    if (!manual && new Date().getHours() == 4 && new Date().getMinutes() == 0 || !manual && new Date().getHours() == 8 && new Date().getMinutes() == 0 || !manual && new Date().getHours() == 12 && new Date().getMinutes() == 0 || !manual && new Date().getHours() == 16 && new Date().getMinutes() == 0 || !manual && new Date().getHours() == 20 && new Date().getMinutes() == 0 || !manual && new Date().getHours() == 0 && new Date().getMinutes() == 0 || manual) {
        await database.collection(`UserStats`).find().toArray(function (err, result) {
            if (!result) return
            result = JSON.stringify(result, null, `\t`)
            fs.writeFile(`UserStatsBackup.json`, result, async function (err, result) {
                await database.collection(`ServerStats`).find().toArray(function (err, result) {
                    if (!result) return
                    result = JSON.stringify(result, null, `\t`)
                    fs.writeFile(`ServerStatsBackup.json`, result, async function (err, result) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`${manual ? `Backup Manuale` : `Backup Automatico`}`)
                            .setDescription(`📦 Backup del database 📦`)
                            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                            .setColor(`YELLOW`)
                        client.channels.cache.get(config.channelsid.logs.backups).send({ embeds: [embed], files: [`${process.cwd()}/ServerStatsBackup.json`, `${process.cwd()}/UserStatsBackup.json`] })
                    })
                })
            })
        })
    }
}
