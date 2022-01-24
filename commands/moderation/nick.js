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
        if(utente.roles.cache.has(config.idruoli.staff) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: ${utente} è uno staffer, non posso cambiargli il nome`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let change = true
        let nick = args.slice(1).join(` `)
        if(nick == ``) change = false
        let embedserver = new Discord.MessageEmbed()
            .setTitle(`Nick`)
            .setDescription(`:white_check_mark: Il nuovo nome di ${utente} è ora: ${nick}`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Nick`)
            .setDescription(`:white_check_mark: Il tuo nuovo nome in ${message.guild.name} è ora: ${nick}`)
            .setColor(`RED`)
        if(change == false) {
            embedserver.setDescription(`:white_check_mark: Il nuovo nome di ${utente} è stato resettato`)
            embedutente.setDescription(`:white_check_mark: Il tuo nuovo in ${message.guild.name} è stato resettato`)
        }
        let oldnick = utente.nickname
        let dm = true
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: Il nuovo nome di ${utente} è ora: ${nick}\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            if(change == false) embedserver.setDescription(`:white_check_mark: Il nuovo nome di ${utente} è stato resettato\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            dm = false
        })
        setTimeout(() => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🖊️Nome modificato🖊️`)
                .setColor(`RED`)
                .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setThumbnail(utente.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`👤Utente:`, `Nome: **${utente.user.username}**, ID: **${utente.id}**\n||${utente.toString()}||`)
                if(change == true) {
                embed.addField(`📘Vecchio Nick:`, oldnick ? oldnick : utente.user.username, true)
                embed.addField(`📖Nuovo Nick:`, nick.toString(), true)
                }
                if(change == false) {
                    embed.addField(`📖Nuovo Nick:`, `_Resettato_`)
                }
            if(dm == false) embed.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embed]})
            message.reply({embeds: [embedserver]})
            if(change == true) utente.setNickname(nick.toString())
            if(change == false) utente.setNickname(utente.user.username)
        }, 1000);
    }
}