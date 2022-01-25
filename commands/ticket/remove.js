module.exports = {
    name: `tremove`,
    onlyHelpers: true,
    execute(message, args) {
        if(message.channel.parent != config.idcanali.helpparent) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Questo canale non è un ticket`)
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
                .setDescription(`:x: Inserisci un utente valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`Tremove`)
            .setDescription(`:white_check_mark: ${user} è stato **rimosso** dal ticket con successo`)
            .setColor(`GREEN`)
        message.channel.permissionOverwrites.create(user.id, {VIEW_CHANNEL: false})
        message.reply({embeds: [embed]})
    }
}