module.exports = {
    name: `guildMemberAdd`,
    execute(member) {
        if(message.guild != config.idServer.idServer) return
        const channel = client.channels.cache.get(config.idcanali.logs)
        let embed = new Discord.MessageEmbed()
            .setTitle("Nuovo membro!")
            .setAuthor({name: member.user.tag.toString(), iconURL: member.user.displayAvatarURL({dynamic: true})})
            .setFooter({text: `User ID: ${member.id}`})
            .setTimestamp()
            .addField("Account creato il:", `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .setColor("GREEN")
        channel.send({embeds: [embed]})
    }
}