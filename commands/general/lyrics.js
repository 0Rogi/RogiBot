module.exports = {
    name: `lyrics`,
    async execute(message, args) {
        if(!message.member.roles.cache.has(config.idruoli.level20) && !message.member.roles.cache.has(config.idruoli.level25) && !message.member.roles.cache.has(config.idruoli.level30) && !message.member.roles.cache.has(config.idruoli.serverbooster) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`_Hai bisogno almeno del **livello 20**\nper eseguire questo comando_`)
                .setTitle(`Non hai il livello`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        message.channel.sendTyping()
        let title = args.join(` `)
        let lyrics = await lyricsFinder(title) || `Error`
        if(lyrics.length > 4096) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*La canzone è troppo lunga\nper essere visualizzata*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        if(lyrics == `Error`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare questa canzone\n\`!lyrics [canzone]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(title.toString())
            .setDescription(lyrics.toString())
            .setColor(`YELLOW`)
        message.reply({embeds: [embed]})
    }
}