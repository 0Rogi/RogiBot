module.exports = {
    name: `punlock`,
    description: `Sblocca la stanza privata`,
    execute(message) {
        var channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        channel.permissionOverwrites.create(config.idServer.idServer, {CONNECT: true})
        const embed = new Discord.MessageEmbed()
        .setDescription(`Il tuo canale <#${channel.id}> è stato sbloccato, ora nessuno puo' entrarci`)
        .setColor(`YELLOW`)
        message.reply({embeds: [embed]})
    }
}