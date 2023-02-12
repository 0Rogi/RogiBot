const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageDelete`,
    execute(message) {
        if (message.author?.bot) return
        if (message.channel != config.channelsid.countingextreme) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.id == serverstats.countingextreme.messageid) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Eliminato`)
                .setDescription(`${message.author.toString()} ha eliminato il numero ${serverstats.countingextreme.currentnumber} 🤦‍♂️`)
                .setColor(`YELLOW`)
            message.channel.send({ embeds: [embed] })
            message.channel.send(serverstats.countingextreme.currentnumber.toString()).then(msg => {
                msg.react(`✅`)
            })
        }
    }
}