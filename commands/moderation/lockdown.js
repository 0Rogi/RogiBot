module.exports = {
    name: `lockdown`,
    onlyHelpers: true,
    execute(message) {
        let args = message.content.split(` `).slice(1);
        let lock = args.join(` `);
        if(!lock) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Errore`)
            .setDescription(`*Inserisci on o off\n\`!lockdown on/off\`*`)
            .setThumbnail(config.images.rogierror)
            .setColor(`RED`)
        message.reply({embeds: [embed]})
        return
        }
        if(lock != `on` && lock != `off`) {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Errore`)
            .setDescription(`*Inserisci on o off\n\`!lockdown on/off\`*`)
            .setThumbnail(config.images.rogierror)
            .setColor(`RED`)
        message.reply({embeds: [embed]})
        return
        }
        if(lock == `on`) {
        let everyone = message.guild.roles.cache.find(r => r.name === `@everyone`);
        let fan = message.guild.roles.cache.find(r => r.id === config.idruoli.fan);
        everyone.setPermissions([`SEND_MESSAGES`, `EMBED_LINKS`, `READ_MESSAGE_HISTORY`, `CONNECT`, `USE_VAD`]);
        let lockdown = client.channels.cache.get(config.idcanali.lockdown);
        let testualeyt = client.channels.cache.get(config.idcanali.testualeyt)
        let passyoutuber =  message.guild.roles.cache.find(r => r.id === config.idruoli.passyoutuber);
        testualeyt.permissionOverwrites.edit(passyoutuber, {
            VIEW_CHANNEL: false,
        })
        lockdown.permissionOverwrites.edit(fan, {
            VIEW_CHANNEL: true,
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`Lockdown`)
            .setDescription(`È appena stato attivato il sistema di lockdown!\n**NESSUN UTENTE** tranne gli staffer potranno vedere i canali`)
            .setColor(`GREEN`)
            .setThumbnail(config.images.rogilockdownon)
        message.reply({embeds: [embed]})
        let embedlog = new Discord.MessageEmbed()
                .setTitle(`💀LOCKDOWN💀`)
                .setColor(`RED`)
                .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`💀Stato del lockdown:`, `🟢Attivo`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
        let channel = client.channels.cache.get(config.idcanali.logs.moderation)
        channel.send({embeds: [embedlog]})

    }
    if(lock == `off`) {
        let everyone = message.guild.roles.cache.find(r => r.name === `@everyone`);
        let fan = message.guild.roles.cache.find(r => r.id === config.idruoli.fan);
        everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`]);
        let lockdown = client.channels.cache.get(config.idcanali.lockdown);
        let testualeyt = client.channels.cache.get(config.idcanali.testualeyt)
        let passyoutuber =  message.guild.roles.cache.find(r => r.id === config.idruoli.passyoutuber);
        testualeyt.permissionOverwrites.edit(passyoutuber, {
            VIEW_CHANNEL: true,
        })
        lockdown.permissionOverwrites.edit(fan, {
            VIEW_CHANNEL: false,
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`Lockdown`)
            .setDescription(`È appena stato disattivato il sistema di lockdown!\n**TUTTI GLI UTENTI** potranno rivedere i canali`)
            .setColor(`GREEN`)
            .setThumbnail(config.images.rogilockdownoff)
        message.reply({embeds: [embed]})
        let embedlog = new Discord.MessageEmbed()
                .setTitle(`💀LOCKDOWN💀`)
                .setColor(`GREEN`)
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