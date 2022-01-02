module.exports = {
    name: `lockdown`,
    description: `Attiva/Disattiva il sistema di lockdown (blocco del server)`,
    onlyHelpers: true,
    execute(message) {
        const args = message.content.split(` `).slice(1);
        var lock = args.join(` `);
        if(!lock) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Errore`)
            .setDescription(`:x: Inserisci on o off`)
            .setColor(`RED`)
        message.reply({embeds: [embed]})
        return
        }
        if(lock != `on` && lock != `off`) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Errore`)
            .setDescription(`:x: Puoi inserire solo on o off`)
            .setColor(`RED`)
        message.reply({embeds: [embed]})
        return
        }
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
        let embed = new Discord.MessageEmbed()
            .setTItle(`Lockdown`)
            .setDescription(`:white_check_mark: Sistema di lockdown attivato. Nessun utente tranne gli staffer, potranno vedere i canali`)
            .setColor(`GREEN`)
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
        let embed = new Discord.MessageEmbed()
            .setTItle(`Lockdown`)
            .setDescription(`:white_check_mark: Sistema di lockdown disattivato. Gli utenti potranno di nuovo vedere i canali`)
            .setColor(`GREEN`)
        message.reply({embeds: [embed]})
    }
    }
}