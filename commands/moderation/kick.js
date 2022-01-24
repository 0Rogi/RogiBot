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
            .setDescription(`:white_check_mark: ${utente} stato kickato per il motivo: **${reason}**`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Kick`)
            .setDescription(`Sei stato kickato in ${message.guild.name} per il seguente motivo: **${reason}**`)
            .setColor(`RED`)
        let dm = true
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${utente} è stato kickato per il motivo: **${reason}**\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            dm = false
        })
        setTimeout(() => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🏓KICK🏓`)
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
                .addField(`📖Motivo:`, reason)
            if(dm == false) embed.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embed]})
            message.reply({embeds: [embedserver]})
            utente.kick({ reason: reason })
        }, 1000)
    }
}