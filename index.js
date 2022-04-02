require(`events`).EventEmitter.prototype._maxListeners = 100 
global.Discord = require(`discord.js`)
global.ms = require(`ms`)
global.moment = require(`moment`)
global.client = new Discord.Client({intents: 32767, partials: [`MESSAGE`, `CHANNEL`, `REACTION`], allowedMentions: { parse: [] }})
let fs = require(`fs`)
global.config = require(`./JSON/config.json`)
global.parolacce = require(`./JSON/badwords.json`)
global.bestemmie = require(`./JSON/bestemmie.json`)
try {
    require(`dotenv`).config()
} catch {

}

client.login(process.env.token)

//! Commands Handler
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

//! Events Handler
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

//! Functions Handler
const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));
for (const file of functionFiles) {
    require(`./functions/${file}`);
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