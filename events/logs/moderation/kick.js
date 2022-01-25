module.exports = {
    name: `guildMemberRemove`,
    async execute(kick) {
        let fetchedLogs = await kick.guild.fetchAuditLogs({
            limit: 1,
            type: `MEMBER_KICK`,
        })
        let logs = fetchedLogs.entries.first()
        if(!logs) return
        let {executor, target, reason} = logs
        if(executor.bot) return
        if(reason == `` || !reason) reason = `Nessun Motivo`
        let embed = new Discord.MessageEmbed()
            .setTitle(`🏓KICK MANUALE🏓`)
            .setColor(`RED`)
            .setThumbnail(target.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨Moderatore:`, `Nome: **${executor.username}**, ID: **${executor.id}**\n||${executor.toString()}||`)
            .addField(`👤Utente:`, `Nome: **${target.username}**, ID: **${target.id}**\n||${target.toString()}||`)
            .addField(`📖Motivo:`, reason)
        let log = client.channels.cache.get(config.idcanali.logs.moderation)
        log.send({embeds: [embed]})
    }
}