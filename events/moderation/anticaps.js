const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `messageCreate`,
    execute(message) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (!message.guild || message.guild != config.idServer.idServer) return
        if (!message.author || !message.member) return
        if (message.member.permissions.has(`MANAGE_MESSAGES`) || message.member.roles.cache.has(config.rolesid.friend) || message.member.roles.cache.has(config.rolesid.vip) || message.author.bot) return
        if (!message.content) return
        if (message.content.length < 10) return

        let content = message.content
        let chars = Array.from(content)
        let uppercaseletter = 0

        chars.forEach(c => {
            let alphabet = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`, `u`, `v`, `w`, `x`, `y`, `z`]
            if (alphabet.some(x => c.toLowerCase().includes(x))) {
                if (c.toUpperCase() == c) uppercaseletter++
            }
        })

        let percentage = 100 * uppercaseletter / content.length

        if (percentage >= 71) {
            message.delete()
            message.member.timeout(1000 * 3, `Urla`).catch(() => { })

            let phrases = [`😌 Qualcuno ha bisogno di una camomilla <:chamomile:1008766551043887145>`, `A qualcuno piace proprio urlare 😡`, `Siamo dal pescivendolo? 🐟`, `Qualcuno ha perso il proprio controllo 🤬`, `${message.author.username}, immagina urlare 😳`]

            let embedDM = new Discord.MessageEmbed()
                .setTitle(`<:chamomile:1008766551043887145> Hai bisogno di una camomilla? <:chamomile:1008766551043887145>`)
                .setDescription(`Hey, **non urlare**, prenditi una bella camomilla <:chamomile:1008766551043887145> e poi torna a scrivere :)`)
                .setColor(`RED`)
            let embedGUILD = new Discord.MessageEmbed()
                .setTitle(`${phrases[Math.floor(Math.random() * phrases.length)]}`)
                .setDescription(`${message.author.toString()} ha **urlato** 😡:\n\n${content.length > 100 ? `${content.toString().toLowerCase().slice(1, 100)}...` : content.toString().toLowerCase()}`)
                .setColor(`YELLOW`)
            let embedLOG = new Discord.MessageEmbed()
                .setTitle(`😡 ANTI-CAPS 😡`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤 Utente:`, `Nome: **${message.author.username}** - ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`⚓ Canale:`, `${message.channel.toString()}`, true)
                .addField(`🔢 Percentuale CAPS`, `**${percentage.toString()}%**`, true)
                .addField(`💬 Messaggio:`, content)
                .setColor(`RED`)
                .setThumbnail(message.member.displayAvatarURL({ dynamic: true }))

            message.author.send({ embeds: [embedDM] }).catch(() => { })
            message.channel.send({ embeds: [embedGUILD] })
            client.channels.cache.get(config.channelsid.logs.moderation.anticaps).send({ embeds: [embedLOG] })

        }

    }
}