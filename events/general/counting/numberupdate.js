const config = require(`${process.cwd()}/JSON/config.json`)
const Parser = require(`expr-eval`).Parser

module.exports = {
    name: `messageUpdate`,
    execute(oldMessage, newMessage) {
        if (newMessage.channel != config.idcanali.counting) return
        if (newMessage.author?.bot) return
        if (!oldMessage || !newMessage) return

        try {
            var oldnumber = Parser.evaluate(oldMessage.content);
        }
        catch { return }

        try {
            var newnumber = Parser.evaluate(newMessage.content);
        }
        catch { return }

        if (oldnumber != newnumber && oldnumber == serverstats.counting.currentnumber) {
            newMessage.reactions.removeAll()
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