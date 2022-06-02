module.exports = {
    name: `messageDelete`,
    execute(message) {
        if (!message.guild) return
        if (!message.author) return
        if (!message.member) return
        if (message.author.bot) return
        let delmessage = ``
        if (message.content) delmessage += `${message.content.slice(0, 500)}`
        if (message.attachments) {
            let i = 0
            message.attachments.forEach(attachment => {
                i++
                delmessage += `\n[File ${i}](${attachment.url})\n`
            })
        }
        database.collection(`ServerStats`).updateOne({}, {
            $set: {
                snipe: {
                    message: delmessage,
                    author: message.author.id,
                    channel: message.channel.id,
                    cleared: false
                }
            }
        })
    }
}