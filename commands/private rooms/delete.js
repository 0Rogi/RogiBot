module.exports = {
    name: `pdelete`,
    description: `Elimina la stanza privata`,
    execute(message) {
        var channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        channel.delete()
        const embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setDescription(`La tua stanza privata è stata cancellata`)
        message.reply({embeds: [embed]})
    }
}