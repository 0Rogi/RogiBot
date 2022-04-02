const moment = require(`moment`)

module.exports = {
    name: `mute`,
    FromHelpers: true,
    async execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!mute [utente] [motivo]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        if(utente.roles.cache.has(config.idruoli.staff) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`${utente} è uno staffer, non posso mutarlo`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let reason = args.slice(1).join(` `)
        if(reason == ``) reason = `Nessun Motivo`
        if(utente.roles.cache.has(config.idruoli.muted)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo utente è già mutato\n\`!mute [utente] [motivo]\`*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embedserver = new Discord.MessageEmbed()
            .setAuthor({name: `[MUTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
            .setThumbnail(config.images.rogimute)
            .setColor(`PURPLE`)
            .addField(`Utente:`, `Nome: ${utente.user.username}, ID: ${utente.id}\n||${utente.toString()}||`)
            .addField(`Motivo:`, reason.toString())
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Sei stato mutato!`)
            .setThumbnail(utente.displayAvatarURL({dynamic: true, size: 512}))
            .setColor(`RED`)
            .setDescription(`Se ritieni ingiusto il tuo mute, puoi aprire un ticket in <#855444441564446731>`)
            .addField(`Mutato da:`, message.author.toString(), true)
            .addField(`Mutato in:`, message.guild.name, true)
            .addField(`Per il motivo:`, reason.toString(), true)
        let dm = true
        await utente.send({embeds: [embedutente]}).catch(() => { dm = false })
        let embedlogs = new Discord.MessageEmbed()
            .setTitle(`🔇MUTE🔇`)
            .setColor(`RED`)
            .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            .setThumbnail(utente.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`👤Utente:`, `Nome: **${utente.user.username}**, ID: **${utente.id}**\n||${utente.toString()}||`)
                .addField(`📖Motivo:`, reason)
            if(dm == false) embedlogs.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            if(dm == false) embedserver.setDescription(`:white_check_mark: ${utente} è stato mutato per il motivo: **${reason}**\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embedlogs]})
            message.reply({embeds: [embedserver]})
            utente.roles.add(config.idruoli.muted)
    }
}