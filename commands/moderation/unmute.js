module.exports = {
    name: `unmute`,
    description: `Smuta un utente nel server`,
    onlyHelper: true,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`[Errore] ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
                .setDescription(`:x: Inserisci un utente valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(!utente.roles.cache.has(config.idruoli.muted)) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`[Errore] ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
                .setDescription(`:x: Questo utente non è mutato`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embedserver = new Discord.MessageEmbed()
            .setAuthor(`[Mute] ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
            .setDescription(`:white_check_mark: ${utente} è ora smutato`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setAuthor(`[Mute] ${utente.user.username}#${utente.user.discriminator}`, utente.user.avatarURL({ dynamic: true }))
            .setDescription(`Sei stato smutato in ${message.guild.name}`)
            .setColor(`RED`)
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${utente} è ora smutato\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
            message.reply({embeds: [embedserver]})
            utente.roles.remove(config.idruoli.muted)
        }, 1000);
    }
}