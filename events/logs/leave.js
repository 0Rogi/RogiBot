module.exports = {
    name: `guildMemberRemove`,
    execute(member) {
        if(member.guild != config.idServer.idServer) return
        const channel = client.channels.cache.get(config.idcanali.logs)
        let embed = new Discord.MessageEmbed()
            .setTitle("Utente in meno")
            .setAuthor({name: member.user.tag.toString(), iconURL: member.user.displayAvatarURL({dynamic: true})})
            .setFooter({text: `User ID: ${member.id}`})
            .setTimestamp()
            .addField("Account creato il:", `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .addField("Entrato il:", member.joinedAt.toDateString())
            .setColor("RED")
        channel.send({embeds: [embed]})
    }
}