const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)
const fs = require(`fs`)

//* Egg Spawn
setInterval(async () => {
    let date = new Date()
    if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18 && date.getHours() >= 9 && date.getHours() < 21) {
        
        let rooms = [`813470597135728752`, `956934019147239434`, `826014465186332682`]
        
        let tosend = await rooms[Math.floor(Math.random() * rooms.length)]
        
        let channel = client.channels.cache.get(tosend)
        
        if(!channel) return
            
        let images = [`https://i.imgur.com/7Uqrc7N.png`, `https://i.imgur.com/GszUMxY.png`, `https://i.imgur.com/1K1giyz.png`]
        let image = await images[Math.floor(Math.random() * images.length)]
            
        let embed = new Discord.MessageEmbed()
            .setTitle(`<:EasterEgg:962650324022222909> Nuovo Uovo di Pasqua <:EasterEgg:962650324022222909>`)
            .setDescription(`Il **coniglio Pasquale** <:EasterRabbit:962650083147538483> ha portato un nuovo **__uovo di Pasqua__**!\nRaccoglilo **prima degli altri** per ricevere il premio <:Prize:962650501160251482>!`)
            .setColor(`YELLOW`)  
            .setThumbnail(image)
            .setFooter({text: `Ancora non Riscattato`})
            
        channel.send({embeds: [embed]}).then(msg => {
            let button = new Discord.MessageButton()
                .setCustomId(`Egg,${msg.id}`)
                .setLabel(`Raccogli`)
                .setEmoji(`<:EasterBaket:964153827756486686>`)
                .setStyle(`PRIMARY`)
            
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            msg.edit({components: [row]})
            
            let embedlog = new Discord.MessageEmbed()
                .setTitle(`<:EasterEgg:962650324022222909> EGG SPAWN <:EasterEgg:962650324022222909>`)
                .setColor(`YELLOW`)
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `*Generato automaticamente*`)
                .addField(`⚙️Generato in:`, channel.toString())
            client.channels.cache.get(`960926896651128904`).send({embeds: [embedlog]})
            client.channels.cache.get(`963473599149269084`).send({embeds: [embedlog]})
        })
    }
}, 1000 * 60 * 60)

//* Remove Cooldown
global.removecooldown = function() {
    database.collection(`Easter`).find().toArray(function(err, result){
        result.forEach(r => {
            let oldcooldown = r.cooldown
            let newcooldown = oldcooldown - 1000
            if(newcooldown < 0) return
            database.collection(`Easter`).updateOne({id: r.id}, {$set:{cooldown: newcooldown}})
        })
    })
}

//* AutoMessages
global.automessages = function() {
    let date = new Date()
    if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 19 && date.getHours() == 0 && date.getMinutes() == 0) {
        database.collection(`Easter`).find().toArray(async function(err, result) {
            const json = JSON.stringify(result)
            fs.writeFile("backup.json", json, function(err) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`📦DATABASE BACKUP📦`)
                    .setColor(`YELLOW`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                client.channels.cache.get(`963473599149269084`).send({embeds: [embed], files: [`${process.cwd()}/backup.json`]})
                client.channels.cache.get(`960926896651128904`).send({embeds: [embed], files: [`${process.cwd()}/backup.json`]}) 
            })
        })
    }
    if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18 && date.getHours() == 9 && date.getMinutes() == 0) {
        database.collection(`Easter`).find().sort({points: -1}).toArray(function(err, result) {
            let text = ``
            let i = 0
            result.forEach(async r => {
                if(i > 10 - 1) return
                let id = r.id
                let user = client.users.cache.get(id)
                if(user) user = user.username
                if(!user) user = r.username
                text += `**#${i + 1}** ${user} - **${r.points}** - **${r.eggsopen}**\n`
                i++
            })
            if(!text) text = `_Nessun utente in classifica_`
            client.channels.cache.get(config.idcanali.generaltxt).send(`Buongiorno a tutti😉\nLa caccia alle uova<:EasterEgg:962650324022222909> **ricomincia da ora**. Buona fortuna\n\n**🏆Classifica Attuale**:\n${text}`)
        })
    }
    if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18 && date.getHours() == 21 && date.getMinutes() == 0) {
        client.channels.cache.get(config.idcanali.generaltxt).send(`Il coniglio Pasquale<:EasterRabbit:962650083147538483> è andato a dormire, **per oggi la caccia alle uova<:EasterEgg:962650324022222909> finisce qui**.\nBuona notte😉`)
    }
}
