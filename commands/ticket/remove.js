const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `tremove`,
    FromHelpers: true,
    execute(message, args) {
        if(message.channel.parent != config.idcanali.helpparent) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setColor(`RED`)
                .setDescription(`*Questo canale non è un ticket*`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non riesco a trovare l'utente\n\`!tremove [utente]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.roginotfound)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`Rimozione di un Utente`)
            .setDescription(`${user} è stato **rimosso** dal ticket con successo`)
            .setColor(`RED`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
        message.channel.permissionOverwrites.create(user.id, {VIEW_CHANNEL: false})
        message.reply({embeds: [embed]})
    }
}