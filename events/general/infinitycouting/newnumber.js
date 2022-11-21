const config = require(`${process.cwd()}/JSON/config.json`);
const Parser = require(`expr-eval`).Parser;

module.exports = {
    name: `messageCreate`,
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel != config.idcanali.countinginfinity) return;

        if (message.content.includes(`\"`) || message.content.includes(`\'`) || message.content.startsWith(`!`) || message.content == `cos` || message.content == `E` || message.content.startsWith(`\\`)) return;

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return;

        try {
            var number = Parser.evaluate(message.content.replace(/\\/g, ``))
        } catch (err) {
            return;
        }

        if (serverstats.countinginfinity.lastuser == message.author.id) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Utente non valido!`)
                .setDescription(`${message.author.toString()} Ogni utente puo' mandare **solo un messaggio** per volta! 🤦‍♂️\n\n*Continuate a contare da ${serverstats.countinginfinity.currentnumber}*`)
                .setColor(`RED`);
            message.reply({ embeds: [embed] }).then(msg => {
                message.react(`❌`);
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 1000 * 5);
            })
            return;
        }

        if (number != serverstats.countinginfinity.currentnumber + 1) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero sbagliato!`)
                .setDescription(`${message.author.toString()} hai scritto **${number}**, ma numero corretto era **${serverstats.countinginfinity.currentnumber + 1}** 😫\n\n*Continuate a contare da ${serverstats.countinginfinity.currentnumber}*`)
                .setColor(`RED`);
            message.reply({ embeds: [embed] }).then(msg => {
                message.react(`❌`);
                setTimeout(() => {
                    msg.delete();
                    message.delete();
                }, 1000 * 5);
            })
            return;
        }
        await database.collection(`ServerStats`).updateOne({}, {
            $set: {
                countinginfinity: {
                    currentnumber: number,
                    lastuser: message.author.id,
                    messageid: message.id
                }
            }
        })
        message.react(`✅`)
    }
}
