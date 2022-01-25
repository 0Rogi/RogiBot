module.exports = {
    name: `userinfo`,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) || message.member
        let status = user.presence?.status;
        if(status == "online") status = "🟢Online"
        if(status == "idle") status = "🟡Inattivo"
        if(status == "dnd") status = "🔴Non disturbare"
        if(status == "offline") status = "⚫Offline"
        let embed = new Discord.MessageEmbed()
            .setTitle(user.user.username.toString())
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setColor(`YELLOW`)
            .addField(`:receipt:ID dell'utente:`, `\`\`\`${user.user.id}\`\`\``, true)
            .addField(`:ok_hand: Status`, `\`\`\`${status}\`\`\``, true)
            .addField(`:link:Discriminator:`, `\`\`\`#${user.user.discriminator.toString()}\`\`\``, true)
            .addField(`:robot:È un bot?`, user.user.bot ? `\`\`\`Sì\`\`\`` : `\`\`\`No\`\`\``, true)
            .addField(`:red_car:Entrato nel server:`, `\`\`\`${user.joinedAt.toDateString()}\`\`\``, true)
            .addField(`:pencil:Creazione account:`, `\`\`\`${moment(user.user.createdAt).format(`ddd DD MMM YYYY`)}\`\`\``, true)
        message.reply({embeds: [embed]})
    }
}