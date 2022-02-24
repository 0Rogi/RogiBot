module.exports = {
    name: `nick`,
    onlyHelpers: true,
    async execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!nick [utente] [nuovo nick]\`*`)
                .setColor(`RED`)
                .setThumbnail(`https://i.imgur.com/ULYfVp2.png`)
            message.reply({embeds: [embed]})
            return
        }
        if(utente.roles.cache.has(config.idruoli.staff) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`${utente} è uno staffer, non posso cambiargli il nome`)
                .setColor(`RED`)
                .setThumbnail(`https://i.imgur.com/6SnnI0Q.png`)
            message.reply({embeds: [embed]})
            return
        }
        let nick = args.slice(1).join(` `)
        let embedserver = new Discord.MessageEmbed()
            .setAuthor({name: `[NICK] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
            .setThumbnail(config.images.roginick)
            .setColor(`PURPLE`)
            .addField(`Utente:`, `Nome: ${utente.user.username}, ID: ${utente.id}\n||${utente.toString()}||`)
            .addField(`Nuovo Nick:`, nick ? nick.toString() : `_Resettato_`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Nome Inserito!`)
            .setThumbnail(utente.displayAvatarURL({dynamic: true, size: 512}))
            .setColor(`RED`)
            .addField(`Inserito da:`, message.author.toString(), true)
            .addField(`Inserito in:`, message.guild.name, true)
            .addField(`Nuovo Nick:`, nick ? nick.toString() : `_Resettato_`)
        let dm = true
        await utente.send({embeds: [embedutente]}).catch(() => { dm = false })
        let oldnick = utente.nickname
            let embed = new Discord.MessageEmbed()
                .setTitle(`🖊️NOME MODIFICATO🖊️`)
                .setColor(`YELLOW`)
                .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setThumbnail(utente.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`👤Utente:`, `Nome: **${utente.user.username}**, ID: **${utente.id}**\n||${utente.toString()}||`)
                if(nick == ``) {
                    embed.addField(`📖Nuovo Nick:`, `_Resettato_`)
                } else {
                    embed.addField(`📘Vecchio Nick:`, oldnick ? oldnick.toString() : utente.user.username.toString(), true)
                    embed.addField(`📖Nuovo Nick:`, nick.toString(), true)
                }
            
            if(dm == false) embed.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embed]})
            message.reply({embeds: [embedserver]})
            utente.setNickname(nick.toString())
            
    }
}