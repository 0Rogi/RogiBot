module.exports = {
    name: `restart`,
    description: `Restarta il bot`,
    onlyOwner: true,
    execute(message) {
        var embed = new Discord.MessageEmbed()
            .setTitle(`RESTART`)
            .setColor(`RED`)
            .setDescription(`🔴Mi sto restartando!`)
        message.reply({embeds: [embed]}).then(msg => {
            client.destroy()
            client.login(config.token)
            console.clear()
            console.log(`Restarting del Bot...`)
            console.log(`Bot online!`)
            embed.setDescription(`🟢Bot restartato con successo!`)
            embed.setColor(`YELLOW`)
            msg.reply({embeds: [embed]})
        })
    }
}