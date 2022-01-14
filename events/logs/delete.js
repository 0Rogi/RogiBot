module.exports = {
    name: `messageDelete`,
    execute(message) {
        const channel = client.channels.cache.get(config.idcanali.logs)
        let user = message.author
        let embed = new Discord.MessageEmbed()
            .addField(`Messaggio eliminato:`, message.toString())
            .setAuthor({name: user.tag.toString(), iconURL: message.member.displayAvatarURL({dynamic: true})})
            .setFooter({text: `User ID: ${message.author.id}`})
            .setDescription(`Messaggio eliminato in ${message.channel}`)
            .setTimestamp()
            .setColor("RED")
        channel.send({embeds: [embed]})
    }
}