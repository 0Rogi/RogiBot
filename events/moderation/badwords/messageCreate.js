const moment = require(`moment`)
const badwords = require(`${process.cwd()}/JSON/badwords.json`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    async execute(message) {
        if (!message.guild) return
        if (!message.author || !message.member) return
        if (message.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.author.bot || message.member.roles.cache.has(config.idruoli.staff) || message.member.permissions.has(`ADMINISTRATOR`)) return

        let content = message.content

        content = content.replace(/\*/g, "\*")
        content = content.replace(/\\/g, "")

        let found = false;
        let dm = true;
        let censored = content;
        let notcensored = content;

        badwords.forEach(badword => {
            if (content.toLowerCase().includes(badword.toLowerCase())) {
                found = true;
                notcensored = notcensored.replace(eval(`/${badword}/g`), `**${badword}**`)
                sides = Math.floor(Math.floor(badword.length) / 3);
                censoredword = badword.slice(0, -1 * (badword.length - sides)) + '#'.repeat(badword.length - sides - sides) + badword.slice(badword.length - sides)
                censored = censored.replace(eval(`/${badword}/g`), `**${censoredword}**`)
            }
        })

        if (found) {
            message.delete().catch(() => { })
            let embed = new Discord.MessageEmbed()
                .setTitle(`🤬Parola non consentita🤬`)
                .setDescription(`Hai detto una **parola non consentita**.\n\nIl tuo messaggio: ${notcensored}`)
                .setColor(`RED`)
            let embed2 = new Discord.MessageEmbed()
                .setAuthor({ name: message.author.username, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(censored)
                .setColor(`DARK_PURPLE`)
            let embed3 = new Discord.MessageEmbed()
                .setTitle(`🤬BAD WORD🤬`)
                .setColor(`RED`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`💬Messaggio:`, notcensored.toString())
                .addField(`💬Canale:`, message.channel.toString())
            await message.author.send({ embeds: [embed] }).catch(() => { dm = false })
            if (dm == false) embed3.setDescription(`⚠️L'utente **non** è stato avvisato nei dm⚠️`)
            client.channels.cache.get(config.idcanali.logs.moderation.badwords).send({ embeds: [embed3] })
            if (notcensored.toLowerCase().includes(`madonna`) || notcensored.toLowerCase().includes(`dio`)) {
                embed.setDescription(`Hai detto una **parola non consentita**. Sei stato messo in timeout per **10 minuti**.\n\nIl tuo messaggio: ${notcensored}`)
                message.member.timeout(1000 * 60 * 10, `Bestemmia Rilevata`)
            }
            message.channel.send({ embeds: [embed2] })
        }
    }
}