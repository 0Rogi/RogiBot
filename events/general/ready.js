const MongoClient = require(`mongodb`).MongoClient
global.database;
global.serverstats = false
const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)
const ytnotifier = require(`${process.cwd()}/functions/youtube/ytnotifier.js`)
const subscribercounter = require(`${process.cwd()}/functions/youtube/subscribercounter.js`)
const checkbans = require(`${process.cwd()}/functions/moderation/checkbans.js`)
const unmute = require(`${process.cwd()}/functions/moderation/unmute.js`)
const setpermissions = require(`${process.cwd()}/functions/general/setpermissions.js`)
const serverstatsupdate = require(`${process.cwd()}/functions/general/serverstatsupdate.js`)
const updateuserindb = require(`${process.cwd()}/functions/general/updateuserindb.js`)
const membercounter = require(`${process.cwd()}/functions/general/membercounter.js`)
const events = require(`${process.cwd()}/functions/general/events.js`)
const databasebackup = require(`${process.cwd()}/functions/moderation/databasebackup.js`)

module.exports = {
    name: `ready`,
    async execute() {
        console.clear()
        client.user.setActivity(`/help`)
        console.log(`-- ${client.user.username} ONLINE --`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ BOT ONLINE - ${process.env.local ? `Local` : `Host`}`)
            .setColor(`GREEN`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🟢 Online`, `<:RogiBot:854792536694587434> Rogi Bot Online!`)
        client.channels.cache.get(config.idcanali.logs.online).send({ embeds: [embed] })
        let db = await MongoClient.connect(process.env.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
        database = await db.db(`RogiDiscordDB`)
        await console.log(`-- Connesso al database --`)
        await database.collection(`ServerStats`).find().toArray(async function (err, result) {
            global.serverstats = await result[0]
            setInterval(serverstatsupdate, 500)
            await console.log(`-- Serverstats Ottenuto --`)
        })
        setInterval(ytnotifier, 1000 * 60 * 5)
        setInterval(unmute, 1000)
        setInterval(checkbans, 1000 * 60)
        setInterval(events, 1000)
        setInterval(() => { databasebackup(false) }, 1000)

        setInterval(updateuserindb, 1000 * 60)
        setInterval(subscribercounter, 1000 * 60)
        setInterval(membercounter, 1000 * 60)
        setInterval(setpermissions, 1000 * 60 * 2)
    }
}