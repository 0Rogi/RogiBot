const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageDelete`,
    execute(message) {
        if (message.channel != config.channelsid.countinginfinity) return
        if (message.author?.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.id == serverstats.countinginfinity.messageid) {
            let sentences = [` si sente simpatico ad eliminare i numeri 🤡`, `? Perchè elimini i numeri? 🤨`, ` ma cosa elimini i numeri..? 🤦‍♂️`, ` a quanto pare non hai di meglio da fare se sei qui ad eliminare i numeri 😌`, ` il bro elimina i numeri 🗿`, ` AHAHAHAHAHHAHAHAHAHHAHAH, proprio divertente lo scherzo di eliminare i numeri 😂😂😂🤣🤣🤣`];
            let random = Math.floor(Math.random() * sentences.length);
            message.channel.send(`${message.author.toString()}${sentences[random]}`);
            message.channel.send(serverstats.countinginfinity.currentnumber.toString()).then(msg => {
                msg.react(`✅`);
            })
        }
    }
}