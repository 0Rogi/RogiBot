module.exports = {
    name: `serverinfo`,
    description: `Info sul server`,
    execute(message) {
        let server = message.member.guild;
        var name = server.name
        var verificationlevel = server.verificationLevel
        var owner = server.members.cache.get(server.ownerId).user.username
        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;
        var creationdate = server.createdAt
        var categoryCount = server.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size
        var textCount = server.channels.cache.filter(c => c.type == "GUILD_TEXT").size
        var voiceCount = server.channels.cache.filter(c => c.type == "GUILD_VOICE").size
        var newsCount = server.channels.cache.filter(c => c.type == "GUILD_NEWS").size

        const embed = new Discord.MessageEmbed()
            .setTitle(name)
            .setThumbnail(server.iconURL())
            .setColor(`YELLOW`)
            .addField(`:technologist:Owner:`, `\`\`\`${owner.toString()}\`\`\``, true)
            .addField(`:rotating_light:Livello di verifica:`, `\`\`\`${verificationlevel.toString()}\`\`\``, true)
            .addField(`:busts_in_silhouette:Utenti:`, `\`\`\`Totali: ${server.memberCount} | Bot: ${botCount} | Utenti: ${utentiCount}\`\`\``, false)
            .addField(`:loud_sound:Canali:`, `\`\`\`Categorie: ${categoryCount} | Testuali: ${textCount} | Vocali: ${voiceCount} | Notizie: ${newsCount} \`\`\``, true)
            .addField(`:calendar_spiral:Creazione del server:`, `\`\`\`${creationdate.toDateString()}\`\`\``, false)
        message.reply({embeds: [embed]})
    }
}
