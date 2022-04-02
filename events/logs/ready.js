const MongoClient = require(`mongodb`).MongoClient
global.database;
const moment = require(`moment`)

module.exports = {
    name: `ready`,
    async execute() {
        console.clear()
        client.user.setActivity(`!help`)
        console.log(`Online`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅BOT ONLINE`)
            .setColor(`GREEN`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🟢Online`,`<:RogiBot:854792536694587434> Rogi Bot Online!`)
        client.channels.cache.get(config.idcanali.logs.online).send({embeds: [embed]})
        let db = await MongoClient.connect(process.env.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true})
        database = await db.db(`RogiDiscordDB`)
        console.log(`✅Connesso al database!`)
        //? Update users in db
        setInterval(() => {
            client.guilds.cache.get(config.idServer.idServer).members.cache.forEach(member => {
                database.collection(`CollectionTest`).find({id: member.id}).toArray(function(err, result) {
                    if(!result[0]) {
                        database.collection(`CollectionTest`).insertOne({id: member.id, roles: member._roles})
                        console.log(`Utente aggiunto al database: ID: ${member.id}\nNome: ${member.user.username}`)
                    }
                    if(result[0]) {
                        database.collection(`CollectionTest`).updateOne({id: member.id}, {$set:{roles: member._roles}})
                        database.collection(`CollectionTest`).updateOne({id: member.id}, {$set:{username: member.user.username}})
                    }
                })
            })
        }, 1000 * 60)
    }
}