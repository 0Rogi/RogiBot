module.exports = {
    name: `promote`,
    onlyOwner: true,
    async execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!promote [utente]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        if(!user.roles.cache.has(config.idruoli.helper) && !user.roles.cache.has(config.idruoli.moderator) && !user.roles.cache.has(config.idruoli.srmoderator)) {
            user.roles.add(config.idruoli.helper)
            user.roles.add(config.idruoli.staff)
            let dm = true
            let embedserver = new Discord.MessageEmbed()
                .setAuthor({name: `[PROMOTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
                //.setThumbnail(config.images.rogi)
                .setColor(`PURPLE`)
                .addField(`Utente:`, `Nome: ${user.user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`Grado:`, `<@&${config.idruoli.helper}>`)
            let embedutente = new Discord.MessageEmbed()
                .setTitle(`Sei stato promosso!`)
                .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
                .setColor(`GREEN`)
                .addField(`Server:`, message.guild.name, true)
                .addField(`Grado:`, `Helper`, true)
            await user.send({embeds: [embedutente]}).catch(() => { dm = false })
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            message.reply({embeds: [embedserver]})
        } else if(!user.roles.cache.has(config.idruoli.moderator) && user.roles.cache.has(config.idruoli.helper)) {
            user.roles.add(config.idruoli.moderator)
            user.roles.remove(config.idruoli.helper)
            let dm = true
            let embedserver = new Discord.MessageEmbed()
                .setAuthor({name: `[PROMOTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
                //.setThumbnail(config.images.rogi)
                .setColor(`PURPLE`)
                .addField(`Utente:`, `Nome: ${user.user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`Grado:`, `<@&${config.idruoli.moderator}>`)
            let embedutente = new Discord.MessageEmbed()
                .setTitle(`Sei stato promosso!`)
                .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
                .setColor(`GREEN`)
                .addField(`Server:`, message.guild.name, true)
                .addField(`Grado:`, `Moderatore`, true)
            await user.send({embeds: [embedutente]}).catch(() => { dm = false })
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            message.reply({embeds: [embedserver]})
        } else if(!user.roles.cache.has(config.idruoli.srmoderator) && user.roles.cache.has(config.idruoli.moderator)) {
            user.roles.add(config.idruoli.srmoderator)
            user.roles.remove(config.idruoli.moderator)
            let dm = true
            let embedserver = new Discord.MessageEmbed()
                .setAuthor({name: `[PROMOTE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setDescription(`⚠️**HO AVVISATO** QUEST'UTENTE IN DM⚠️`)
                //.setThumbnail(config.images.rogi)
                .setColor(`PURPLE`)
                .addField(`Utente:`, `Nome: ${user.user.username}, ID: ${user.id}\n||${user.toString()}||`)
                .addField(`Grado:`, `<@&${config.idruoli.srmoderator}>`)
            let embedutente = new Discord.MessageEmbed()
                .setTitle(`Sei stato promosso!`)
                .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
                .setColor(`GREEN`)
                .addField(`Server:`, message.guild.name, true)
                .addField(`Grado:`, `SR Moderator`, true)
            await user.send({embeds: [embedutente]}).catch(() => { dm = false })
            if(dm == false) embedserver.setDescription(`⚠️**NON POSSO AVVISARE** QUESTO UTENTE IN DM⚠️`)
            message.reply({embeds: [embedserver]})
        } else if(user.roles.cache.has(config.idruoli.srmoderator) || user.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Quest'utente è di grado massimo*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
        }
    }
}