module.exports = {
    name: `guildMemberAdd`,
    execute(member) {
        if(member.guild != config.idServer.idServer) return
        let channel = client.channels.cache.get(config.idcanali.logs.joinleave)
        let embed = new Discord.MessageEmbed()
            .setTitle(`📥Nuovo membro!📥`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
            .addField(`👁️Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .setThumbnail(member.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .setColor(`GREEN`)
        channel.send({embeds: [embed]})
    }
}