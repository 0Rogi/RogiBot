module.exports = {
    name: `nick`,
    description: `Cambia il nome di un utente`,
    onlyHelpers: true,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un utente valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let nick = args.slice(1).join(` `)
        if(nick == "") {
            let embedserver = new Discord.MessageEmbed()
                .setTitle(`Nick`)
                .setDescription(`:white_check_mark: Il nome di ${utente} è stato resettato con successo!`)
                .setColor(`RED`)
            let embedutente = new Discord.MessageEmbed()
                .setTitle(`Nick`)
                .setDescription(`:white_check_mark: Il tuo nome in ${message.guild.name} è stato resettato!`)
                .setColor(`RED`)
            utente.send({embeds: [embedutente]}).catch(() => { 
                embedserver.setDescription(`:white_check_mark: Il nome di ${utente} è stato resettato con successo!\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            })
            setTimeout(() => {
                message.reply({embeds: [embedserver]})
                utente.setNickname(utente.user.username)
            }, 1000);
            return
        }
        let embedserver = new Discord.MessageEmbed()
            .setTitle(`Nick`)
            .setDescription(`:white_check_mark: Il nuovo nome di ${utente} è ora: ${nick}`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Nick`)
            .setDescription(`:white_check_mark: Il tuo nuovo nome in ${message.guild.name} è ora: ${nick}`)
            .setColor(`RED`)
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: Il nuovo nome di ${utente} è ora: ${nick}\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
            message.reply({embeds: [embedserver]})
            utente.setNickname(nick.toString())
        }, 1000);
    }
}