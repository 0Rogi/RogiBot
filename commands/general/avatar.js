module.exports = {
    name: `avatar`,
    description: `Avatar di qualcuno`,
    execute(message) {
        var user = message.mentions.members.first()
        if(!user) user = message.member
        const avatar = user.displayAvatarURL()
        const embed = new Discord.MessageEmbed()
            .setTitle(`Avatar di ${user.user.username}`)
            .setImage(avatar)
            .setColor(`YELLOW`)
        message.reply({embeds: [embed]})
    }
}