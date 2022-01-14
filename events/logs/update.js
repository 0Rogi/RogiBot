module.exports = {
    name: `messageUpdate`,
    execute(oldMessage, newMessage) {
        const channel = client.channels.cache.get(config.idcanali.logs)
        let user = oldMessage.author
        let embed = new Discord.MessageEmbed()
            .addField(`Vecchio messaggio:`, oldMessage.toString())
            .addField(`Nuovo messaggio:`, newMessage.toString())
            .setAuthor({name: user.tag.toString(), iconURL: oldMessage.member.displayAvatarURL({dynamic: true})})
            .setFooter({text: `User ID: ${oldMessage.author.id}`})
            .setDescription(`Messaggio modificato in ${oldMessage.channel}`)
            .setTimestamp()
            .setColor("YELLOW")
        channel.send({embeds: [embed]})
    }
}