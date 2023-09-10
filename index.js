require(`events`).EventEmitter.prototype._maxListeners = 100
global.Discord = require(`discord.js`);
global.client = new Discord.Client({ intents: 32767, partials: [`MESSAGE`, `CHANNEL`, `REACTION`], allowedMentions: { parse: [] } });

try {
    require(`dotenv`).config();
} catch {

}

process.env.TZ = `Europe/Rome`;

client.login(process.env.token).then(() => {
    require(`./handler`);
})