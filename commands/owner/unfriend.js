module.exports = {
    name: `unfriend`,
    description: `Per smettere di essere un rogi's friend`,
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
        if(!friend.roles.cache.has(config.idruoli.friend)) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setDescription(`:x: Questo utente non è amico di rogi!`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
            message.reply({embeds: [embed]})
            return;
        }
        const embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setTitle(`Riuscito!`)
            .setDescription(`:white_check_mark: ${friend.toString()} non è più amico di Rogi!`)
            .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
        friend.roles.remove(config.idruoli.friend)
        if(!friend.roles.cache.has(`853313137737596998`) && !friend.roles.cache.has(`621264274274385920`) && !friend.roles.cache.has(`813843750773063741`) && !friend.roles.cache.has(`813844426283548693`) && !friend.roles.cache.has(`857262474989404201`) && !friend.roles.cache.has(`857263832657428530`)) {
            friend.roles.remove(config.idruoli.special)
        }
        message.reply({embeds: [embed]})
        friend.send(`Non sei più amico di Rogi nel server ${message.guild.name}`).catch(() => { } )
    }
}