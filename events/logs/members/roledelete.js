const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `roleDelete`,
    async execute(role) {
        if (role.guild != config.idServer.idServer) return

        const fetchedLogs = await role.guild.fetchAuditLogs({
            limit: 1,
            type: `ROLE_DELETE`,
        })

        const logs = fetchedLogs.entries.first()

        const { executor } = logs

        if (executor.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(executor.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(executor.id)) return

        if (new Date().getTime() - logs.createdAt > 10000) return

        let embed = new Discord.MessageEmbed()
            .setTitle(`🗑️ Ruolo Eliminato 🗑️`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👥 Moderatore:`, executor.toString())
            .addField(`👔 Ruolo:`, role.name)
            .addField(`✏️ Colore:`, `${role.color}`)
            .addField(`🔢 Posizione:`, `${role.rawPosition}`)
            .setColor(`RED`)

        if (role.permissions.has(`ADMINISTRATOR`)) {
            embed.addField(`🚫 Permessi:`, `👑 Amministratore`)
        } else {
            let permissions = [`CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `ADMINISTRATOR`, `MANAGE_CHANNELS`, `MANAGE_GUILD`, `ADD_REACTIONS`, `VIEW_AUDIT_LOG`, `PRIORITY_SPEAKER`, `STREAM`, `VIEW_CHANNEL`, `SEND_MESSAGES`, `SEND_TTS_MESSAGES`, `MANAGE_MESSAGES`, `EMBED_LINKS`, `ATTACH_FILES`, `READ_MESSAGE_HISTORY`, `MENTION_EVERYONE`, `USE_EXTERNAL_EMOJIS`, `VIEW_GUILD_INSIGHTS`, `CONNECT`, `SPEAK`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `USE_VAD`, `CHANGE_NICKNAME`, `MANAGE_NICKNAMES`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGE_EMOJIS_AND_STICKERS`, `USE_APPLICATION_COMMANDS`, `REQUEST_TO_SPEAK`, `MANAGE_EVENTS`, `MANAGE_THREADS`, `USE_PUBLIC_THREADS`, `CREATE_PUBLIC_THREADS`, `USE_PRIVATE_THREADS`, `CREATE_PRIVATE_THREADS`, `USE_EXTERNAL_STICKERS`, `SEND_MESSAGES_IN_THREADS`, `START_EMBEDDED_ACTIVITIES`, `MODERATE_MEMBERS`]
            let text = ``
            await permissions.forEach(perm => {
                if (role.permissions.has(perm)) {
                    text += `${perm}\n`
                }
            })
            if (text.length > 1024) text = `${text.split(0, 1024)}...`
            if (!text) text = `_Nessun Permesso_`
            embed.addField(`💪🏼 Permessi:`, `${text}`)
        }

        client.channels.cache.get(config.idcanali.logs.members.roles).send({ embeds: [embed] })
    }
}