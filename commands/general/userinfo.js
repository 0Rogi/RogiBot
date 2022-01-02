module.exports = {
    name: `userinfo`,
    description: `Info su un user`,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) || message.member 
        var embed = new Discord.MessageEmbed()
            .setTitle(user.user.username.toString())
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setColor(`YELLOW`)
            .addField(`:receipt:ID dell'user:`, `\`\`\`${user.user.id}\`\`\``, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`:link:Discriminator:`, `\`\`\`#${user.user.discriminator.toString()}\`\`\``, true)
            .addField(`:robot:È un bot?`, user.user.bot ? `\`\`\`Sì!\`\`\`` : `\`\`\`No\`\`\``, true)
            .addField(`:red_car:Entrato nel server:`, `\`\`\`${message.member.joinedAt.toDateString()}\`\`\``, true)
            .addField(`:pencil:Creazione account:`, `\`\`\`${moment(user.user.createdAt).format(`ddd DD MMM YYYY`)}\`\`\``, true)
        message.reply({embeds: [embed]})
    }
}