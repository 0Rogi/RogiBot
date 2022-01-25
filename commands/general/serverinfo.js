module.exports = {
    name: `serverinfo`,
    execute(message) {
        let server = message.member.guild;
        let name = server.name
        let verificationlevel = server.verificationLevel
        let owner = server.members.cache.get(server.ownerId).user.username
        let botCount = server.members.cache.filter(member => member.user.bot).size;
        let utentiCount = server.memberCount - botCount;
        let creationdate = server.createdAt
        let categoryCount = server.channels.cache.filter(c => c.type == `GUILD_CATEGORY`).size
        let textCount = server.channels.cache.filter(c => c.type == `GUILD_TEXT`).size
        let voiceCount = server.channels.cache.filter(c => c.type == `GUILD_VOICE`).size
        let newsCount = server.channels.cache.filter(c => c.type == `GUILD_NEWS`).size

        let embed = new Discord.MessageEmbed()
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