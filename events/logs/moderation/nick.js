module.exports = {
    name: `guildMemberUpdate`,
    async execute(oldMember, newMember) {
        if(!oldMember.nickname && newMember.nickname || oldMember.nickname && !newMember.nickname || newMember.nickname && oldMember.nickname != newMember.nickname )
       { const fetchedLogs = await newMember.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_UPDATE',
        })
        const logs = fetchedLogs.entries.first()
        let { executor, target } = logs
        if(executor == target || executor.bot) return
        let embedutente = new Discord.MessageEmbed()
            .setTitle(`Nome Inserito!`)
            .setThumbnail(target.displayAvatarURL({dynamic: true, size: 512}))
            .setColor(`RED`)
            .addField(`Inserito da:`, executor.toString(), true)
            .addField(`Inserito in:`, newMember.guild.name, true)
            .addField(`Nuovo Nick:`, newMember.nickname ? newMember.nickname.toString() : `_Resettato_`)
        let dm = true
        await newMember.send({embeds: [embedutente]}).catch(() => { dm = false })
        let embed = new Discord.MessageEmbed()
            .setTitle(`🖊️NICK MODIFICATO MANUALMENTE🖊️`)
            .setColor(`YELLOW`)
            .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️`)
            .setThumbnail(target.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨Moderatore:`, `Nome: **${executor.username}**, ID: **${executor.id}**\n||${executor.toString()}||`)
            .addField(`👤Utente:`, `Nome: **${target.username}**, ID: **${target.id}**\n||${target.toString()}||`)
            .addField(`📘Vecchio Nick:`, oldMember.nickname ? oldMember.nickname.toString() : oldMember.user.username, true)
            .addField(`📖Nuovo Nick:`, newMember.nickname ? newMember.nickname.toString() : `_Resettato_`, true)
        if(dm == false) embed.setDescription(`⚠️L'utente **non** è stato avvisato nei dm⚠️`)
        let log = client.channels.cache.get(config.idcanali.logs.moderation)
        log.send({embeds: [embed]})}
    }
}