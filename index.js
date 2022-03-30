require(`events`).EventEmitter.prototype._maxListeners = 100 
global.Discord = require(`discord.js`)
global.ms = require(`ms`)
global.moment = require(`moment`)
global.Canvas = require(`canvas`)
global.ytch = require(`yt-channel-info`)
global.lyricsFinder = require(`lyrics-finder`)
global.discordTranscripts = require(`discord-html-transcripts`)
global.discordModals = require(`discord-modals`)
global.MongoClient = require(`mongodb`).MongoClient
global.client = new Discord.Client({intents: 32767, partials: [`MESSAGE`, `CHANNEL`, `REACTION`], allowedMentions: { parse: [] }})
discordModals(client)
let fs = require(`fs`) 
global.config = require(`./JSON/config.json`)
global.parolacce = require(`./JSON/badwords.json`)
global.bestemmie = require(`./JSON/bestemmie.json`)
global.checkspam = new Map()
global.database;
try {
    require(`dotenv`).config()
} catch {

}

client.login(process.env.token)

//!Commands Handler
client.commands = new Discord.Collection() 

let commandsFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`)) 
for (let file of commandsFiles) {
    let command = require(`./commands/${file}`) 
    client.commands.set(command.name, command) 
}

let commandsFolder = fs.readdirSync(`./commands`) 
for (let folder of commandsFolder) {
    let commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(`.js`)) 
    for (let file of commandsFiles) {
        let command = require(`./commands/${folder}/${file}`) 
        client.commands.set(command.name, command) 
    }
}

//!Event Handler
let eventsFolders = fs.readdirSync(`./events`) 
for (let folder of eventsFolders) {
    let eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (let file of eventsFiles) {
        if (file.endsWith(`.js`)) {
            let event = require(`./events/${folder}/${file}`) 
            client.on(event.name, (...args) => event.execute(...args)) 
        }
        else {
            let eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (let file2 of eventsFiles2) {
                let event = require(`./events/${folder}/${file}/${file2}`) 
                client.on(event.name, (...args) => event.execute(...args)) 
            }
        }
    }
}

//!Commands Check
client.on(`messageCreate`, message => {
    let trovata = false
    parolacce.forEach(parola => {
        if (message.content.toLowerCase().includes(parola.toLowerCase())) {
            trovata = true
        }
    })
    if (trovata && !message.member.roles.cache.has(config.idruoli.staff)) return
    
    let prefix = `!` 

    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild || message.content.startsWith(`${prefix}${prefix}`) || message.content == prefix || message.guild != config.idServer.idServer || message.channel == config.idcanali.thingstodo || message.channel == config.idcanali.suggests) return

    let args = message.content.slice(prefix.length).trim().split(/ +/) 
    let command = args.shift().toLowerCase() 
    
    if(command == `play` || command == `p` || command == `pause` || command == `resume` || command == `leave` || command == `stop` || command == `skip` || command == `next` || command == `autoplayoff` || command == `autoplayon` || command == `repeat` || command == `queue`) return
    
    let comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    
    if (!comando) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Il comando \`!${command}\` **non esiste**`)
            .setTitle(`Comando non esistente`)
            .setThumbnail(config.images.rogierror)
        message.reply({embeds: [embed]}).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => {})
                message.delete().catch(() => {})
            }, 1000 * 5);
        })
        return
    }

    if(!message.member.roles.cache.has(config.idruoli.staff) && message.channel != config.idcanali.commands && message.channel.parent != config.idcanali.helpparent && message.channel != config.idcanali.testing) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`**Tutti i comandi** devono essere\nutilizzati in <#${config.idcanali.commands}>`)
            .setTitle(`Canale non concesso`)
            .setThumbnail(config.images.rogierror)
        message.reply({embeds: [embed]}).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => {})
                message.delete().catch(() => {})
            }, 1000 * 5);
        })
        return
    }

    if(comando.FromHelpers && !message.member.roles.cache.has(config.idruoli.owner) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.moderator) && !message.member.roles.cache.has(config.idruoli.helper)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno <@&${config.idruoli.helper}>\nper eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
            .setThumbnail(config.images.rogierror)
        message.reply({embeds: [embed]}).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => {})
                message.delete().catch(() => {})
            }, 1000 * 5);
        })
        return
    }

    if(comando.FromMods && !message.member.roles.cache.has(config.idruoli.owner) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.moderator)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno <@&${config.idruoli.moderator}>\nper eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
            .setThumbnail(config.images.rogierror)
        message.reply({embeds: [embed]}).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => {})
                message.delete().catch(() => {})
            }, 1000 * 5);
        })
        return
    }

    if(comando.FromOwner && !message.member.roles.cache.has(config.idruoli.owner)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno <@&${config.idruoli.owner}>\nper eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
            .setThumbnail(config.images.rogierror)
        message.reply({embeds: [embed]}).then(msg => {
            setTimeout(() => {
                msg.delete().catch(() => {})
                message.delete().catch(() => {})
            }, 1000 * 5);
        })
        return
    }

    comando.execute(message, args) 
})

//? Members and Subscribers Counter + Youtube Notifier + San Valentine Event + Other Logs
setInterval(async function () {
    let server = client.guilds.cache.get(config.idServer.idServer) 
    //Member Counter
    let botCount = server.members.cache.filter(member => member.user.bot).size 
    let utentiCount = server.memberCount - botCount 
    let canalemembri = client.channels.cache.get(config.idcanali.membri)
    canalemembri.setName(`👪│Members: ${utentiCount}`)
    //Youtube Counter
    ytch.getChannelInfo(`UCw7lKb-XBW4ApE0puSbJLFQ`).then((response) => {
        let canaleyoutube = client.channels.cache.get(config.idcanali.iscritti)
        canaleyoutube.setName(`🎬│Subscribers: ${response?.subscriberCount}`)
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
                    client.channels.cache.get(`813375357428170792`).send(`**${response.items[0].author}** Ha pubblicato un nuovo video: **${response.items[0].title}**!! Che aspetti? Corri a vederlo!!\nhttps://www.youtube.com/watch?v=${idVideo}`)
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
    //Bot Other Log
    if(date.getHours() == 22 && date.getMinutes() == 0) {
        let uptime = ms(client.uptime, { long: true })
        let ping = client.ws.ping
        let ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        let channel = client.channels.cache.get(config.idcanali.generaltxt)
        channel.messages.fetch({ limit: 1 }).then(messages => {
            let generalmessage = messages.first()
            let embed = new Discord.MessageEmbed()
            .setTitle(`🟢IL BOT È FUNZIONANTE!`)
            .addField(`⌚Il mio uptime attuale è:`, uptime.toString(), true)
            .addField(`💾La mia ram usata attualmente è:`, `${ram.toString()}MB`, true)
            .addField(`🐢Il mio ping attuale è:`, `${ping.toString()}ms`, true)
            .addField(`💭L'ultimo messaggio mandato in general è:`, generalmessage.content, true)
            .addField(`🖊️Scritto da:`, generalmessage.author.toString(), true)
            .addField(`🔗Link al messaggio:`, `[Message link](https://discord.com/channels/${generalmessage.guild.id}/${generalmessage.channel.id}/${generalmessage.id})`, true)
            .setColor(`YELLOW`)
            .setThumbnail(client.guilds.cache.get(config.idServer.idServer).iconURL({dynamic: true}))
        client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embed]})
        })
    }
}, 1000 * 60)

//! Code errors
process.on(`uncaughtException`, async err => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`⚠️ERRORE⚠️`)
        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
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
        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
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