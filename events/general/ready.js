const MongoClient = require(`mongodb`).MongoClient;
global.database;
global.serverstats = false;
global.gambleCooldown = new Map();
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
const checkBadges = require(`${process.cwd()}/functions/general/checkbadges.js`);
const addStaffInDB = require(`${process.cwd()}/functions/helper/addStaffInDB.js`);
const generateGame = require(`../../functions/generategames`);

const checkVip = require(`../../functions/general/checkVip.js`);

module.exports = {
    name: `ready`,
    async execute() {
        console.clear();
        statusUpdate();
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅ BOT ONLINE - ${process.env.local ? `Local` : `Host`}`)
            .setColor(`GREEN`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🟢 Online`, `<:rogibot:1086953246708465664> Rogi Bot Online!`);
        client.channels.cache.get(config.channelsid.logs.online).send({ embeds: [embed] });
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
        setInterval(unmute, 1000 * 60);
        setInterval(checkbans, 1000 * 60);
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
        setInterval(checkBadges, 1000 * 60 * 10);

        setInterval(() => {
            if (new Date().getHours() == 17 && new Date().getMinutes() == 0) {
                if (serverstats?.maintenance) return;

                generateGame();
            }
        }, 1000 * 60);

        setInterval(() => {

            if (new Date().getTime() >= serverstats?.game2?.expireDate) {
                client.channels.cache.get("813470597135728752").messages.fetch(serverstats?.game2?.messageId).then(m => {
                    const button = new Discord.MessageButton()
                        .setLabel(`Gira la Ruota`)
                        .setCustomId(`SpinWheel`)
                        .setStyle(`PRIMARY`)
                        .setDisabled();
                    const row = new Discord.MessageActionRow()
                        .addComponents(button);
                    m.edit({ components: [row] });

                    database.collection(`ServerStats`).updateOne({}, {
                        $unset: {
                            'game2': ""
                        }
                    });

                });
            }

            database.collection(`UserStats`).find().toArray(function (err, result) {
                if (err || !result) return;

                result.forEach(u => {
                    if (!u.economy?.xpboost) return;

                    if (new Date().getTime() >= u.economy?.xpboost) {
                        client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == u.id).roles.remove(`1053719384662749274`);
                        database.collection(`UserStats`).updateOne({ id: u.id }, {
                            $unset: {
                                'economy.xpboost': ""
                            }
                        });
                    }
                })
            });

        }, 1000 * 60);

        setInterval(() => {
            if (new Date().getMonth() == 1 && new Date().getDate() == 14 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`SaintValentine`);
                return;
            }

            if (new Date().getMonth() == 3 && new Date().getDate() == 1 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`AprilFool`);
                return;
            }

            if (new Date().getMonth() == 3 && new Date().getDate() == 25 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`ItalyFlag`);
                return;
            }

            if (new Date().getMonth() == 4 && new Date().getDate() == 1 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`ItalyFlag`);
                return;
            }

            if (new Date().getMonth() == 5 && new Date().getDate() == 2 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`ItalyFlag`);
                return;
            }

            if (new Date().getMonth() == 6 && new Date().getDate() == 1 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`Summer`);
                return;
            }

            if (new Date().getMonth() == 9 && new Date().getDate() == 1 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`Halloween`);
                return;
            }

            if (new Date().getMonth() == 11 && new Date().getDate() == 1 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
                events(`Christmas`);
                return;
            }

            if ((new Date().getMonth() == 1 && new Date().getDate() == 15 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 3 && new Date().getDate() == 2 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 3 && new Date().getDate() == 26 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 4 && new Date().getDate() == 2 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 5 && new Date().getDate() == 3 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 8 && new Date().getDate() == 1 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 10 && new Date().getDate() == 3 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) || (new Date().getMonth() == 0 && new Date().getDate() == 7 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0)) {
                events(`Reset`);
                return;
            }
        }, 1000);

        setInterval(() => {
            database.collection(`Staff`).find().toArray(async function (err, result) {
                if (result.length <= 0) {
                    addStaffInDB();
                }
            })
        }, 1000 * 60 * 60);

        setInterval(() => {
            if (new Date().getDay() == 0 && new Date().getHours() == 23 && new Date().getMinutes() == 59 && new Date().getSeconds() == 0) {
                database.collection(`Staff`).find().toArray(function (err, result) {
                    if (!result) return;

                    result.forEach(async r => {
                        const user = await client.users.fetch(r.id)
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Statistiche di ${user.username}`)
                            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                            .setColor(`YELLOW`)
                            .addField(`Messaggi Questa Settimana:`, r.messages.toString(), true)
                            .addField(`\u200b`, `\u200b`, true)
                            .addField(`\u200b`, `\u200b`, true)
                            .addField(`\u200b`, `\u200b`, true)
                            .addField(`Azioni da Staffer`, r.actions.toString());
                        client.channels.cache.get(config.channelsid.staffstats).send({ embeds: [embed] });
                        database.collection(`Staff`).deleteOne({ id: r.id });
                    });

                    addStaffInDB();
                })
            }
        }, 1000)

        checkVip(); //! Togliere

        setInterval(checkVip, 1000 * 60 * 5);
    }
}