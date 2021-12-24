global.Discord = require(`discord.js`);
global.ms = require(`ms`)
global.moment = require(`moment`)
global.Canvas = require(`canvas`)
global.ytch = require(`yt-channel-info`)
//global.giveMeAJoke = require('discord-jokes');
global.client = new Discord.Client({intents: 32767, allowedMentions: { parse: [] }});
const fs = require(`fs`);
global.config = require(`./config.json`)
client.login(config.token);
//No Permission Embed
global.noperm = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(`Errore`) 
    .setDescription(`:x: Non hai il permesso`)
    .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
//No Channel Embed
global.nochannel = new Discord.MessageEmbed()
    .setTitle(`ERRORE`)
    .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
    .setColor(`RED`)
    .setDescription(`:x: Non sei connesso in un canale vocale`)
//No Private Room Embed
global.nopvt = new Discord.MessageEmbed()
    .setTitle(`ERRORE`)
    .setColor(`RED`)
    .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
    .setDescription(`:x: Non sei in una stanza privata!`)
//!Command Handler
client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args))
}

client.on("messageCreate", message => {
    const prefix = "!";

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))
    comando.execute(message, args);
})

/*client.on("messageCreate", message => {
    if(message.content == "!emoji") {
        message.guild.emojis.create("https://i.imgur.com/sWz8R2c.png", "RogiSnowball", { roles: ["921323310904651797"] })
        .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
        .catch(console.error);
        message.channel.send("Ciao")
    }
})*/

//? Christmas Countdown + Members and Subscribers Counter + Lockdown Automatico
setInterval(function () {
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    //Member Counter
    var server = client.guilds.cache.get(config.idServer.idServer);
    var botCount = server.members.cache.filter(member => member.user.bot).size;
    var utentiCount = server.memberCount - botCount;
    var canalemembri = client.channels.cache.get(config.idcanali.membri)
    canalemembri.setName(`👾│Members: ${utentiCount}`)
    //Youtube Counter
    ytch.getChannelInfo("UCw7lKb-XBW4ApE0puSbJLFQ").then((response) => {
        var canaleyoutube = client.channels.cache.get(config.idcanali.iscritti)
        canaleyoutube.setName(`🎬│Subscribers: ${response.subscriberCount}`)
    })
    //Natale Countdown
    const currenttime = new Date()
    const Christmas = new Date("December 25 2021 00:00:00")
    const diff = Christmas - currenttime
    const days = Math.floor(diff / 1000 / 60 / 60 / 24)
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24 + 1
    const seconds = Math.floor(diff / 1000) % 60
    const minutes = Math.floor(diff / 1000 / 60) % 60
    const canale = client.channels.cache.get(config.idcanali.natale)
    console.log(days, hours, seconds, currenttime)
    if(days > 0 && days != 0) {
        canale.setName(`🎅│-${days} giorni a Natale!`)
    } else if(hours > 0 && days < 0 || days == 0) {
        canale.setName(`🎅│-${hours} ore e ${minutes} minuti`)
    } else if(hours < 0 && minutes < 0) {
        canale.setName(`🎅│BUON NATALE`)
    }
}, 1000 * 60)