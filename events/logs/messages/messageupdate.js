const moment = require(`moment`)

module.exports = {
    name: `messageUpdate`,
    execute(oldMessage, newMessage) {
        if(!oldMessage || !oldMessage.guild || oldMessage.guild != config.idServer.idServer) return
        if(!oldMessage.author || !newMessage || !oldMessage.guild) return
        if(oldMessage.author?.bot || oldMessage.guild != config.idServer.idServer) return
        let channel = client.channels.cache.get(config.idcanali.logs.message)
        let oldtextembed = ``
        if(oldMessage.embeds[0]) {
            if(oldMessage.embeds[0].title) {
                oldtextembed += `Titolo: ${oldMessage.embeds[0].title}\n`
            } else {
                oldtextembed += `Titolo: _Nessun Titolo_\n`
            }
            if(oldMessage.embeds[0].description) {
                oldtextembed += `Descrizione: ${oldMessage.embeds[0].description}\n`
            } else {
                oldtextembed += `Descrizione: _Nessuna Descrizione_\n`
            }
            if(oldMessage.embeds[0].footer) {
                oldtextembed += `Footer: ${oldMessage.embeds[0].footer}`
            } else {
                oldtextembed += `Footer: _Nessun Footer_\n`
            }
            if(oldMessage.embeds[0].fields[0]) {
                oldMessage.embeds[0].fields.forEach(field => {
                    oldtextembed += `Field: ${field.name} - ${field.value.replace(/\`/g, "\\`")}\n`
                })
            }
        }
        let oldtextattachment = ``
        let i = 0
        oldMessage.attachments.forEach(attachment => {
            i++
            oldtextattachment += `[File ${i}](${attachment.url})\n`
        })
        let newtextembed = ``
        if(newMessage.embeds[0]) {
            if(newMessage.embeds[0].title) {
                newtextembed += `Titolo: ${newMessage.embeds[0].title}\n`
            } else {
                newtextembed += `Titolo: _Nessun Titolo_\n`
            }
            if(newMessage.embeds[0].description) {
                newtextembed += `Descrizione: ${newMessage.embeds[0].description}\n`
            } else {
                newtextembed += `Descrizione: _Nessuna Descrizione_\n`
            }
            if(newMessage.embeds[0].footer) {
                newtextembed += `Footer: ${newMessage.embeds[0].footer}`
            } else {
                newtextembed += `Footer: _Nessun Footer_\n`
            }
            if(newMessage.embeds[0].fields[0]) {
                newMessage.embeds[0].fields.forEach(field => {
                    newtextembed += `Field: ${field.name} - ${field.value.replace(/\`/g, "\\`")}\n`
                })
            }
        }
        let newtextattachment = ``
        i = 0
        newMessage.attachments.forEach(attachment => {
            i++
            newtextattachment += `[File ${i}](${attachment.url})\n`
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(`📝Messaggio Modificato📝`)
            .setDescription(`[Message link](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`💬Canale:`, `${oldMessage.channel}`) 
            .addField(`👤Utente:`, `Nome: **${oldMessage.author.username}**, ID: **${oldMessage.author.id}**`)
            .addField(`🖊️Vecchio Contenuto:`, oldMessage.content.toString() ? (oldMessage.content.length > 500 ? `${oldMessage.content.slice(0, 497)}...` : oldMessage.content.toString()) : `_Nessun Contenuto_`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`🖊️Nuovo Contenuto:`, newMessage.content.toString() ? (newMessage.content.length > 500 ? `${newMessage.content.slice(0, 497)}...` : newMessage.content.toString()) : `_Nessun Contenuto_`, true)
            .addField(`🔗Vecchio Embed:`, oldtextembed ? oldtextembed : `_Nessun Embed_`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`🔗Nuovo Embed:`, newtextembed ? newtextembed : `_Nessun Embed_`, true)
            .addField(`📁Vecchi File:`, oldtextattachment ? oldtextattachment : `_Nessun File_`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`📁Nuovi File:`, newtextattachment ? newtextattachment : `_Nessun File_`, true)
            .setThumbnail(oldMessage.author.displayAvatarURL({
                dynamic: true,
                format: `png`,
                size: 512
            }))
            .setColor(`YELLOW`)
        channel.send({embeds: [embed]})
    }
}