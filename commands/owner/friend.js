module.exports = {
    name: `friend`,
    description: `Per diventare un rogi's friend`,
    execute(message) {
        var friend = message.mentions.members.first()
        if(!message.member.permissions.has(`ADMINISTRATOR`)){
            message.reply({embeds: [noperm]});
            return;
        }
        if(!friend) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un utente valido`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
            message.reply({embeds: [embed]})
            return;
        }
        if(friend.roles.cache.has(config.idruoli.friend)) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setDescription(`:x: Questo utente è già amico di rogi!`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
            message.reply({embeds: [embed]})
            return;
        }
        const embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setTitle(`Riuscito!`)
            .setDescription(`:white_check_mark: ${friend.toString()} è ora amico di Rogi!`)
            .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
        friend.roles.add(config.idruoli.friend)
        friend.roles.add(config.idruoli.special)
        message.reply({embeds: [embed]})
        friend.send(`Adesso sei amico di Rogi nel server ${message.guild.name}`).catch(() => { } )
    }
}