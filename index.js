global.Discord = require(`discord.js`);
global.ms = require(`ms`)
global.moment = require(`moment`)
global.Canvas = require(`canvas`)
global.ytch = require(`yt-channel-info`);
global.client = new Discord.Client({intents: 32767, allowedMentions: { parse: [] }});
const fs = require(`fs`);
global.config = require(`./JSON/config.json`)
global.ephiphany = require(`./JSON/ephiphany.json`)
global.lyricsFinder = require('lyrics-finder')
global.checkspam = new Map()
client.login(config.token);
//No Channel Embed
global.nochannel = new Discord.MessageEmbed()
    .setTitle(`Errore`)
    .setColor(`RED`)
    .setDescription(`:x: Non sei connesso in un canale vocale`)
//No Private Room Embed
global.nopvt = new Discord.MessageEmbed()
    .setTitle(`Errore`)
    .setColor(`RED`)
    .setDescription(`:x: Non sei in una stanza privata!`)
//!Commands Handler
client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync(`./commands`);
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(`.js`));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//!Event Handler
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (const file of eventsFiles) {
        if (file.endsWith(".js")) {
            const event = require(`./events/${folder}/${file}`);
            client.on(event.name, (...args) => event.execute(...args));
        }
        else {
            const eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (const file2 of eventsFiles2) {
                const event = require(`./events/${folder}/${file}/${file2}`);
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

//!Commands Check
client.on(`messageCreate`, message => {
    const prefix = `!`;

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

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

    comando.execute(message, args);
})

//? Christmas Countdown + Members and Subscribers Counter + Youtube Notifier
setInterval(function () {
    //Member Counter
    var server = client.guilds.cache.get(config.idServer.idServer);
    var botCount = server.members.cache.filter(member => member.user.bot).size;
    var utentiCount = server.memberCount - botCount;
    var canalemembri = client.channels.cache.get(config.idcanali.membri)
    canalemembri.setName(`👾│Members: ${utentiCount}`)
    //Youtube Counter
    ytch.getChannelInfo(`UCw7lKb-XBW4ApE0puSbJLFQ`).then((response) => {
        var canaleyoutube = client.channels.cache.get(config.idcanali.iscritti)
        canaleyoutube.setName(`🎬│Subscribers: ${response.subscriberCount}`)
    })
    //Youtube Notifier
    ytch.getChannelVideos(`UCw7lKb-XBW4ApE0puSbJLFQ`, `newest`).then(async response => {
        var idVideo = response.items[0]?.videoId
        if (!idVideo) return

        client.channels.cache.get(`813375357428170792`).messages.fetch()
            .then(messages => {
                var giaMandato = false;
                messages.forEach(msg => {
                    if (msg.content.includes(idVideo)) giaMandato = true;
                });

                if (!giaMandato) {
                    client.channels.cache.get(`813375357428170792`).send(`**${response.items[0].author}** Ha pubblicato un nuovo video: **${response.items[0].title}**!! Che aspetti? Corri a vederlo!!\nhttps://www.youtu.be/${idVideo}`)
                }
            })
    })
}, 1000 * 60)

//!Code error
process.on(`uncaughtException`, err => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`⚠️Errore di codice⚠️`)
        .setDescription(err.toString())
        .setColor(`RED`)
    client.channels.cache.get(config.idcanali.codeerror).send({embeds: [embed]})
})
process.on(`unhandledRejection`, err => {
    let embed = new Discord.MessageEmbed()
        .setTitle(`⚠️Errore di codice⚠️`)
        .setDescription(err.toString())
        .setColor(`RED`)
    client.channels.cache.get(config.idcanali.codeerror).send({embeds: [embed]})
})