module.exports = {
    name: `kick`,
    description: `Butta fuori un utente dal server`,
    onlyMods: true,
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
        if(utente.roles.cache.has(config.idruoli.staff) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: ${utente} è uno staffer, non posso kickarlo`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let reason = args.slice(1).join(` `)
        if(reason == ``) reason = `Nessun Motivo`
        let embedserver = new Discord.MessageEmbed()
            .setTitle(`Kick`)
            .setDescription(`:white_check_mark: ${utente} è ora kickato per il motivo: **${reason}**`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Kick`)
            .setDescription(`Sei stato kickato in ${message.guild.name} per il seguente motivo: **${reason}**`)
            .setColor(`RED`)
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${utente} è ora kickato per il motivo: **${reason}**\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
            message.reply({embeds: [embedserver]})
            utente.kick({ reason: reason })
        }, 1000)
    }
}