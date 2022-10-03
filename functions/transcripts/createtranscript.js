const fetchAllMessages = require(`${process.cwd()}/functions/transcripts/fetchmessages.js`)
const moment = require(`moment`)

module.exports = async function createTranscript(channelId, messagesf) {
    let messages = messagesf || await fetchAllMessages(channelId)
    let transcript = ``

    messages.forEach(msg => {
        transcript += `@${msg.author.tag} - ${moment(msg.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)}:\n`
        if (msg.content) transcript += `Contenuto: ${msg.content}\n`
        if (msg.attachments.size > 0) {
            msg.attachments.forEach(attachment => {
                transcript += `File: ${attachment.name} (${attachment.url})\n`
            })
        }
        if (msg.embeds) {
            msg.embeds.forEach(embed => {
                transcript += `Embed:\n`
                if (embed.title) transcript += `Titolo: ${embed.title}\n`
                if (embed.description) transcript += `Descrizione: ${embed.description}\n`
                if (embed.fields) {
                    embed.fields.forEach(field => {
                        transcript += `Field: ${field.name} - ${field.value}\n`
                    })
                }
            })
        }
        if (msg.stickers.size > 0) {
            msg.stickers.forEach(sticker => {
                transcript += `Sticker: ${sticker.name} (${sticker.url})\n`
            })
        }

        transcript += `\n`
    })

    return transcript

}