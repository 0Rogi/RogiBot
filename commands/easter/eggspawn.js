const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `eggspawn`,
    FromHelpers: true,
    async execute(message) {
        let date = new Date()
        if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18) {
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
            let embedlog = new Discord.MessageEmbed()
                .setTitle(`<:EasterEgg:962650324022222909> EGG SPAWN <:EasterEgg:962650324022222909>`)
                .setColor(`YELLOW`)
                .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setThumbnail(message.member.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`⚙️Generato in:`, channel.toString())
            client.channels.cache.get(`960926896651128904`).send({embeds: [embedlog]})
            client.channels.cache.get(`963473599149269084`).send({embeds: [embedlog]})
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`<:EasterEgg:962650324022222909>Uovo generato con successo!<:EasterEgg:962650324022222909>`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`⚙️Generato in:`, channel.toString())
                .setColor(`YELLOW`)
            message.reply({embeds: [embed2]})
            channel.send({embeds: [embed]}).then(msg => {
                let button = new Discord.MessageButton()
                    .setCustomId(`Egg,${msg.id}`)
                    .setLabel(`Raccogli`)
                    .setEmoji(`<:EasterBaket:964153827756486686>`)
                    .setStyle(`PRIMARY`)
            
                let row = new Discord.MessageActionRow()
                    .addComponents(button)
                msg.edit({components: [row]})
            })
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo comando è utilizzabile\nsolo durante la settimana di Pasqua!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
    }
}