const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageDelete`,
    execute(message) {
        if (message.channel != config.idcanali.counting) return
        if (message.author?.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.content == serverstats.counting.currentnumber) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Eliminato`)
                .setDescription(`${newMessage.author.toString()} ha eliminato il numero ${serverstats.counting.currentnumber} 🤦‍♂️`)
                .setColor(`YELLOW`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(serverstats.counting.currentnumber.toString()).then(msg => {
                msg.react(`✅`)
            })
        }
    }
}