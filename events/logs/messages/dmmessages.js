const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (message.guild) return
        if (message.author.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        let textattachment = ``
        let i = 0
        message.attachments.forEach(attachment => {
            i++
            textattachment += `[File ${i}](${attachment.url})\n`
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`✉️ Nuovo DM ✉️`)
            .setDescription(`Messaggio da ${message.author.toString()}`)
            .addField(`📝 Contenuto:`, message.content ? message.content : `_Nessun Contenuto_`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`📂 Files:`, textattachment ? textattachment : `_Nessun File_`, true)
            .setColor(`YELLOW`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `User ID: ${message.author.id}` })
        client.channels.cache.get(config.idcanali.logs.messages.dm).send({ embeds: [embed] })
    }
}