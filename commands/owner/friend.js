module.exports = {
    name: `friend`,
    description: `Per diventare un rogi's friend`,
    onlyOwner: true,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let friend = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
        if(!friend) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un utente valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(friend.roles.cache.has(config.idruoli.friend)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Questo utente è già amico di Rogi`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embedserver = new Discord.MessageEmbed()
                .setTitle(`Friend`)
                .setDescription(`:white_check_mark: ${friend} è ora un <@&${config.idruoli.friend}>!`)
                .setColor(`GREEN`)
        let embeduser = new Discord.MessageEmbed()
                .setTitle(`Friend`)
                .setDescription(`:white_check_mark: Ora sei un Rogi's Friend nel server ${message.guild.name}`)
                .setColor(`GREEN`)
        friend.send({embeds: [embeduser]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${friend} è ora un <@&${config.idruoli.friend}>!\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
                message.reply({embeds: [embedserver]})                
        }, 1000);
        friend.roles.add(config.idruoli.friend)
        friend.roles.add(config.idruoli.special)
    }
}