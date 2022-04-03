const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `plock`,
    execute(message) {
        let channel = message.member.voice.channel
        if(!channel){
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non sei connesso in un canale vocale!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(channel.parent.id != config.idcanali.proomsparent) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non sei connesso in una stanza privata!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(message.author.username != channel.name) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non hai il permesso per bloccare\nquesta stanza privata!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        channel.permissionOverwrites.create(config.idServer.idServer, {CONNECT: false})
        let embed = new Discord.MessageEmbed()
            .setTitle(`Permesso Impostato`)
            .setColor(`GREEN`)
            .setDescription(`${channel} è stato bloccato!`)
        message.reply({embeds: [embed]})
    }
}