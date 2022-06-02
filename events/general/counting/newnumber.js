const config = require(`${process.cwd()}/JSON/config.json`)
const Parser = require(`expr-eval`).Parser

module.exports = {
    name: `messageCreate`,
    async execute(message) {
        if (message.author.bot) return
        if (message.channel != config.idcanali.counting) return
        try {
            var number = Parser.evaluate(message.content.replace(/\\/g, ``))
        } catch (err) {
            if (message.content != `stack` && serverstats.counting.currentnumber + 1 != 64) return
        }
        if (message.content == `stack` && serverstats.counting.currentnumber + 1 == 64) number = 64
        if (!number) return
        if (serverstats.counting.lastuser == message.author.id) {
            await database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    counting: {
                        currentnumber: 0,
                        lastuser: null,
                        bestnumber: serverstats.counting.bestnumber
                    }
                }
            })
            message.react(`❌`)
            let embed = new Discord.MessageEmbed()
                .setTitle(`Utente non valido!`)
                .setDescription(`${message.author.toString()} Ogni utente puo' mandare solo un messaggio per volta! 🤦‍♂️`)
                .setColor(`RED`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(`0`).then(msg => {
                msg.react(`✅`)
            })
            return
        }
        if (number != serverstats.counting.currentnumber + 1) {
            await database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    counting: {
                        currentnumber: 0,
                        lastuser: null,
                        bestnumber: serverstats.counting.bestnumber
                    }
                }
            })
            message.react(`❌`)
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero sbagliato!`)
                .setDescription(`${message.author.toString()} Il numero corretto era **${serverstats.counting.currentnumber + 1}** 😫`)
                .setColor(`RED`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(`0`).then(msg => {
                msg.react(`✅`)
            })
            return
        }
        let oldbestnumber = serverstats.counting.bestnumber
        await database.collection(`ServerStats`).updateOne({}, {
            $set: {
                counting: {
                    currentnumber: number,
                    lastuser: message.author.id,
                    bestnumber: serverstats.counting.bestnumber > number ? serverstats.counting.bestnumber : number
                }
            }
        })
        if (number == 69) return message.react(`😏`)
        if (number == 100) return message.react(`💯`)
        if (oldbestnumber < number) return message.react(`☑️`)
        message.react(`✅`)
    }
}