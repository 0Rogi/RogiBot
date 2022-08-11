const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    execute(message) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        if (message.embeds[0]?.type == `auto_moderation_message`) {
            let channel;
            let keyword;
            let content = message.embeds[0]?.description
            console.log(message.embeds[0]?.fields)
            message.embeds[0]?.fields?.forEach(f => {
                if (f.name == `channel_id`) {
                    channel = f.value
                }
                if (f.name == `keyword_matched_content`) {
                    keyword = f.value
                }
                if (f.name == `rule_name` && f.value == `Bestemmie`) {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor({ name: `[TEMPMUTE] ${message.author.tag}`, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                        .setThumbnail(config.images.rogimute)
                        .setColor(`PURPLE`)
                        .addField(`👤 Utente:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.author.toString()}||`)
                        .addField(`⏰ Tempo:`, `10 minuti`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`📖 Motivo:`, `Bestemmia`, true)
                    client.channels.cache.get(channel).send({ embeds: [embed] })
                    message.member.roles.add(config.idruoli.tempmuted)
                    database.collection(`UserStats`).find({ id: message.author.id }).toArray(function (err, result) {
                        if (!result[0]) {
                            database.collection(`UserStats`).insertOne({
                                username: message.author.username, id: message.author.id, roles: message.member._roles, moderation: {
                                    type: `tempmuted`,
                                    moderator: client.user.id,
                                    reason: `Bestemmia`,
                                    time: 1000 * 60 * 60 * 60
                                },
                                leavedAt: 0
                            })
                            guildmember.roles.add(config.idruoli.tempmuted)
                        }
                        if (result[0]) {
                            database.collection(`UserStats`).updateOne({ id: message.author.id }, {
                                $set: {
                                    moderation: {
                                        type: `tempmuted`,
                                        moderator: client.user.id,
                                        reason: `Bestemmia`,
                                        time: 1000 * 60 * 10
                                    }
                                }
                            })
                        }
                    })
                }
            })

            let embed = new Discord.MessageEmbed()
                .setTitle(`🤬 BAD WORD 🤬`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤 Utente:`, `Nome: **${message.author.username}** - ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`⚓ Canale:`, `<#${channel}>`)
                .addField(`🔒 Parola Bloccata:`, keyword, true)
                .addField(`💬 Messaggio:`, content, true)
                .setColor(`RED`)
                .setThumbnail(message.member.displayAvatarURL({ dynamic: true }))
            client.channels.cache.get(config.idcanali.logs.moderation.badwords).send({ embeds: [embed] })
            // message.delete()
        }
    }
}