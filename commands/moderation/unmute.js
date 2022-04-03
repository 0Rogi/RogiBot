const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `unmute`,
    FromHelpers: true,
    async execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!unmute [utente]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        if(!utente.roles.cache.has(config.idruoli.muted)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo utente non è mutato\n\`!unmute [utente]\`*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embedserver = new Discord.MessageEmbed()
            .setAuthor({name: `[UNMUTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
            .setThumbnail(config.images.rogimute)
            .setColor(`PURPLE`)
            .addField(`Utente:`, `Nome: ${utente.user.username}, ID: ${utente.id}\n||${utente.toString()}||`)
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Sei stato smutato!`)
            .setThumbnail(config.images.rogimute)
            .setColor(`RED`)
            .addField(`Smutato da:`, message.author.toString(), true)
            .addField(`Smutato in:`, message.guild.name, true)
        let dm = true
        await utente.send({embeds: [embedutente]}).catch(() => { dm = false })
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
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embed]})
            message.reply({embeds: [embedserver]})
            utente.roles.remove(config.idruoli.muted)
    }
}