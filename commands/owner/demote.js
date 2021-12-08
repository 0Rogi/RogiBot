module.exports = {
    name: `demote`,
    description: `Retrocede qualcuno`,
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
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                .setDescription(`:x: ${user.toString()} non è uno staffer`)
            message.reply({embeds: [embed]})
            return
        } else if(user.roles.cache.has(config.idruoli.moderator)) {
            user.roles.remove(config.idruoli.moderator)
            user.roles.add(config.idruoli.helper)
            const embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`Riuscito!`)
                .setDescription(`:white_check_mark: ${user.toString()} è ora un <@&${config.idruoli.helper}>`)
                .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            message.reply({embeds: [embed]})
            const embed1 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`AVVISO`)
                .setDescription(`:white_check_mark: ${user.toString()} sei stato retrocesso ad **helper** in ${message.guild.name}`)
            user.send({embeds: [embed1]}).catch(() => { } )
        } else if(user.roles.cache.has(config.idruoli.helper)) {
            user.roles.remove(config.idruoli.helper)
            user.roles.remove(config.idruoli.staff)
            const embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`Riuscito!`)
                .setDescription(`:white_check_mark: ${user.toString()} è ora un <@&${config.idruoli.fan}>`)
                .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            message.reply({embeds: [embed]})
            const embed1 = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`AVVISO`)
                .setDescription(`:white_check_mark: ${user.toString()} non sei più uno **staffer** in ${message.guild.name}`)
            user.send({embeds: [embed1]}).catch(() => { } )
        }
    }
}