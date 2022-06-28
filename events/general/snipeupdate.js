const config = require(`${process.cwd()}/JSON/config.json`)
const badwords = require(`${process.cwd()}/JSON/badwords.json`)

module.exports = {
    name: `messageDelete`,
    async execute(message) {
        if (!message.guild) return
        if (message.guild != config.idServer.idServer) return
        if (!message.author) return
        if (!message.member) return
        if (message.author.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        let update = true
        if (message.channel.parent == config.idcanali.staffparent) update = false
        await badwords.forEach(b => {
            if (message.content.toLowerCase().includes(b)) update = false
        })
        if (!update) return
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