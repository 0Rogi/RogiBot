module.exports = {
    name: `timeout`,
    FromHelpers: true,
    async execute(message, args) {
        let time = args[1]
        let reason = args.slice(2).join(` `)
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let utente = message.mentions.members.first() || server.members.cache.find(x => x.id == id)
        if(!utente) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!timeout [utente] [tempo] [motivo]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        if(!time) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un tempo valido\n\`!timeout [utente] [tempo] [motivo]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        if(utente.roles.cache.has(config.idruoli.staff) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`${utente} è uno staffer, non posso metterlo in timeout`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        time = ms(time)
        if(time < 1000 * 60) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un tempo maggiore o uguale ad un minuto\n\`!timeout [utente] [tempo] [motivo]\`*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
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
            .setAuthor({name: `[TIMEOUT] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
            .setThumbnail(config.images.rogitimeout)
            .setColor(`PURPLE`)
            .addField(`Utente:`, `Nome: ${utente.user.username}, ID: ${utente.id}\n||${utente.toString()}||`)
            .addField(`Motivo:`, reason.toString())
            .addField(`Per:`, tempo.toString())
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Sei stato messo in timeout!`)
            .setThumbnail(utente.displayAvatarURL({dynamic: true, size: 512}))
            .setColor(`RED`)
            .addField(`Messo in timeout da:`, message.author.toString(), true)
            .addField(`Messo in timeout:`, message.guild.name, true)
            .addField(`Per il motivo:`, reason.toString(), true)
            .addField(`Per:`, tempo.toString(), true)
        let dm = true
        await utente.send({embeds: [embedutente]}).catch(() => { dm = false })
            let embed = new Discord.MessageEmbed()
                .setTitle(`⛔TIMEOUT⛔`)
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
                .addField(`⏰Tempo:`, tempo.toString())
            if(dm == false) embed.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            let channel = client.channels.cache.get(config.idcanali.logs.moderation)
            channel.send({embeds: [embed]})
            message.reply({embeds: [embedserver]})
            utente.timeout(time, reason)
    }
}