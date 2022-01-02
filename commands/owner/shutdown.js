module.exports = {
    name: `shutdown`,
    description: `Spegne il bot`,
    onlyOwner: true,
    execute(message) {
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