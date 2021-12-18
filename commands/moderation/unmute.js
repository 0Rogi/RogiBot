module.exports = {
    name: `unmute`,
    description: `Smuta un utente nel server`,
    execute(message) {
        if(!message.member.permissions.has(`MANAGE_MESSAGES`)) {
            message.reply({embeds: [noperm]});
            return;
        }
        var user = message.mentions.members.first();
        var args = message.content.split(` `).slice(2);
        var reason = args.join(` `)
        if(!reason) reason = `Nessun Motivo`
        if(!user) {
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
        if (!user.roles.cache.has(config.idruoli.muted)) {
            const embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setTitle(`Errore`)
                    .setDescription(`:x: **Quest'utente non è mutato**`)
                    .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                    .setFooter(`Moderatore: ${message.author.tag}`)
            message.reply({embeds: [embed]})
            return;
        }
        const embed1 = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setTitle(`Sei stato smutato!`)
            .setDescription(`${user.user.username}, sei stato smutato dal server **${message.guild.name}** da ${message.author.tag}`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        user.send({embeds: [embed1]}).catch(() => { })
        setTimeout(() => {
            const embed2 = new Discord.MessageEmbed()
            .setColor(`#25a605`)
            .setTitle(`Riuscito!`)
            .setDescription(`${user} è stato smutato`)
            .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        message.reply({embeds: [embed2]})
        user.roles.remove(config.idruoli.muted)
        }, 1000)
    }
}