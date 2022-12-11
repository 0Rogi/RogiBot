const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)
const setpermissions = require(`${process.cwd()}/functions/general/setpermissions.js`)

const checkspam = new Map()

module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (!message.guild) return
        if (!message.author || !message.member) return
        if (message.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return
        if (message.guild != config.idServer.idServer) return;
        if (message.member.roles.cache.has(config.idruoli.muted) || message.member.roles.cache.has(config.idruoli.tempmuted)) return;

        if (message.author.bot || message.member.permissions.has(`MANAGE_MESSAGES`) || message.member.permissions.has(`ADMINISTRATOR`)) return
        if (message.channel == config.idcanali.nsfw) return
        if (checkspam.has(message.author.id)) {
            let user = checkspam.get(message.author.id)
            if (message.createdTimestamp - user.lastmsg <= 4000 && message.channel.rateLimitPerUser <= 2 || message.createdTimestamp - user.lastmsg <= 7000 && message.channel.rateLimitPerUser > 2) {
                if (user.msg >= 5) {
                    setpermissions()
                    database.collection(`UserStats`).find({ id: message.author.id }).toArray(function (err, result) {
                        if (!result[0]) {
                            database.collection(`UserStats`).insertOne({
                                username: message.author.username, id: message.author.id, roles: message.member._roles, moderation: {
                                    type: `tempmuted`,
                                    moderator: client.user.id,
                                    reason: `Rilevazione Spam`,
                                    time: 1000 * 60 * 10
                                },
                                leavedAt: 0,
                                levelling: {}
                            })
                            message.member.roles.add(config.idruoli.tempmuted)
                        }
                        if (result[0]) {
                            database.collection(`UserStats`).updateOne({ id: message.author.id }, {
                                $set: {
                                    moderation: {
                                        type: `tempmuted`,
                                        moderator: client.user.id,
                                        reason: `Rilevazione Spam`,
                                        time: 1000 * 60 * 10
                                    }
                                }
                            })
                        }
                    })
                    message.member.roles.add(config.idruoli.tempmuted)
                    let embed = new Discord.MessageEmbed()
                        .setAuthor({ name: `[TEMPMUTE] ${message.member.user.tag}`, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                        .setThumbnail(config.images.rogimute)
                        .setColor(`PURPLE`)
                        .addField(`👤 Utente:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.member.toString()}||`)
                        .addField(`⏰ Tempo:`, `10 minuti`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`📖 Motivo:`, `Rilevazione Spam`, true)
                    let embed2 = new Discord.MessageEmbed()
                        .setTitle(`⌨️ Spam Rilevato ⌨️`)
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`💬 Canale:`, `${message.channel}`)
                        .addField(`👤 Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                        .setColor(`RED`)
                        .setThumbnail(message.author.avatarURL({ dynamic: true }))
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle(`Calmati...`)
                        .setDescription(`È stato rilevato uno **spam** da parte tua in ${message.guild.name}\n\nPrenditi una pausa di 10 minuti 😄`)
                        .setColor(`RED`)
                    let embed4 = new Discord.MessageEmbed()
                        .setTitle(`🔇 TEMPMUTE 🔇`)
                        .setColor(`RED`)
                        .setThumbnail(message.member.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🔨 Moderatore:`, `Nome: **${client.user.username}**, ID: **${client.user.id}**\n||${client.user.toString()}||`)
                        .addField(`👤 Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.member.toString()}||`)
                        .addField(`⏰ Tempo:`, `10 minuti`)
                        .addField(`📖 Motivo:`, `Rilevazione Spam`)
                    message.channel.send({ embeds: [embed] })
                    message.author.send({ embeds: [embed3] }).catch(() => { })
                    client.channels.cache.get(config.idcanali.logs.moderation.spam).send({ embeds: [embed2] })
                    client.channels.cache.get(config.idcanali.logs.moderation.tempmute).send({ embeds: [embed4] })
                    client.channels.cache.get(config.idcanali.publiclogs).send({ embeds: [embed4] })
                    checkspam.delete(message.author.id)
                    return
                }
                checkspam.set(message.author.id, {
                    msg: user.msg + 1,
                    lastmsg: message.createdTimestamp
                })
                return
            }
        }
        checkspam.set(message.author.id, {
            msg: 1,
            lastmsg: message.createdTimestamp
        })
    }
}