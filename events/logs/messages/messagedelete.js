module.exports = {
    name: `messageDelete`,
    execute(message) {
        if(!message || !message.author ||!message.guild || message.guild != config.idServer.idServer) return
        if(message.author?.bot ||message.channel == config.idcanali.thingstodo || message.channel == config.idcanali.suggests) return
        let channel = client.channels.cache.get(config.idcanali.logs.message)
        let textembed = ``
        if(message.embeds[0]) {
            if(message.embeds[0].title) {
                textembed += `Titolo: ${message.embeds[0].title}\n`
            } else {
                textembed += `Titolo: _Nessun Titolo_\n`
            }
            if(message.embeds[0].description) {
                textembed += `Descrizione: ${message.embeds[0].description}\n`
            } else {
                textembed += `Descrizione: _Nessuna Descrizione_\n`
            }
            if(message.embeds[0].footer) {
                textembed += `Footer: ${message.embeds[0].footer}`
            } else {
                textembed += `Footer: _Nessun Footer_\n`
            }
            if(message.embeds[0].fields[0]) {
                message.embeds[0].fields.forEach(field => {
                    textembed += `Field: ${field.name} - ${field.value.replace(/\`/g, "\\`")}\n`
                })
            }
        }
        let textattachment = ``
        let i = 0
        message.attachments.forEach(attachment => {
            i++
            textattachment += `[File ${i}](${attachment.url})\n`
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`🗑️Messaggio Eliminato🗑️`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`💬Canale:`, `${message.channel}`)
            .addField(`👤Utente:`, `Nome: **${message.author?.username}**, ID: **${message.author.id}**`)
            .addField(`🖊️Contenuto:`, message.content.toString() ? (message.content.length > 500 ? `${message.content.slice(0, 497)}...` : message.content.toString()) : `_Nessun Contenuto_`)
            .addField(`🔗Embed:`, textembed ? textembed : `_Nessun Embed_`)
            .addField(`📁File:`, textattachment ? textattachment : `_Nessun File_`)
            .setThumbnail(message.author.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .setColor(`RED`)
        channel.send({embeds: [embed]})
    }
}