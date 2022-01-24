module.exports = {
    name: `unmute`,
    description: `Smuta un utente nel server`,
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
        if(!utente.roles.cache.has(config.idruoli.muted)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Questo utente non è mutato`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embedserver = new Discord.MessageEmbed()
            .setTitle(`Unmute`)
            .setDescription(`:white_check_mark: ${utente} è ora smutato`)
            .setColor(`GREEN`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Unmute`)
            .setDescription(`Sei stato smutato in ${message.guild.name}`)
            .setColor(`RED`)
        let dm = true
        utente.send({embeds: [embedutente]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${utente} è ora smutato\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            dm = false
        })
        setTimeout(() => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🔉UNMUTE🔉`)
                .setColor(`GREEN`)
                .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setThumbnail(utente.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`👤Utente:`, `Nome: **${utente.user.username}**, ID: **${utente.id}**\n||${utente.toString()}||`)
            if(dm == false) embed.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embed]})
            message.reply({embeds: [embedserver]})
            utente.roles.remove(config.idruoli.muted)
        }, 1000);
    }
}