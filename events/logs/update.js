module.exports = {
    name: `messageUpdate`,
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot || oldMessage.guild != config.idServer.idServer) return
        const channel = client.channels.cache.get(config.idcanali.logs)
        let user = oldMessage.author
        let embed = new Discord.MessageEmbed()
            .addField(`Vecchio messaggio:`, oldMessage.content ? (oldMessage.content.length > 500 ? `${oldMessage.content.slice(0, 497)}...` : oldMessage.content) : "_Nessun Contenuto_")
            .addField(`Nuovo messaggio:`, newMessage.content ? (newMessage.content.length > 500 ? `${newMessage.content.slice(0, 497)}...` : newMessage.content) : "_Nessun Contenuto_")
            .setAuthor({name: user.tag.toString(), iconURL: oldMessage.member.displayAvatarURL({dynamic: true})})
            .setFooter({text: `User ID: ${oldMessage.author.id}`})
            .setDescription(`Messaggio modificato in ${oldMessage.channel}`)
            .setTimestamp()
            .setColor("YELLOW")
        channel.send({embeds: [embed]})
    }
}