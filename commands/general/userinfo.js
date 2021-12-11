module.exports = {
    name: `userinfo`,
    description: `Info su un utente`,
    execute(message) {
        var utente = message.mentions.members.first()
        if(!utente) utente = message.member
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.username.toString())
            .setThumbnail(utente.user.avatarURL({ dynamic: true }))
            .setColor(`YELLOW`)
            .addField(`:receipt:ID dell'utente:`, `\`\`\`${utente.user.id}\`\`\``, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`:link:Discriminator:`, `\`\`\`#${utente.user.discriminator.toString()}\`\`\``, true)
            .addField(`:robot:È un bot?`, utente.user.bot ? `\`\`\`Si\`\`\`` : `\`\`\`No\`\`\``, true)
            .addField(`:red_car:Entrato nel server:`, `\`\`\`${message.member.joinedAt.toDateString()}\`\`\``, true)
            .addField(`:pencil:Creazione account:`, `\`\`\`${moment(utente.user.createdAt).format(`ddd DD MMM YYYY`)}\`\`\``, true)
        message.reply({embeds: [embed]})
    }
}