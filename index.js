require(`events`).EventEmitter.prototype._maxListeners = 100 
global.Discord = require(`discord.js`)
global.ms = require(`ms`)
global.moment = require(`moment`)
global.Canvas = require(`canvas`)
global.ytch = require(`yt-channel-info`)
global.lyricsFinder = require(`lyrics-finder`)
global.discordTranscripts = require(`discord-html-transcripts`)
global.discordModals = require(`discord-modals`)
global.client = new Discord.Client({intents: 32767, allowedMentions: { parse: [] }})
discordModals(client)
let fs = require(`fs`) 
global.config = require(`./JSON/config.json`)
global.parolacce = require(`./JSON/badwords.json`)
global.bestemmie = require(`./JSON/bestemmie.json`)
global.checkspam = new Map()
global.delete = true
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
    let prefix = `!` 

    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild || message.content.startsWith(`${prefix}${prefix}`) || message.content == prefix || message.guild != config.idServer.idServer || message.channel == config.idcanali.thingstodo) return

    let args = message.content.slice(prefix.length).trim().split(/ +/) 
    let command = args.shift().toLowerCase() 
    
    if(command == `play` || command == `p` || command == `pause` || command == `resume` || command == `leave` || command == `stop` || command == `skip` || command == `next` || command == `autoplayoff` || command == `autoplayon` || command == `repeat` || command == `queue`) return
    
    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Il comando \`!${command}\` non esiste`)
            .setTitle(`Comando non esistente`)
        message.reply({embeds: [embed]})
        return
    }

    let comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if(comando.onlyHelpers && !message.member.roles.cache.has(config.idruoli.owner) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.moderator) && !message.member.roles.cache.has(config.idruoli.helper)) {
        let embed = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setDescription(`Devi essere almeno **Helper** per eseguire il comando \`!${command}\``)
            .setTitle(`Non hai il permesso!`)
        message.reply({embeds: [embed]})
        return
    }

    if(comando.onlyMods && !message.member.roles.cache.has(config.idruoli.owner) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.moderator)) {
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
    //Bot Other Log
    if(date.getHours() == 11 && date.getMinutes() == 0 || date.getHours() == 23 && date.getMinutes() == 0) {
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

setInterval(() => {
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()
    if (hour == 16 && minutes == 0) {
        let channel = client.channels.cache.get(config.idcanali.becamestaff)
        let server = client.guilds.cache.get(config.idServer.idServer)
        channel.permissionOverwrites.set([
            {
                id: server.id,
                allow: [`VIEW_CHANNEL`],
                deny: [`SEND_MESSAGES`]
            }
        ])
        let button = new Discord.MessageButton()
            .setStyle(`SUCCESS`)
            .setLabel(`Candidati`)
            .setCustomId(`Candidati`)
        let row = new Discord.MessageActionRow()
            .addComponents(button)
        channel.send(`__**🔨Diventa Uno Staffer🔨**__\nSei **competente in moderazione** e ti va di **aiutare gli altri**?\nBene, allora candidati come <@&741616767079809024>!`)
        channel.send(config.images.becamestaffer)
        channel.send(`__**❓Quali ruoli è possibile essere❓**__\n\n<@&624628040546385930>\n<@&621002745024872461>\n<@&945393889672589312>`)
        channel.send(`__**🤷‍♂️ Cosa si ottiene diventando staffer?🤷‍♀️**__\n\nDiventando un <@&624628040546385930> potrai:\n-Usare !clear\n-Attivare e disattivare il sistema di lockdown\n-Mutare e smutare gli utenti\n-Cambiare il nick di tutti gli utenti normali\n-Mettere e togliere il timeout a tutti gli utenti\n-Accedere ai logs\n-Accedere ai ticket normali\n\nDiventando un <@&621002745024872461> potrai:\n-Bannare e sbannare gli utenti\n-Usare !clear\n-Kickare gli utenti\n-Attivare e disattivare il sistema di lockdown\n-Mutare e smutare gli utenti\n-Cambiare il nick di tutti gli utenti normali\n-Usare !say per annunciare cose\n-Cambiare lo slowmode ai canali\n-Mettere e togliere il timeout a tutti gli utenti\n-Accedere ai logs\n-Accedere ai ticket normali\n-Accedere ai ticket di contestazione del mute\n\nDiventando un <@&945393889672589312> avrai i permessi da **amministratore**, di conseguenza potrai fare **tutto**`)
        channel.send(`__*⚠️Dopo essersi candidati, la candidatura verrà inviata allo staff che deciderà se accettarla o meno.⚠️*__`)
        channel.send(`__**In base a cosa si viene accettati o no?**__\nI requisiti necessari per poter essere accettati sono:\n-Essere nel server da almeno due settimane\n-Essere attivi nel server\n-Rispondere correttamente alle domande della candidatura`)
        channel.send({content: `__**Cos'altro stai aspettando? Candidati!**__`, components: [row]})
        let wc = new Discord.WebhookClient({
            id: "948175921842618419", 
            token: process.env.announcetoken
        })
        let attachment = new Discord.MessageAttachment(`./Canvas/Became Staff.gif`)
        wc.send({content: `:mega:**ANNUNCIO CANDIDATURA STAFF**:hammer:\n\n:genie:Desideri tantissimo diventare un **Moderatore** o un **Helper** di questo server? Bene, da oggi le candidature:clipboard: sono finalmente **aperte**!!\n\n:question:**__Come fare a candidarsi?__**\nBasta recarsi nella chat <#947915938043428885> e completare la **candidatura**!\n\nQui sotto c'è una gif :camera: su come fare :wink:\n\n:grey_exclamation:__**Che aspetti? Candidati!**__`, files: [attachment]})
    }
}, 1000 * 60)