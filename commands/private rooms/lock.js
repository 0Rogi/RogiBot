module.exports = {
    name: `plock`,
    description: `Blocca la stanza privata`,
    execute(message) {
        var channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        channel.permissionOverwrites.create(config.idServer.idServer, {CONNECT: false})
        const embed = new Discord.MessageEmbed()
            .setDescription(`Il tuo canale <#${channel.id}> è stato bloccato, ora nessuno puo' entrarci`)
            .setColor(`GREEN`)
        message.reply({embeds: [embed]})
    }
}