module.exports = {
    name: `nick`,
    description: `Cambia il nome di un utente`,
    execute(message) {
        if(!message.member.permissions.has(`MANAGE_NICKNAMES`)) return message.reply({embeds: [noperm]})
        var user = message.mentions.members.first()
        const nick = message.content.split(` `).slice(2);
        if(!user){
            var args = message.content.split(` `).slice(1)
            var id = args.join(` `)
            var server = client.guilds.cache.get(config.idServer.idServer)
            var user = server.members.cache.find(x => x.id == id)
            if(!user)  {
                const embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setTitle(`Errore`)
                    .setDescription(`:x: **Inserisci un utente valido**`)
                    .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                    .setFooter(`Moderatore: ${message.author.tag}`)
            message.reply({embeds: [embed]});
            return;
        }}
        if (!nick) {
        const embed = new Discord.MessageEmbed()
            .setColor(`#ff0000`)
            .setTitle(`Errore`)
            .setDescription(`:x:**Inserisci un nickname valido!**`)
            .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
            .setFooter(`Moderatore: ` + message.author.tag)
        message.reply({embeds: {embed}})
        return
        }
        const embed1 = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setTitle(`Il tuo nick è stato cambiato!`)
            .setDescription(`${user.user.username}, il tuo nome in **${message.guild.name}** è stato cambiato in ${nick} da ${message.author.tag}`)
        user.send({embeds: [embed1]}).catch(() => { })
        setTimeout(() => {
            const embed2 = new Discord.MessageEmbed()
            .setColor(`#25a605`)
            .setTitle(`Riuscito!`)
            .setDescription(`Il nuovo nick di ${user} è ${nick}`)
            .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        message.reply({embeds: [embed2]})
        user.setNickname(nick.toString())
        }, 1000);
    }
}