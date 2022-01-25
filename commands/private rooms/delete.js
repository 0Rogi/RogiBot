module.exports = {
    name: `pdelete`,
    execute(message) {
        let channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        channel.delete()
        let embed = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`:white_check_mark: La tua stanza privata è stata cancellata`)
        message.reply({embeds: [embed]})
    }
}