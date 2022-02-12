module.exports = {
    name: `preject`,
    execute(message, args) {
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
                .setDescription(`*Non hai il permesso per far buttare fuori qualcuno\nin questa stanza privata!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!perject [utente]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        channel.permissionOverwrites.create(user.id, {CONNECT: false})
        if(user.voice.channel == channel) user.voice.disconnect()
        let embed = new Discord.MessageEmbed()
            .setTitle(`Permesso Impostato`)
            .setColor(`GREEN`)
            .setDescription(`${user} ora non ha più il permesso di entrare in ${channel}!`)
        message.reply({embeds: [embed]})
    }
}