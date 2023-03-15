const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return;

        if (message.guild != config.idServer.idServer) return;
        if (message.author.bot) return;

        if (message.channel == config.channelsid.thingstodo) return;

        let mention = false;
        if (message.mentions) {
            message.mentions.users.forEach(m => {
                if (m.id == client.user.id) {
                    mention = true;
                }
            })
        }

        if (mention) {
            let replies = [`👀`, `Cosa vuoi da me?`, `Salve`, `mhh`, `Immagina pingarmi`, `E se pingassi io te a caso..? 😏`];
            let random = Math.floor(Math.random() * replies.length);

            if (random == 5) {
                setTimeout(() => {
                    message.channel.send({ content: message.author.toString(), allowedMentions: { users: [message.author.id], roles: [] } });
                    message.channel.send({ content: message.author.toString(), allowedMentions: { users: [message.author.id], roles: [] } });
                    message.channel.send({ content: message.author.toString(), allowedMentions: { users: [message.author.id], roles: [] } });
                }, 1000 * 5);
            }

            message.reply(replies[random]);
        }
    }
}