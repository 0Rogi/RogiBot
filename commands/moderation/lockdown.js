module.exports = {
    name: `lockdown`,
    description: `Attiva/Disattiva il sistema di lockdown (blocco del server)`,
    execute(message) {
        if(!message.member.permissions.has(`MANAGE_MESSAGES`)) return message.channel.send({embeds: [noperm]})
        const args = message.content.split(` `).slice(1);
        var lock = args.join(` `);
        if(!lock) return message.reply(`Inserisci on o off`)
        if(lock != `on` && lock != `off`) return message.reply(`Puoi inserire solo on e off`)
    if(lock == `on`) {
        var everyone = message.guild.roles.cache.find(r => r.name === `@everyone`);
        var fan = message.guild.roles.cache.find(r => r.id === config.idruoli.fan);
        everyone.setPermissions([`SEND_MESSAGES`, `EMBED_LINKS`, `READ_MESSAGE_HISTORY`, `CONNECT`, `USE_VAD`]);
        var lockdown = client.channels.cache.get(config.idcanali.lockdown);
        var testualeyt = client.channels.cache.get(config.idcanali.testualeyt)
        var passyoutuber =  message.guild.roles.cache.find(r => r.id === config.idruoli.passyoutuber);
        testualeyt.permissionOverwrites.edit(passyoutuber, {
            VIEW_CHANNEL: false,
        })
        lockdown.permissionOverwrites.edit(fan, {
            VIEW_CHANNEL: true,
        })
        const embed = new Discord.MessageEmbed()
            .setTitle(`LOCKDOWN`)
            .setColor(`RED`)
            .setDescription(`Sistema di lockdown attivato, nessun utente tranne i moderatori potranno vedere il server!`)
            .setFooter(`Moderatore: ` + message.author.tag)
        message.reply({embeds: [embed]})
    }
    if(lock == `off`) {
        var everyone = message.guild.roles.cache.find(r => r.name === `@everyone`);
        var fan = message.guild.roles.cache.find(r => r.id === config.idruoli.fan);
        everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`]);
        var lockdown = client.channels.cache.get(config.idcanali.lockdown);
        var testualeyt = client.channels.cache.get(config.idcanali.testualeyt)
        var passyoutuber =  message.guild.roles.cache.find(r => r.id === config.idruoli.passyoutuber);
        testualeyt.permissionOverwrites.edit(passyoutuber, {
            VIEW_CHANNEL: true,
        })
        lockdown.permissionOverwrites.edit(fan, {
            VIEW_CHANNEL: false,
        })
        const embed = new Discord.MessageEmbed()
            .setTitle(`LOCKDOWN`)
            .setColor(`GREEN`)
            .setDescription(`Sistema di lockdown disattivato, gli utenti possono ritornare nel server!`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        message.reply({embeds: [embed]})
    }
    }
}