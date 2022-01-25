module.exports = {
    name: `messageCreate`,
    async execute(message) {
        if(message.author.bot) return
        let parolacciatrovata = false
        let bestemmiatrovata = false
        let censurato = ``
        parolacce.forEach(parola => {
            if(message.content.toLowerCase().includes(parola)) {
                var aiLatiDaNonCensurare = Math.floor(Math.floor(parola.length) / 3);
                var parolaCensurata = parola.slice(0, -1 * (parola.length - aiLatiDaNonCensurare)) + '#'.repeat(parola.length - aiLatiDaNonCensurare - aiLatiDaNonCensurare) + parola.slice(parola.length - aiLatiDaNonCensurare)
                censurato = message.content.replace(eval(`/${parola}/g`), `**${parolaCensurata}**`)
                messaggio = message.content.replace(eval(`/${parola}/g`), `###`)
                parolacciatrovata = true
            }
        })
        bestemmie.forEach(bestemmia => {
            if(message.content.toLowerCase().includes(bestemmia)) {
                bestemmiatrovata = true
                censurato = message.content.replace(eval(`/${bestemmia}/g`), "*Dio bravo*")
            }
        })
        if(parolacciatrovata) {
            global.test = false
            message.delete()
                let dm = true
                let embed = new Discord.MessageEmbed()
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
                    .addField(`💬Messaggio:`, message.content.toString())
                    .addField(`💬Canale:`, message.channel.toString())
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`MODERA IL LINGUAGGIO`)
                    .setDescription(`Hai detto una parolaccia in ${message.guild.name}, modera il linguaggio, il tuo messaggio: **${message.content}**`)
                    .setColor(`RED`)
                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`🤬BAD WORD🤬`)
                    .setColor(`RED`)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true,
                        format: `png`,
                        size: 512
                    }))
                    .setDescription(censurato.toString())
             await message.author.send({embeds: [embed2]}).catch(() => { dm = false })
            if(dm == false) embed.setDescription(`⚠️L'utente **non** è stato avvisato nei dm⚠️`)
            let log = client.channels.cache.get(config.idcanali.logs.moderation)
            log.send({embeds: [embed]})
            message.channel.send({embeds: [embed3]})
        }
        if(bestemmiatrovata) {
            global.test = false
            let dm = true
            message.delete()
            let embed = new Discord.MessageEmbed()
                .setTitle(`🤬BESTEMMIA🤬`)
                .setColor(`RED`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .setDescription(censurato.toString())
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`MODERA IL LINGUAGGIO`)
                .setDescription(`Hai bestemmiato in ${message.guild.name}, modera il linguaggio, il tuo messaggio: **${message.content}**`)
                .setColor(`RED`)
            let embed3 = new Discord.MessageEmbed()
                .setTitle(`🤬BESTEMMIA🤬`)
                .setColor(`RED`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️\nL'utente è stato messo in timeout per 5 minuti`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`💬Messaggio:`, message.content.toString())
                .addField(`💬Canale:`, message.channel.toString())
            await message.author.send({embeds: [embed2]}).catch(() => { dm = false })
            if(dm == false) embed3.setDescription(`⚠️L'utente **non** è stato avvisato nei dm⚠️\nL'utente è stato messo in timeout per 5 minuti`)
            let log = client.channels.cache.get(config.idcanali.logs.moderation)
            log.send({embeds: [embed3]})
            message.channel.send({embeds: [embed]})
            message.member.timeout(1000 * 60 * 5, "Bestemmie")
        }
    }
}