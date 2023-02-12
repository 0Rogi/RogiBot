const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageUpdate`,
    async execute(oldMessage, newMessage) {
        if (newMessage.channel != config.channelsid.counting) return
        if (newMessage.author?.bot) return
        if (!oldMessage || !newMessage) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(newMessage.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(newMessage.author.id)) return

        if (newMessage.id == serverstats.counting.messageid) {
            newMessage.reactions.removeAll()

            await database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    counting: {
                        currentnumber: serverstats.counting.currentnumber,
                        lastuser: serverstats.counting.lastuser,
                        bestnumber: serverstats.counting.bestnumber,
                        messageid: null
                    }
                }
            })

            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Modificato`)
                .setDescription(`${newMessage.author.toString()} ha modificato il numero ${serverstats.counting.currentnumber} 🤦‍♂️`)
                .setColor(`YELLOW`)
            newMessage.channel.send({ embeds: [embed] })
            newMessage.channel.send(serverstats.counting.currentnumber.toString()).then(msg => {
                msg.react(`✅`)
            })
        }
    }
}