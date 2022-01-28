module.exports = {
    name: `embed`,
    execute(message, args) {
        if(!message.member.roles.cache.has(config.idruoli.level25) && !message.member.roles.cache.has(config.idruoli.level30)) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`Hai bisogno almeno del **livello 25** per eseguire questo comando`)
                .setTitle(`Non hai il livello`)
            message.reply({embeds: [embed]})
            return
        }
        let saytext = args.join(` `);
        if(!saytext) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci il testo da trasformare in embed`)
                .setColor(`RED`)
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