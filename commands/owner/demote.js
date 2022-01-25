module.exports = {
    name: `demote`,
    onlyOwner:true,
    execute(message, args) {
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
        if(!user.roles.cache.has(config.idruoli.helper) && !user.roles.cache.has(config.idruoli.moderator)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Questo utente non è uno staffer`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        } else if(user.roles.cache.has(config.idruoli.moderator)) {
            user.roles.remove(config.idruoli.moderator)
            user.roles.add(config.idruoli.helper)
            let embedserver = new Discord.MessageEmbed()
                .setTitle(`Demote`)
                .setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.helper}>!`)
                .setColor(`GREEN`)
            let embeduser = new Discord.MessageEmbed()
                .setTitle(`Demote`)
                .setDescription(`:white_check_mark: Sei ora un helper nel server ${message.guild.name}`)
                .setColor(`RED`)
            user.send({embeds: [embeduser]}).catch(() => { 
            embedserver.setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.helper}>!\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
        })
        setTimeout(() => {
            message.reply({embeds: [embedserver]})
        }, 1000);
        } else if(user.roles.cache.has(config.idruoli.helper)) {
            user.roles.remove(config.idruoli.helper)
            user.roles.remove(config.idruoli.staff)
            let embedserver = new Discord.MessageEmbed()
                .setTitle(`Demote`)
                .setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.fan}>!`)
                .setColor(`GREEN`)
            let embeduser = new Discord.MessageEmbed()
                .setTitle(`Demote`)
                .setDescription(`:white_check_mark: Non sei più uno staffer nel server ${message.guild.name}`)
                .setColor(`RED`)
            user.send({embeds: [embeduser]}).catch(() => { 
                embedserver.setDescription(`:white_check_mark: ${user} è ora un <@&${config.idruoli.fan}>!\n⚠️NON POSSO AVVISARE QUESTO UTENTE IN DM⚠️`)
            })
            setTimeout(() => {
                message.reply({embeds: [embedserver]})                
            }, 1000);
        }
    }
}