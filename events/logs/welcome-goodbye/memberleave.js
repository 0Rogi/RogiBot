module.exports = {
    name: `guildMemberRemove`,
    execute(member) {
        if(member.guild != config.idServer.idServer) return
        let channel = client.channels.cache.get(config.idcanali.logs.joinleave)
        let embed = new Discord.MessageEmbed()
            .setTitle(`📤Membro in meno📤`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
            .addField(`👁️Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .addField(`📥Entrato il:`, `${moment(member.user.joinAt).format(`ddd DD MMM YYYY`)}`)
            .setThumbnail(member.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .setColor(`RED`)
        channel.send({embeds: [embed]})
        MongoClient.connect(process.env.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            let database = db.db(`RogiDiscordDB`)
            database.collection(`CollectionTest`).find({id: member.id}).toArray(function(err, result) {
                if(!result[0]) {
                    database.collection(`CollectionTest`).insertOne({id: member.id, roles: member._roles})
                }
                if(result[0]) {
                    database.collection(`CollectionTest`).updateOne({id: member.id}, {$set:{roles: member._roles}})
                }
            })
        })
    }
}