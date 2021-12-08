module.exports = {
    name: `restart`,
    description: `Restarta il bot`,
    execute(message) {
        if(message.author != `601308178482855956`) return message.reply({embeds: [noperm]})
        var embed = new Discord.MessageEmbed()
            .setTitle(`RESTART`)
            .setColor(`RED`)
            .setDescription(`🔴Mi sto restartando!`)
        message.reply({embeds: [embed]}).then(msg => {
            client.destroy()
            client.login(config.token2)
            console.clear()
            console.log(`Restarting del Bot...`)
            console.log(`Bot online!`)
            embed.setDescription(`🟢Bot restartato con successo!`)
            embed.setColor(`YELLOW`)
            msg.reply({embeds: [embed]})
        })
    }
}