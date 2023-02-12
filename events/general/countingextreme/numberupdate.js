const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageUpdate`,
    execute(oldMessage, newMessage) {
        if (newMessage.author?.bot) return
        if (newMessage.channel != config.channelsid.countingextreme) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(newMessage.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(newMessage.author.id)) return

        if (newMessage.id == serverstats.countingextreme.messageid) {
            newMessage.reactions.removeAll()

            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    countingextreme: {
                        currentnumber: serverstats.countingextreme.currentnumber,
                        operation: serverstats.countingextreme.operation,
                        operationnumber: serverstats.countingextreme.operationnumber,
                        lastuser: serverstats.countingextreme.lastuser,
                        messageid: null
                    }
                }
            })

            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Modificato`)
                .setDescription(`${newMessage.author.toString()} ha modificato il numero ${serverstats.countingextreme.currentnumber} 🤦‍♂️`)
                .setColor(`YELLOW`)
            newMessage.channel.send({ embeds: [embed] })
            newMessage.channel.send(serverstats.countingextreme.currentnumber.toString()).then(msg => {
                msg.react(`✅`)
            })
        }

    }
}