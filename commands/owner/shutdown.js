module.exports = {
    name: `shutdown`,
    onlyOwner: true,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`RESTART`)
            .setColor(`RED`)
            .setDescription(`🔴Bot offline`)
        message.reply({embeds: [embed]}).then(msg => {
            console.clear()
            console.log(`Spegnimento del Bot...`)
            setTimeout(() => {
                console.log(`Bot spento!`)
                process.exit(1)
            }, 1000);
        })
    }
}