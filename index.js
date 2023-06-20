require(`events`).EventEmitter.prototype._maxListeners = 100
global.Discord = require(`discord.js`)
global.client = new Discord.Client({ intents: 32767, partials: [`MESSAGE`, `CHANNEL`, `REACTION`], allowedMentions: { parse: [] } })

global.client2 = new Discord.Client({ intents: 32767 });

try {
    require(`dotenv`).config()
} catch {

}

client2.login(process.env.token2);

client.login(process.env.token).then(() => {
    require(`./handler`)
})