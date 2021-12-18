module.exports = {
    name: `kick`,
    description: `Butta fuori un utente dal server`,
    execute(message) {
        if(!message.member.permissions.has(`KICK_MEMBERS`)){
            message.reply({embeds: [noperm]});
            return;
        }
        var utenteKick = message.mentions.members.first();
        var args = message.content.split(` `).slice(2);
        var reason = args.join(` `);
        if(!reason) reason = `Nessun Motivo`
        if(!utenteKick){
            var args = message.content.split(` `).slice(1)
            var id = args.join(` `)
            var server = client.guilds.cache.get(config.idServer.idServer)
            var utenteKick = server.members.cache.find(x => x.id == id)
            if(!utenteKick)  {
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
        if(!utenteKick.kickable) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`)
                .setDescription(`:x: **Non posso kickare quest'utente**`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                .setFooter(`Moderatore: ${message.author.tag}`)
            message.reply({embeds: [embed]});
            return;
        }
        const embed1 = new Discord.MessageEmbed()
            .setColor(`RED`)
            .setTitle(`Sei stato kickato!`)
            .setDescription(`${utenteKick.user.username}, sei stato kickato dal server **${message.guild.name}** da ${message.author.tag} per il seguente motivo: **${reason}**`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        utenteKick.send({embeds: [embed1]}).catch(() => { })
        setTimeout(() => {
            const embed2 = new Discord.MessageEmbed()
                .setColor(`#25a605`)
                .setTitle(`Riuscito!`)
                .setDescription(`${utenteKick} è stato kickato per il motivo: **${reason}**`)
                .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
                .setFooter(`Moderatore: ${message.author.tag}`)
        message.reply({embeds: [embed2]})
        utenteKick.kick({ reason: reason })
        }, 1000);
    }
}