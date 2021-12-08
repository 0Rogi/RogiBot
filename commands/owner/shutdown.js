module.exports = {
    name: `shutdown`,
    description: `Spegne il bot`,
    execute(message) {
        if(message.author != `601308178482855956`) return message.reply({embeds: [noperm]})
        var embed = new Discord.MessageEmbed()
            .setTitle(`RESTART`)
            .setColor(`RED`)
            .setDescription(`🔴Bot offline`)
        message.reply({embeds: [embed]}).then(msg => {
            console.clear()
            console.log(`Spegnimento del Bot...`)
            console.log(`Bot spento!`)
            client.destroy()
        })
    }
}