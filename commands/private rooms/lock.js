module.exports = {
    name: `plock`,
    execute(message) {
        let channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        channel.permissionOverwrites.create(config.idServer.idServer, {CONNECT: false})
        let embed = new Discord.MessageEmbed()
            .setDescription(`Il tuo canale <#${channel.id}> è stato bloccato, ora nessuno puo' entrarci`)
            .setColor(`GREEN`)
        message.reply({embeds: [embed]})
    }
}