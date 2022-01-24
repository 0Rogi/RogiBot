module.exports = {
    name: `guildMemberRemove`,
    execute(member) {
        if(member.guild != config.idServer.idServer) return
        let channel = client.channels.cache.get(config.idcanali.logs.joinleave)
        let embed = new Discord.MessageEmbed()
            .setTitle(`📤Membro in meno📤`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
            .addField(`👁️Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
            .addField(`📥Entrato il:`, `${moment(member.user.joinAt).format(`ddd DD MMM YYYY`)}`)
            .setThumbnail(member.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .setColor(`RED`)
        channel.send({embeds: [embed]})
    }
}