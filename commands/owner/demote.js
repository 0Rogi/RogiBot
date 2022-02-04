module.exports = {
    name: `demote`,
    onlyOwner:true,
    async execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!demote [utente]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        if(!user.roles.cache.has(config.idruoli.helper) && !user.roles.cache.has(config.idruoli.moderator)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Quest'utente non è uno staffer*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        } else if(user.roles.cache.has(config.idruoli.moderator)) {
            user.roles.remove(config.idruoli.moderator)
            user.roles.add(config.idruoli.helper)
            let dm = true
            let embedserver = new Discord.MessageEmbed()
                .setAuthor({name: `[DEMOTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
                //.setThumbnail(config.images.rogi)
                .setColor(`PURPLE`)
                .addField(`Utente:`, `Nome: ${user.user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`Grado:`, `<@&${config.idruoli.helper}>`)
            let embedutente = new Discord.MessageEmbed()
                .setTitle(`Sei retrocesso!`)
                .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
                .setColor(`RED`)
                .addField(`Server:`, message.guild.name, true)
                .addField(`Grado:`, `Helper`, true)
            await user.send({embeds: [embedutente]}).catch(() => { dm = false })
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            message.reply({embeds: [embedserver]})
        } else if(user.roles.cache.has(config.idruoli.helper)) {
            user.roles.remove(config.idruoli.helper)
            user.roles.remove(config.idruoli.staff)
            let dm = true
            let embedserver = new Discord.MessageEmbed()
                .setAuthor({name: `[DEMOTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
                //.setThumbnail(config.images.rogi)
                .setColor(`PURPLE`)
                .addField(`Utente:`, `Nome: ${user.user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`Grado:`, `<@&${config.idruoli.fan}>`)
            let embedutente = new Discord.MessageEmbed()
                .setTitle(`Sei retrocesso!`)
                .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
                .setColor(`RED`)
                .addField(`Server:`, message.guild.name, true)
                .addField(`Grado:`, `Fan`, true)
            await user.send({embeds: [embedutente]}).catch(() => { dm = false })
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            message.reply({embeds: [embedserver]})
        }
    }
}