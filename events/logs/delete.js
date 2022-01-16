module.exports = {
    name: `messageDelete`,
    execute(message) {
        const channel = client.channels.cache.get(config.idcanali.logs)
        let user = message.author
        if(message.attachment) return
        let embed = new Discord.MessageEmbed()
            .addField("Contenuto:", message.content ? (message.content.length > 500 ? `${message.content.slice(0, 497)}...` : message.content) : "_Nessun Contenuto_")
            .setAuthor({name: user.tag.toString(), iconURL: message.member.displayAvatarURL({dynamic: true})})
            .setFooter({text: `User ID: ${message.author.id}`})
            .setDescription(`Messaggio eliminato in ${message.channel}`)
            .setTimestamp()
            .setColor("RED")
        channel.send({embeds: [embed]})
    }
}