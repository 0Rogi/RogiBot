module.exports = {
    name: `avatar`,
    execute(message, args) {
        let date = new Date()
        if(date.getMonth() == 3 && date.getDate() == 1) {
            let embed = new Discord.MessageEmbed()
                .setImage(`https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif`)
                .setColor(`YELLOW`)
            message.reply({embeds: [embed]}).then(msg => {
                setTimeout(() => {
                    let id = args[0]
                    let server = client.guilds.cache.get(config.idServer.idServer)
                    let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) || message.member 
                    let avatar = user.displayAvatarURL({dynamic: true, size: 512})
                    let avatarjpeg = user.displayAvatarURL({dynamic: true, size: 512, format: `jpeg`})
                    let avatarpng = user.displayAvatarURL({dynamic: true, size: 512, format: `png`})
                    let avatarwebp = user.displayAvatarURL({dynamic: true, size: 512, format: `webp`})
                    let avatargif = user.displayAvatarURL({dynamic: true, size: 512, format: `gif`})
                    user.displayAvatarURL({dynamic: true, size: 512})
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Avatar di ${user.user.username}`)
                        .setImage(avatar)
                        .setColor(`YELLOW`)
                        .setDescription(`Altri formati: [**.jpeg**](${avatarjpeg}) [**.png**](${avatarpng}) [**.webp**](${avatarwebp}) [**.gif**](${avatargif})`)
                    msg.edit({embeds: [embed]})
                }, 1000 * 5);
            })
            return
        }
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) || message.member 
        let avatar = user.displayAvatarURL({dynamic: true, size: 512})
        let avatarjpeg = user.displayAvatarURL({dynamic: true, size: 512, format: `jpeg`})
        let avatarpng = user.displayAvatarURL({dynamic: true, size: 512, format: `png`})
        let avatarwebp = user.displayAvatarURL({dynamic: true, size: 512, format: `webp`})
        let avatargif = user.displayAvatarURL({dynamic: true, size: 512, format: `gif`})
        user.displayAvatarURL({dynamic: true, size: 512})
        let embed = new Discord.MessageEmbed()
            .setTitle(`Avatar di ${user.user.username}`)
            .setImage(avatar)
            .setColor(`YELLOW`)
            .setDescription(`Altri formati: [**.jpeg**](${avatarjpeg}) [**.png**](${avatarpng}) [**.webp**](${avatarwebp}) [**.gif**](${avatargif})`)
        message.reply({embeds: [embed]})
    }
}