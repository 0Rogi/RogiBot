module.exports = {
    name: `embed`,
    execute(message, args) {
        if(!message.member.roles.cache.has(config.idruoli.level25) && !message.member.roles.cache.has(config.idruoli.level30) && !message.member.roles.cache.has(config.idruoli.serverbooster) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`_Hai bisogno almeno del **livello 25**\nper eseguire questo comando_`)
                .setTitle(`Non hai il livello`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let saytext = args.join(` `);
        if(!saytext) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un messaggio\n\`!embed [messaggio]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setColor(`YELLOW`)
            .setDescription(saytext.toString())
        global.delete = false
        message.delete()
        message.channel.send({embeds: [embed]})
    } 
}