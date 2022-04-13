const moment = require(`moment`)

//* Egg Spawn
setInterval(async () => {
    let date = new Date()
    if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18 && date.getHours() >= 9 && date.getHours() <= 21) {
        
        let rooms = [`813470597135728752`, `956934019147239434`, `826014465186332682`]
        
        let tosend = await rooms[Math.floor(Math.random() * rooms.length)]

        let channel = client.channels.cache.get(tosend)
        
        if(!channel) return
            
        let images = [`https://i.imgur.com/7Uqrc7N.png`, `https://i.imgur.com/GszUMxY.png`, `https://i.imgur.com/1K1giyz.png`]
        let image = await images[Math.floor(Math.random() * images.length)]
            
        let embed = new Discord.MessageEmbed()
            .setTitle(`<:EasterEgg:962650324022222909> Nuovo Uovo di Pasqua <:EasterEgg:962650324022222909>`)
            .setDescription(`Il **coniglio Pasquale** <:EasterRabbit:962650083147538483> ha portato un nuovo **__uovo di Pasqua__**!\nAprilo **prima degli altri** per ricevere il premio <:Prize:962650501160251482>!`)
            .setColor(`YELLOW`)  
            .setThumbnail(image)
            .setFooter({text: `Ancora non Riscattato`})
            
        channel.send({embeds: [embed]}).then(msg => {
            let button = new Discord.MessageButton()
                .setCustomId(`Egg,${msg.id}`)
                .setLabel(`Raccogli`)
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