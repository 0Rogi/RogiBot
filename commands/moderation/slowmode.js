module.exports = {
    name: `slowmode`,
    FromMods: true,
    async execute(message) {
        let time = message.content.split(/\s+/)[1];
        if (!time) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un tempo valido\n\`!slowmode [tempo]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }

        if (time != `off` && time != 0) {
            time = ms(time)

            if (!time) {    
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Inserisci un tempo valido\n\`!slowmode [tempo]\`*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                message.reply({embeds: [embed]})
                return
            }
            if (time > 21600000) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Puoi impostare un massimo di 6 ore di slowmode\n\`!slowmode [tempo]\`*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                message.reply({embeds: [embed]})
                return
            }
            if (time < 1 * 1000) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Puoi impostare un minimo di 1 secondo di slowmode\n\`!slowmode [tempo]\`*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                message.reply({embeds: [embed]})
                return
            }
        }

        if (time == `off` || time == `no` || time == 0)
            time = 0

        message.channel.setRateLimitPerUser(parseInt(time) / 1000)
        let tempo = ms(time, { long: true });
            tempo = tempo + ` `
            tempo = tempo.replace(`second `, `secondo`)
            tempo = tempo.replace(`seconds`, `secondi`)
            tempo = tempo.replace(`minute `, `minuto `)
            tempo = tempo.replace(`minutes`, `minuti`)
            tempo = tempo.replace(`hour `, `ora `)
            tempo = tempo.replace(`hours`, `ore`)
        let embed = new Discord.MessageEmbed()
            .setAuthor({name: `[SLOWMODE] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setThumbnail(config.images.rogislowmode)
            .setColor(`PURPLE`)
            .addField(`Canale:`, `Nome: ${message.channel.name}, ID: ${message.channel.id}\n||${message.channel.toString()}||`)
        let notime = false
        if (time == 0) {
            embed.addField(`Nuova Slowmode:`,`_Slowmode disattivata_`)
            notime = true
        }
        else {
            embed.addField(`Nuova Slowmode:`, `${tempo}`)
        }
        let embedlog = new Discord.MessageEmbed()
                .setTitle(`⛓️SLOWMODE⛓️`)
                .setColor(`YELLOW`)
                .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`Stanza:`, message.channel.toString())
                .addField(`Nuova Slowmode:`, notime ? `_Slowmode disattivata_` : tempo.toString())
        let channel = client.channels.cache.get(config.idcanali.logs.moderation)
        channel.send({embeds: [embedlog]})
        message.reply({embeds: [embed]})
    }
}