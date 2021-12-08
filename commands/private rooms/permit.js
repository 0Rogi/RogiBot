module.exports = {
    name: `ppermit`,
    description: `Permette ad un utente in particolare di entrare nella stanza privata`,
    execute(message) {
        var channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        var user = message.mentions.members.first()
        if(!user) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`ERRORE`)
            .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
            .setColor(`RED`)
            .setDescription(`:x: Inserisci un utente valido`)
            message.reply({embeds: [embed]})
            return
        }
        channel.permissionOverwrites.create(user.id, {CONNECT: true})
        const embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setDescription(`${user} adesso puo' entrare in <#${channel.id}>`)
        message.reply({embeds: [embed]})
    }
}