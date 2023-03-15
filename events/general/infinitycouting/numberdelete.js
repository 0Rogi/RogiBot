const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageUpdate`,
    async execute(oldMessage, newMessage) {
        if (newMessage.channel != config.channelsid.countinginfinity) return
        if (newMessage.author?.bot) return
        if (!oldMessage || !newMessage) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(newMessage.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(newMessage.author.id)) return

        if (newMessage.id == serverstats.countinginfinity.messageid) {
            newMessage.reactions.removeAll()

            await database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    countinginfinity: {
                        currentnumber: serverstats.countinginfinity.currentnumber,
                        lastuser: serverstats.countinginfinity.lastuser,
                        messageid: null
                    }
                }
            })

            let sentences = [` si sente simpatico a modificare i numeri 🤡`, `? Perchè modifichi i numeri? 🤨`, ` ma cosa modifichi i numeri..? 🤦‍♂️`, ` a quanto pare non hai di meglio da fare se sei qui a modificare i numeri 😌`, ` il bro modifica i numeri 🗿`, ` AHAHAHAHAHHAHAHAHAHHAHAH, proprio divertente lo scherzo di modificare i numeri 😂😂😂🤣🤣🤣`];
            let random = Math.floor(Math.random() * sentences.length);
            newMessage.channel.send(`${newMessage.author.toString()}${sentences[random]}`);
            newMessage.channel.send(serverstats.countinginfinity.currentnumber.toString()).then(msg => {
                msg.react(`✅`);
            })
        }
    }
}