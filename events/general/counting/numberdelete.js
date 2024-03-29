const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageDelete`,
    execute(message) {
        if (message.channel != config.channelsid.counting) return
        if (message.author?.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.id == serverstats.counting.messageid) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Eliminato`)
                .setDescription(`${message.author.toString()} ha eliminato il numero ${serverstats.counting.currentnumber} 🤦‍♂️`)
                .setColor(`YELLOW`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(serverstats.counting.currentnumber.toString()).then(msg => {
                msg.react(`✅`)
            })
        }
    }
}