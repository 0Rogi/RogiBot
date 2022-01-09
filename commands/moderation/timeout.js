module.exports = {
    name: `timeout`,
    description: `Mette in timeout un utente`,
    onlyHelpers: true,
    execute(message, args) {
        let time = args[1]
        let reason = args.slice(2).join(` `)
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
        if(!time) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un tempo valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(utente.roles.cache.has(config.idruoli.staff)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: ${utente} è uno staffer, non posso metterlo in timeout`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        time = ms(time)
        let tempo = ms(time, { long: true })
        tempo = tempo + ` `
        tempo = tempo.replace(`second `, `secondo`)
        tempo = tempo.replace(`seconds`, `secondi`)
        tempo = tempo.replace(`minute `, `minuto `)
        tempo = tempo.replace(`minutes`, `minuti`)
        tempo = tempo.replace(`hour `, `ora `)
        tempo = tempo.replace(`hours`, `ore`)
        if(!reason) reason = `Nessun Motivo`
        let embedserver = new Discord.MessageEmbed()
            .setTitle(`Timeout`)
            .setDescription(`:white_check_mark: ${utente} ha ricevuto un timeout di ${tempo} per il motivo: **${reason}**`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Timeout`)
            .setDescription(`Hai ricevuto un timeout di ${tempo} in ${message.guild.name} per il seguente motivo: **${reason}**`)
            .setColor(`RED`)
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${utente} ha ricevuto un timeout di ${tempo} per il motivo: **${reason}**\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
            message.reply({embeds: [embedserver]})
            utente.timeout(time, reason)
        }, 1000)
    }
}