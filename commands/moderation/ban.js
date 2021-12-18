module.exports = {
    name: `ban`,
    description: `Esclude un utente dal server`,
    execute(message) {
        if(!message.member.permissions.has(`BAN_MEMBERS`)){
            message.reply({embeds: [noperm]});
            return;
        }
        var utenteBan = message.mentions.members.first();
        var args = message.content.split(` `).slice(2);
        var reason = args.join(` `);
        if(!reason) reason = `Nessun Motivo`
        if(!utenteBan){
            var args = message.content.split(` `).slice(1)
            var id = args.join(` `)
            var server = client.guilds.cache.get(config.idServer.idServer)
            var utenteBan = server.members.cache.find(x => x.id == id)
            if(!utenteBan)  {
                const embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setTitle(`Errore`)
                    .setDescription(`:x: **Inserisci un utente valido**`)
                    .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                    .setFooter(`Moderatore: ${message.author.tag}`)
            message.reply({embeds: [embed]});
            return;
        }
        }
        if(!utenteBan.kickable) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setDescription(`:x: **Non posso bannare quest'utente**`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                .setFooter(`Moderatore: ${message.author.tag}`)
            message.reply({embeds: [embed]});
            return;
        }
        const embed1 = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setTitle(`Sei stato bannato!`)
            .setDescription(`${utenteBan.user.username}, sei stato bannato dal server **${message.guild.name}** da ${message.author.tag} per il seguente motivo: **${reason}**`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        utenteBan.send({embeds: [embed1]}).catch(() => { })
        setTimeout(() => {
            const embed2 = new Discord.MessageEmbed()
            .setColor(`#25a605`)
            .setTitle(`Riuscito!`)
            .setDescription(`${utenteBan} è stato bannato per il motivo: **${reason}**`)
            .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        message.reply({embeds: [embed2]})
        utenteBan.ban({ reason: reason })
        }, 1000);
    }
}