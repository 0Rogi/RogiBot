//! Handlers
const fs = require(`fs`)
const config = require(`${process.cwd()}/JSON/config.json`)

//! Commands
client.commands = new Discord.Collection() 

let commandsFiles = fs.readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith(`.js`)) 
for (let file of commandsFiles) {
    let command = require(`${process.cwd()}/commands/${file}`) 
    client.commands.set(command.name, command) 
}

let commandsFolder = fs.readdirSync(`${process.cwd()}/commands`) 
for (let folder of commandsFolder) {
    let commandsFiles = fs.readdirSync(`${process.cwd()}/commands/${folder}`).filter(file => file.endsWith(`.js`)) 
    for (let file of commandsFiles) {
        let command = require(`${process.cwd()}/commands/${folder}/${file}`) 
        client.commands.set(command.name, command) 
    }
}

//! Events
let eventsFolders = fs.readdirSync(`${process.cwd()}/events`) 
for (let folder of eventsFolders) {
    let eventsFiles = fs.readdirSync(`${process.cwd()}/events/${folder}`)

    for (let file of eventsFiles) {
        if (file.endsWith(`.js`)) {
            let event = require(`${process.cwd()}/events/${folder}/${file}`) 
            client.on(event.name, (...args) => event.execute(...args)) 
        }
        else {
            let eventsFiles2 = fs.readdirSync(`${process.cwd()}/events/${folder}/${file}`)
            for (let file2 of eventsFiles2) {
                let event = require(`${process.cwd()}/events/${folder}/${file}/${file2}`) 
                client.on(event.name, (...args) => event.execute(...args)) 
            }
        }
    }
}

//! Errors
let errorsFolder = fs.readdirSync(`${process.cwd()}/errors`) 
for (let file of errorsFolder) {
    if (file.endsWith(`.js`)) {
        let event = require(`${process.cwd()}/errors/${file}`) 
        process.on(event.name, (...args) => event.execute(...args)) 
    }
}

//! Functions 
const functionFiles = fs.readdirSync(`${process.cwd()}/functions`).filter(file => file.endsWith(`.js`));
for (const file of functionFiles) {
    require(`${process.cwd()}/functions/${file}`);
}

//! Commands Check
const parolacce = require(`${process.cwd()}/JSON/badwords.json`)

client.on(`messageCreate`, message => {
    if(!message.guild) return
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