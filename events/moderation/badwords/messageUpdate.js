const moment = require(`moment`)
const badwords = require(`${process.cwd()}/JSON/badwords.json`)
const config = require(`${process.cwd()}/JSON/config.json`)
const setpermissions = require(`${process.cwd()}/functions/general/setpermissions.js`)
const adduser = require(`${process.cwd()}/functions/database/adduser.js`)

module.exports = {
    name: `messageUpdate`,
    async execute(oldMessage, message) {
        if (!message.guild) return
        if (!message.author || !message.member) return
        if (message.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.author.bot || message.member.roles.cache.has(config.idruoli.staff)) return

        let content = message.content.toLowerCase()
        content = content.replace(/\_/g, "")
        content = content.replace(/\*/g, "")
        content = content.replace(/\`/g, "")
        content = content.replace(/\~\~/g, "")
        content = content.replace(/\|\|/g, "")
        let found = false
        let dm = true
        let censored = content
        let notcensored = content

        badwords.forEach(badword => {
            if (content.includes(badword)) {
                found = true;
                notcensored = notcensored.replace(eval(`/${badword}/g`), `**${badword}**`)
                let sides = Math.floor(Math.floor(badword.length) / 3);
                let censoredword = badword.slice(0, -1 * (badword.length - sides)) + '#'.repeat(badword.length - sides - sides) + badword.slice(badword.length - sides)
                censored = censored.replace(eval(`/${badword}/g`), `**${censoredword}**`)
            }
        })

        if (found) {
            message.delete().catch(() => { })
            let embed = new Discord.MessageEmbed()
                .setTitle(`🤬 Parola non consentita 🤬`)
                .setDescription(`Hai detto una **parola non consentita**.\n\nIl tuo messaggio: ${notcensored}`)
                .setColor(`RED`)
            let embed2 = new Discord.MessageEmbed()
                .setAuthor({ name: message.author.username, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(censored)
                .setColor(`DARK_PURPLE`)
            let embed3 = new Discord.MessageEmbed()
                .setTitle(`🤬 BAD WORD 🤬`)
                .setColor(`RED`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤 Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`💬 Messaggio:`, notcensored.toString())
                .addField(`💬 Canale:`, message.channel.toString())
            await message.author.send({ embeds: [embed] }).catch(() => { dm = false })
            if (dm == false) embed3.setDescription(`⚠️ L'utente **non** è stato avvisato nei dm ⚠️`)
            client.channels.cache.get(config.idcanali.logs.moderation.badwords).send({ embeds: [embed3] })
            if (notcensored.toLowerCase().includes(`madonna`) || notcensored.toLowerCase().includes(`dio`)) {
                embed.setDescription(`Hai detto una **parola non consentita**. Sei stato mutato per **10 minuti**.\n\nIl tuo messaggio: ${notcensored}`)

                setpermissions()
                message.member.roles.add(config.idruoli.tempmuted)

                let embedlog = new Discord.MessageEmbed()
                    .setAuthor({ name: `[TEMPMUTE] ${message.member.user.tag}`, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(config.images.rogimute)
                    .setColor(`PURPLE`)
                    .addField(`👤 Utente:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.member.toString()}||`)
                    .addField(`⏰ Tempo:`, `10 minuti`, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`📖 Motivo:`, `Bestemmia`, true)
                client.channels.cache.get(config.idcanali.logs.moderation.tempmute).send({ embeds: [embedlog] })

                database.collection(`users`).find({ id: message.author.id }).toArray(function (err, result) {
                    if (!result[0]) {
                        adduser(message.member)
                    }
                    database.collection(`users`).updateOne({ id: message.author.id }, {
                        $set: {
                            moderation: {
                                type: `tempmuted`,
                                moderator: client.user.id,
                                reason: `Bestemmia`,
                                time: 1000 * 60 * 10
                            }
                        }
                    })
                })
            }
            message.channel.send({ embeds: [embed2] })
        }
    }
}