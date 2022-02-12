module.exports = {
    name: `pdelete`,
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
                .setDescription(`*Non hai il permesso di eliminare questa stanza privata!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`Eliminazione della stanza privata`)
            .setColor(`GREEN`)
            .setDescription(`Tra 5 secondi la stanza si eliminerà`)
            .setThumbnail(config.images.rogiclosing)
        setTimeout(() => {
            channel.delete()
        }, 1000 * 5);
        message.reply({embeds: [embed]})
    }
}