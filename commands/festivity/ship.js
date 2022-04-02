const Canvas = require(`canvas`)

module.exports = {
    name: `ship`,
    async execute(message, args) {
        let date = new Date()
        if(date.getMonth() == 1 && date.getDate() == 14 || message.member.roles.cache.has(config.idruoli.srmoderator) || message.member.roles.cache.has(config.idruoli.owner)) {
            let id = args[0]
            let server = client.guilds.cache.get(config.idServer.idServer)
            let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
            if(!user) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Inserisci un utente valido\n\`!ship [utente]\`*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.roginotfound)
                message.reply({embeds: [embed]})
                return
            }
            if(user == message.member) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non puoi shipparti con te stesso!!\nInserisci un utente valido\n\`!ship [utente]\`*`)
                    .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
                message.reply({embeds: [embed]})
                return
            }

            Canvas.registerFont(`./Canvas/font/robotoBold.ttf`, {family: `robotoBold`})
            let canvas = Canvas.createCanvas(1280, 720)
            let context = canvas.getContext(`2d`)
            let background = await Canvas.loadImage(`./Canvas/img/ShipCommand.jpg`)
            context.drawImage(background, 25, 25, canvas.width, canvas.height)
            let avatar1 = await Canvas.loadImage(message.member.displayAvatarURL({ format: `jpg` }))
            let avatar2 = await Canvas.loadImage(user.user.displayAvatarURL({ format: `jpg` }))
            context.drawImage(avatar1, 50, 350, 250, 250)
            context.drawImage(avatar2, 1000, 350, 250, 250)
            context.font = '60px "robotoBold"'
            context.fillStyle = `#0088ff`
            context.fillText(`${message.author.username} e ${user.user.username}\nsono compatibili al\n${Math.floor(Math.random() * 101)}%`, 350, 450)
            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), `ship-canvas.png`)
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:ShipCommand:942473010705752114>Ship<a:ShipCommand:942473010705752114>`)
                .setColor(`RED`)
                .setImage(`attachment://ship-canvas.png`)
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