const MongoClient = require(`mongodb`).MongoClient;
global.database;
global.serverstats = false;
const moment = require(`moment`);
const fs = require(`fs`);
const config = require(`${process.cwd()}/JSON/config.json`);
const ytnotifier = require(`${process.cwd()}/functions/youtube/ytnotifier.js`);
const subscribercounter = require(`${process.cwd()}/functions/youtube/subscribercounter.js`);
const checkbans = require(`${process.cwd()}/functions/moderation/checkbans.js`);
const unmute = require(`${process.cwd()}/functions/moderation/unmute.js`);
const setpermissions = require(`${process.cwd()}/functions/general/setpermissions.js`);
const serverstatsupdate = require(`${process.cwd()}/functions/general/serverstatsupdate.js`);
const updateuserindb = require(`${process.cwd()}/functions/general/updateuserindb.js`);
const membercounter = require(`${process.cwd()}/functions/general/membercounter.js`);
const events = require(`${process.cwd()}/functions/general/events.js`);
const databasebackup = require(`${process.cwd()}/functions/moderation/databasebackup.js`);
const deleteuserfromdb = require(`${process.cwd()}/functions/moderation/deleteuserfromdb.js`);
const nightSecurity = require(`${process.cwd()}/functions/moderation/nightsecurity.js`);
const statusUpdate = require(`${process.cwd()}/functions/general/statusupdate.js`);
const leaveVoiceChannel = require(`${process.cwd()}/functions/general/leaveVoiceChannel.js`);

module.exports = {
    name: `ready`,
    async execute() {
        console.clear();
        statusUpdate();
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ BOT ONLINE - ${process.env.local ? `Local` : `Host`}`)
            .setColor(`GREEN`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🟢 Online`, `<:RogiBot:1003320534811033600> Rogi Bot Online!`);
        client.channels.cache.get(config.idcanali.logs.online).send({ embeds: [embed] });
        console.log(`LOADING...`);
        let db = await MongoClient.connect(process.env.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true });
        database = await db.db(`RogiDiscordDB`);
        await database.collection(`ServerStats`).find().toArray(async function (err, result) {
            global.serverstats = await result[0];
            setInterval(serverstatsupdate, 500);

            let testers = ``;
            serverstats.testers.forEach(tester => {
                testers += `${client.users.cache.get(tester)?.tag}, `;
            })
            if (testers != ``)
                testers = testers.slice(0, testers.length - 2);
            else if (testers == ``)
                testers = `Nessun Tester`;

            console.clear();
            console.table({
                'Bot': client.user.username,
                'Database': database ? `Connesso` : `Errore durante la connessione`,
                'Local': process.env.local ? `Sì` : `No`,
                'Manutenzione': serverstats.maintenance ? `Attivata` : `Disattivata`,
                'Testers': testers,
                'Comandi': client.commands.size.toString(),
                'Discord.js': `v` + Discord.version,
                'Node.js': process.version
            });

        });

        setInterval(ytnotifier, 1000 * 60 * 5);
        setInterval(unmute, 1000);
        setInterval(checkbans, 1000 * 60);
        setInterval(events, 1000);
        setInterval(() => { databasebackup(false) }, 1000 * 60);
        setInterval(updateuserindb, 1000 * 60);
        setInterval(subscribercounter, 1000 * 60);
        setInterval(membercounter, 1000 * 60);
        setInterval(setpermissions, 1000 * 60 * 2);
        setInterval(() => {
            if (new Date().getHours() == 22 && new Date().getMinutes() == 30 && new Date().getSeconds() == 0) {
                nightSecurity(true);
            }
            if (new Date().getHours() == 8 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                nightSecurity(false);
            }
        }, 1000);
        setInterval(deleteuserfromdb, 1000 * 60 * 5);
        setInterval(statusUpdate, 1000 * 60 * 10);
        setInterval(leaveVoiceChannel, 1000);
    }
}