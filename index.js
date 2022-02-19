require('events').EventEmitter.prototype._maxListeners = 100 
global.Discord = require(`discord.js`)
global.ms = require(`ms`)
global.moment = require(`moment`)
global.Canvas = require(`canvas`)
global.ytch = require(`yt-channel-info`)
global.lyricsFinder = require('lyrics-finder')
global.discordTranscripts = require('discord-html-transcripts')
global.client = new Discord.Client({intents: 32767, allowedMentions: { repliedUser: false }})
const fs = require(`fs`) 
global.config = require(`./JSON/config.json`)
global.parolacce = require(`./JSON/badwords.json`)
global.bestemmie = require(`./JSON/bestemmie.json`)
global.checkspam = new Map()
global.delete = true
try {
    require('dotenv').config()
} catch {

}

client.login(process.env.token)

//!Commands Handler
client.commands = new Discord.Collection() 

const commandsFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`)) 
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`) 
    client.commands.set(command.name, command) 
}

const commandsFolder = fs.readdirSync(`./commands`) 
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(`.js`)) 
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`) 
        client.commands.set(command.name, command) 
    }
}

//!Event Handler
const eventsFolders = fs.readdirSync('./events') 
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (const file of eventsFiles) {
        if (file.endsWith(".js")) {
            const event = require(`./events/${folder}/${file}`) 
            client.on(event.name, (...args) => event.execute(...args)) 
        }
        else {
            const eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (const file2 of eventsFiles2) {
                const event = require(`./events/${folder}/${file}/${file2}`) 
                client.on(event.name, (...args) => event.execute(...args)) 
            }
        }
    }
}

//!Commands Check
client.on(`messageCreate`, message => {
    const prefix = `!` 

    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild || message.content.startsWith(`${prefix}${prefix}`) || message.content == prefix || message.guild != config.idServer.idServer) return

    const args = message.content.slice(prefix.length).trim().split(/ +/) 
    const command = args.shift().toLowerCase() 
    
    if(command == "play" || command == "p" || command == "pause" || command == "resume" || command == "leave" || command == "stop" || command == "skip" || command == "next" || command == "autoplayoff" || command == "autoplayon" || command == "repeat" || command == "queue") return
    
    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Il comando \`!${command}\` non esiste`)
            .setTitle(`Comando non esistente`)
        message.reply({embeds: [embed]})
        return
    }

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if(comando.onlyHelpers && !message.member.roles.cache.has(config.idruoli.owner) && !message.member.roles.cache.has(config.idruoli.moderator) && !message.member.roles.cache.has(config.idruoli.helper)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno **Helper** per eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
        message.reply({embeds: [embed]})
        return
    }

    if(comando.onlyMods && !message.member.roles.cache.has(config.idruoli.owner) && !message.member.roles.cache.has(config.idruoli.moderator)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno **Moderatore** per eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
        message.reply({embeds: [embed]})
        return
    }

    if(comando.onlyOwner && !message.member.roles.cache.has(config.idruoli.owner)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno **Owner** per eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
        message.reply({embeds: [embed]})
        return
    }

    comando.execute(message, args) 
})

//? Members and Subscribers Counter + Youtube Notifier + San Valentine Event
setInterval(function () {
    let server = client.guilds.cache.get(config.idServer.idServer) 
    //Member Counter
    let botCount = server.members.cache.filter(member => member.user.bot).size 
    let utentiCount = server.memberCount - botCount 
    let canalemembri = client.channels.cache.get(config.idcanali.membri)
    canalemembri.setName(`👾│Members: ${utentiCount}`)
    //Youtube Counter
    ytch.getChannelInfo(`UCw7lKb-XBW4ApE0puSbJLFQ`).then((response) => {
        let canaleyoutube = client.channels.cache.get(config.idcanali.iscritti)
        canaleyoutube.setName(`🎬│Subscribers: ${response.subscriberCount}`)
    })
    //Youtube Notifier
    ytch.getChannelVideos(`UCw7lKb-XBW4ApE0puSbJLFQ`, `newest`).then(async response => {
        let idVideo = response.items[0]?.videoId
        if (!idVideo) return

        client.channels.cache.get(`813375357428170792`).messages.fetch()
            .then(messages => {
                let giaMandato = false 
                messages.forEach(msg => {
                    if (msg.content.includes(idVideo)) giaMandato = true 
                }) 

                if (!giaMandato) {
                    client.channels.cache.get(`813375357428170792`).send(`**${response.items[0].author}** Ha pubblicato un nuovo video: **${response.items[0].title}**!! Che aspetti? Corri a vederlo!!\nhttps://www.youtu.be/${idVideo}`)
                }
            })
    })
    //San Valentine Event
    let date = new Date()
    if(date.getMonth() == 1 && date.getDate() == 14 && date.getHours() == 7 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/8KLWK5k.png`)
    }
    if(date.getMonth() == 1 && date.getDate() == 15 && date.getHours() == 7 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/9L95Pls.png`)
    }
}, 1000 * 60)

//! Code errors
process.on(`uncaughtException`, async err => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`⚠️ERRORE⚠️`)
        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format('ddd DD MMM YYYY, HH:mm:ss')}`)
        .addField(`📛Errore:`, err.stack ? `${err.stack.slice(0, 900)}` : `${err.slice(0, 900)}`)
        .setThumbnail(`https://i.imgur.com/ULYfVp2.png`)
        .setColor(`RED`)
    let button = new Discord.MessageButton()
        .setLabel(`Elimina`)
        .setCustomId(`Elimina`)
        .setStyle(`DANGER`)
        .setEmoji(`🗑️`)
    let button2 = new Discord.MessageButton()
        .setLabel(`Elimina Tutti`)
        .setCustomId(`EliminaTutti`)
        .setStyle(`DANGER`)
        .setEmoji(`🗑️`)
    let row = new Discord.MessageActionRow()
        .addComponents(button, button2)
    await client.channels.cache.get(config.idcanali.logs.codeerror).send({embeds: [embed], components: [row]})
    console.log(err)
})
process.on(`unhandledRejection`, async err => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`⚠️ERRORE⚠️`)
        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format('ddd DD MMM YYYY, HH:mm:ss')}`)
        .addField(`📛Errore:`, err.stack ? `${err.stack.slice(0, 900)}` : `${err.slice(0, 900)}`)
        .setThumbnail(`https://i.imgur.com/ULYfVp2.png`)
        .setColor(`RED`)
    let button = new Discord.MessageButton()
        .setLabel(`Elimina`)
        .setCustomId(`Elimina`)
        .setStyle(`DANGER`)
        .setEmoji(`🗑️`)
    let button2 = new Discord.MessageButton()
        .setLabel(`Elimina Tutti`)
        .setCustomId(`EliminaTutti`)
        .setStyle(`DANGER`)
        .setEmoji(`🗑️`)
    let row = new Discord.MessageActionRow()
        .addComponents(button, button2)
    await client.channels.cache.get(config.idcanali.logs.codeerror).send({embeds: [embed], components: [row]})
    console.log(err)
})