module.exports = {
    name: `kiss`,
    async execute(message, args) {
        let date = new Date()
        if(date.getMonth() == 1 && date.getDate() == 14 || !message.member.roles.cache.has(config.idruoli.srmoderator) || message.member.roles.cache.has(config.idruoli.owner)) {
            let id = args[0]
            let server = client.guilds.cache.get(config.idServer.idServer)
            let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
            if(!user) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Inserisci un utente valido\n\`!kiss [utente]\`*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.roginotfound)
                message.reply({embeds: [embed]})
                return
            }
            if(user == message.member) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non puoi baciare te stesso!!\nInserisci un utente valido\n\`!kiss [utente]\`*`)
                    .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
                message.reply({embeds: [embed]})
                return
            }
            Canvas.registerFont(`./Canvas/font/robotoBold.ttf`, {family: `robotoBold`})
            let canvas = Canvas.createCanvas(1280, 720)
            let context = canvas.getContext(`2d`)
            let background = await Canvas.loadImage(`./Canvas/img/KissCommand.png`)
            context.drawImage(background, 25, 25, canvas.width, canvas.height)
            let avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: `jpg` }))
            context.drawImage(avatar, 525, 300, 250, 250)
            context.font = '60px "robotoBold"'
            context.fillStyle = `#0088ff`
            context.fillText(`${message.author.username} ha mandato un bacio a\n${user.user.username}`, 250, 600)
            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), `kiss-canvas.png`)
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:KissCommand:942459632062959657>Kiss<a:KissCommand:942459632062959657>`)
                .setColor(`RED`)
                .setImage(`attachment://kiss-canvas.png`)
            message.reply({embeds: [embed], files: [attachment]})
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo comando è utilizzabile\nsolo durante San Valentino!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
    }
}