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
            .setTitle(`Lockdown`)
            .setDescription(`:white_check_mark: Sistema di lockdown attivato. Nessun utente tranne gli staffer, potranno vedere i canali`)
            .setColor(`GREEN`)
        message.reply({embeds: [embed]})
        let embedlog = new Discord.MessageEmbed()
                .setTitle(`💀LOCKDOWN💀`)
                .setColor(`RED`)
                .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`💀Stato del lockdown:`, `🟢Attivo`)
        let channel = client.channels.cache.get(config.idcanali.logs.moderation)
        channel.send({embeds: [embedlog]})

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
            .setTitle(`Lockdown`)
            .setDescription(`:white_check_mark: Sistema di lockdown disattivato. Gli utenti potranno di nuovo vedere i canali`)
            .setColor(`GREEN`)
        message.reply({embeds: [embed]})
        let embedlog = new Discord.MessageEmbed()
                .setTitle(`💀LOCKDOWN💀`)
                .setColor(`RED`)
                .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`💀Stato del lockdown:`, `🔴Disattivo`)
        let channel = client.channels.cache.get(config.idcanali.logs.moderation)
        channel.send({embeds: [embedlog]})
    }
    }
}