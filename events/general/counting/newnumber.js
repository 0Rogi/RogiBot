const config = require(`${process.cwd()}/JSON/config.json`)
const Parser = require(`expr-eval`).Parser

module.exports = {
    name: `messageCreate`,
    async execute(message) {
        if (message.author.bot) return
        if (message.channel != config.idcanali.counting) return

        if (message.content.includes(`\"`) || message.content.includes(`\'`) || message.content.startsWith(`!`) || message.content == `cos` || message.content == `E` || message.content.startsWith(`\\`)) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        try {
            var number = Parser.evaluate(message.content.replace(/\\/g, ``))
        } catch (err) {
            if (message.content == `stack` && serverstats.counting.currentnumber + 1 == 64) number = 64
            else return
        }
        if (serverstats.counting.lastuser == message.author.id) {
            await database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    counting: {
                        currentnumber: 0,
                        lastuser: null,
                        bestnumber: serverstats.counting.bestnumber,
                        messageid: null
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
                        bestnumber: serverstats.counting.bestnumber,
                        messageid: null
                    }
                }
            })
            message.react(`❌`)
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero sbagliato!`)
                .setDescription(`${message.author.toString()} hai scritto ${number}, ma numero corretto era **${serverstats.counting.currentnumber + 1}** 😫`)
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
                    bestnumber: serverstats.counting.bestnumber > number ? serverstats.counting.bestnumber : number,
                    messageid: message.id
                }
            }
        })
        if (new Date().getDate() == 28 && new Date().getHours() >= 10) {
            let spawned = [false, false, true, false];
            spawned = spawned[Math.floor(Math.random() * spawned.length)];
            if (spawned) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Pipistrello Spawnato`)
                    .setDescription(`È **spawnato** un **pipistrello**!\n\nPremi il pulsante prima degli altri per ucciderlo!`)
                    .setColor(`YELLOW`)
                    .setImage(`https://i.imgur.com/r4XWz5t.png`)
                    .setFooter({ text: `Pipistrello Ancora Non Ucciso` });
                let button = new Discord.MessageButton()
                    .setLabel(`Uccidi Pipistrello`)
                    .setStyle(`SUCCESS`)
                    .setCustomId(`HalloweenPipistrelloKill`);
                let row = new Discord.MessageActionRow()
                    .addComponents(button)
                message.channel.send({ embeds: [embed], components: [row] });
            }
        }
        if (number == 69) return message.react(`😏`)
        if (number == 100) return message.react(`💯`)
        if (oldbestnumber < number) return message.react(`☑️`)
        message.react(`✅`)
    }
}
