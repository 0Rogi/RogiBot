const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `ban`,
    FromMods: true,
    async execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id)
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!ban [utente] [motivo]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        if(utente.roles.cache.has(config.idruoli.staff) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`${utente} è uno staffer, non posso bannarlo`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let reason = args.slice(1).join(` `)
        let dm = true
        if(reason == ``) reason = `Nessun Motivo`
        let embedserver = new Discord.MessageEmbed()
            .setAuthor({name: `[BAN] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
            .setThumbnail(config.images.rogiban)
            .setColor(`PURPLE`)
            .addField(`Utente:`, `Nome: ${utente.user.username}, ID: ${utente.id}\n||${utente.toString()}||`)
            .addField(`Motivo:`, reason.toString())
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Sei stato bannato!`)
            .setThumbnail(utente.displayAvatarURL({dynamic: true, size: 512}))
            .setColor(`RED`)
            .addField(`Bannato da:`, message.author.toString(), true)
            .addField(`Bannato in:`, message.guild.name, true)
            .addField(`Per il motivo:`, reason.toString(), true)
        await utente.send({embeds: [embedutente]}).catch(() => { dm = false })
        let embedlogs = new Discord.MessageEmbed()
            .setTitle(`🔴BAN🔴`)
            .setColor(`RED`)
            .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            .setThumbnail(utente.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
            .addField(`👤Utente:`, `Nome: **${utente.user.username}**, ID: **${utente.id}**\n||${utente.toString()}||`)
            .addField(`📖Motivo:`, reason)
        if(dm == false) embedlogs.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
        if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
        let channel = client.channels.cache.get(config.idcanali.logs.moderation)
        channel.send({embeds: [embedlogs]})
        message.reply({embeds: [embedserver]})
        utente.ban({ reason: reason })
    }
}