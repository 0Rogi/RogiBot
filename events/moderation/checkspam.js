module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.author.bot || message.member.roles.cache.has(config.idruoli.staff) || message.guild != config.idServer.idServer || message.channel.parent == config.idcanali.helpparent) return
        if(checkspam.has(message.author.id)) {
            let data = checkspam.get(message.author.id)
            let { lastmsg, timer } = data;
            let diff = message.createdTimestamp - lastmsg.createdTimestamp;
            let msgs = data.msgs
            if(diff > 5000) {
                clearTimeout(timer);
                data.msgs = 1;
                data.lastmsg = message;
                data.timer = setTimeout(() => {
                    checkspam.delete(message.author.id);
                }, 5000)
                checkspam.set(message.author.id, data)
            } else {
                ++msgs;
                if(parseInt(msgs) === 5) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Spam Rilevato`)
                        .setColor(`RED`)
                        .setDescription(`È stato rilevato uno **spam** da parte di ${message.author}, è stato messo in timeout per 10 minuti, lo slowmode di questo canale è stato impostato a 10 secondi`)
                        .setFooter({text: `User ID: ${message.author.id}`})
                    let embed2 = new Discord.MessageEmbed()
                        .setTitle(`⌨️Spam Rilevato⌨️`)
                        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`💬Canale:`, `${message.channel}`)
                        .addField(`👤Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                        .setColor(`RED`)
                        .setThumbnail(message.author.avatarURL({dynamic: true}))
                    let button = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Annulla Slowmode`)
                        .setCustomId(`AnnullaSlowmode`)
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle(`Calmati...`)
                        .setDescription(`È stato rilevato uno **spam** da parte tua in ${message.guild.name}\n\nPrenditi una pausa di 10 minuti 😄`)
                        .setColor(`RED`)
                    message.member.timeout(1000 * 60 * 10, `Rilevazione di Spam`)
                    message.author.send({embeds: [embed3]})
                    message.channel.setRateLimitPerUser(10)
                    message.channel.send({embeds: [embed], components: [row]})
                    client.channels.cache.get(config.idcanali.logs.moderation).send({embeds: [embed2]})
                } else {
                    data.msgs = msgs;
                    checkspam.set(message.author.id, data)
                }
            }
        } else {
            let remove = setTimeout(() => {
                checkspam.delete(message.author.id);
            }, 5000)
            checkspam.set(message.author.id, {
                msgs: 1,
                lastmsg: message,
                timer: remove
            })
        }
    }
}