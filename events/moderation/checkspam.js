module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.author.bot || message.member.roles.cache.has(config.idruoli.staff)) return
        if(checkspam.has(message.author.id)) {
            const data = checkspam.get(message.author.id)
            const { lastmsg, timer } = data;
            const diff = message.createdTimestamp - lastmsg.createdTimestamp;
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
                        .setTitle(`Spam Rilevato`)
                        .setColor(`RED`)
                        .setDescription(`È stato rilevato uno **spam** da parte di ${message.author} in ${message.channel}, l'utente è stato messo in timeout`)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true,
                            format: `png`,
                            size: 512
                        }))
                    let button = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Annulla Slowmode`)
                        .setCustomId(`AnnullaSlowmode`)
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    message.member.timeout(1000 * 60 * 10, `Rilevazione di Spam`)
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