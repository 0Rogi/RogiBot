module.exports = {
    name: `promote`,
    description: `Promuove qualcuno`,
    execute(message) {
        if(!message.member.permissions.has(`ADMINISTRATOR`)) {
            message.reply({embeds: [noperm]})
            return
        }
        var user = message.mentions.members.first()
        if(!user) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                .setDescription(`:x: Inserisci un utente valido`)
            message.reply({embeds: [embed]})
            return;
        }
        if(!user.roles.cache.has(config.idruoli.helper) && !user.roles.cache.has(config.idruoli.moderator)) {
            user.roles.add(config.idruoli.helper)
            user.roles.add(config.idruoli.staff)
            const embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`Riuscito!`)
                .setDescription(`:white_check_mark: ${user.toString()} è ora un <@&${config.idruoli.helper}>`)
                .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            message.reply({embeds: [embed]})
            const embed1 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`AVVISO`)
                .setDescription(`:white_check_mark: ${user.toString()} sei stato promosso ad **helper** in ${message.guild.name}`)
            user.send({embeds: [embed1]}).catch(() => { } )
        } else if(!user.roles.cache.has(config.idruoli.moderator) && user.roles.cache.has(config.idruoli.helper)) {
            user.roles.add(config.idruoli.moderator)
            user.roles.remove(config.idruoli.helper)
            const embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`Riuscito!`)
                .setDescription(`:white_check_mark: ${user.toString()} è ora un <@&${config.idruoli.moderator}>`)
                .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            message.reply({embeds: [embed]})
            const embed1 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`AVVISO`)
                .setDescription(`:white_check_mark: ${user.toString()} sei stato promosso a **moderatore** in ${message.guild.name}`)
            user.send({embeds: [embed1]}).catch(() => { } )
        } else if(user.roles.cache.has(config.idruoli.moderator) || user.roles.cache.has(config.idruoli.owner)) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                .setDescription(`:x: ${user.toString()} è già di grado **massimo**`)
            message.reply({embeds: [embed]})
        }
    }
}