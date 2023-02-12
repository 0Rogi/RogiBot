const config = require(`${process.cwd()}/JSON/config.json`)
const Parser = require(`expr-eval`).Parser

module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (message.author.bot) return
        if (message.channel != config.channelsid.countingextreme) return

        if (message.content.includes(`\"`) || message.content.includes(`\'`) || message.content.startsWith(`!`) || message.content == `cos` || message.content == `E` || message.content.startsWith(`\\`)) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        let number

        try {
            number = Parser.evaluate(message.content.replace(/\\/g, ``))
        } catch (err) {
            return
        }

        let nextnumber

        try {
            nextnumber = Parser.evaluate(serverstats.countingextreme.currentnumber + serverstats.countingextreme.operation + serverstats.countingextreme.operationnumber)
        } catch (err) {
            return
        }

        if (message.author.id == serverstats.countingextreme.lastuser) {
            let newnumber = Math.floor(Math.random() * (100 - -100 + 1)) + -100

            let operation = [`+`, `-`, `*`, `/`]
            let randomoperation = Math.floor(Math.random() * operation.length)
            let operationnumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1

            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    countingextreme: {
                        currentnumber: newnumber,
                        operation: operation[randomoperation],
                        operationnumber: operationnumber,
                        lastuser: null,
                        messageid: null
                    }
                }
            })

            switch (randomoperation) {
                case 1 - 1: randomoperation = `aggiunge`; break
                case 2 - 1: randomoperation = `toglie`; break
                case 3 - 1: randomoperation = `moltiplica per`; break
                case 4 - 1: randomoperation = `divide per`; break
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(`Utente non valido!`)
                .setDescription(`${message.author.toString()} ogni utente puo' scrivere un solo numero alla volta! 🤦‍♂️\n\nOra si inizia da **${newnumber}** e si **${randomoperation} ${operationnumber}**!`)
                .setColor(`RED`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(newnumber.toString()).then(m => { m.react(`✅`) })
            message.react(`❌`)
            return
        }

        if (number != nextnumber) {

            let newnumber = Math.floor(Math.random() * (100 - -100 + 1)) + -100

            let operation = [`+`, `-`, `*`, `/`]
            let randomoperation = Math.floor(Math.random() * operation.length)
            let operationnumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1

            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    countingextreme: {
                        currentnumber: newnumber,
                        operation: operation[randomoperation],
                        operationnumber: operationnumber,
                        lastuser: null,
                        messageid: null
                    }
                }
            })

            switch (randomoperation) {
                case 1 - 1: randomoperation = `aggiunge`; break
                case 2 - 1: randomoperation = `toglie`; break
                case 3 - 1: randomoperation = `moltiplica per`; break
                case 4 - 1: randomoperation = `divide per`; break
            }

            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Sbagliato!`)
                .setDescription(`${message.author.toString()} hai scritto ${number} ma il numero corretto era ${nextnumber}! 😫 \n\nOra si inizia da **${newnumber}** e si **${randomoperation} ${operationnumber}**!`)
                .setColor(`RED`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(newnumber.toString()).then(m => { m.react(`✅`) })
            message.react(`❌`)
            return
        }

        if (number == nextnumber) {
            message.react(`✅`)
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    countingextreme: {
                        currentnumber: number,
                        operation: serverstats.countingextreme.operation,
                        operationnumber: serverstats.countingextreme.operationnumber,
                        lastuser: message.author.id,
                        messageid: message.id
                    }
                }
            })
        }

    }
}