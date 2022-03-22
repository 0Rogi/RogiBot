module.exports = {
    name: `messageUpdate`,
    async execute(oldMessage, message) {
        if(message.author.bot || message.member.roles.cache.has(config.idruoli.staff) || message.guild != config.idServer.idServer) return
        let trovata = false
        let censurato = message.content.toLowerCase()

        parolacce.forEach(parola => {
            if (message.content.toLowerCase().includes(parola.toLowerCase())) {
                trovata = true
                censurato = censurato.replace(eval(`/${parola}/g`), "###")
            }
        })

        if (trovata) {
            let bestemmia = false
            bestemmie.forEach(parola => {
                if (message.content.toLowerCase().includes(parola.toLowerCase())) {
                    bestemmia = true
                }
            })
            //* Se viene trovata anche una bestemmia
            if(bestemmia) {
                let dm = true
                message.delete()
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🤬BESTEMMIA🤬`)
                    .setColor(`RED`)
                    .setDescription(censurato.toString())
                    .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                    .setFooter({text: `User ID: ${message.author.id}`})
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
                return
            }
            //* Se viene trovata usoltanto una parolaccia
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
                    .setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL()})
                    .setFooter({text: `User ID: ${message.author.id}`})
                    .setDescription(censurato.toString())
             await message.author.send({embeds: [embed2]}).catch(() => { dm = false })
            if(dm == false) embed.setDescription(`⚠️L'utente **non** è stato avvisato nei dm⚠️`)
            let log = client.channels.cache.get(config.idcanali.logs.moderation)
            log.send({embeds: [embed]})
            message.channel.send({embeds: [embed3]})
        }
    }
}