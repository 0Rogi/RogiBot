const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    execute(message) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return
        if (message.guild != config.idServer.idServer) return;
        if (!message.member || !message.author) return;
        if (message.member.roles.cache.has(config.rolesid.muted) || message.member.roles.cache.has(config.rolesid.tempmuted)) return;

        if (message.embeds[0]?.type == `auto_moderation_message`) {
            let channel;
            let keyword;
            let content = message.embeds[0]?.description
            let bestemmia = false

            message.embeds[0]?.fields?.forEach(f => {
                if (f.name == `channel_id`) {
                    channel = f.value
                }
                if (f.name == `keyword_matched_content`) {
                    keyword = f.value
                }
                if (f.name == `rule_name` && f.value == `Bestemmie`) {
                    message.member.roles.add(config.rolesid.tempmuted)
                    database.collection(`UserStats`).find({ id: message.author.id }).toArray(function (err, result) {
                        if (!result[0]) {
                            database.collection(`UserStats`).insertOne({
                                username: message.author.username, id: message.author.id, roles: message.member._roles, moderation: {
                                    type: `tempmuted`,
                                    moderator: client.user.id,
                                    reason: `Bestemmia`,
                                    time: new Date().getTIme() + (1000 * 60 * 60 * 60)
                                },
                                leavedAt: 0,
                                levelling: {}
                            })
                            guildmember.roles.add(config.rolesid.tempmuted)
                        }
                        if (result[0]) {
                            database.collection(`UserStats`).updateOne({ id: message.author.id }, {
                                $set: {
                                    moderation: {
                                        type: `tempmuted`,
                                        moderator: client.user.id,
                                        reason: `Bestemmia`,
                                        time: new Date().getTime() + (1000 * 60 * 10)
                                    }
                                }
                            })
                        }
                    })
                    bestemmia = true
                }
            })
            if (bestemmia) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `[TEMPMUTE] @${message.author.username}`, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                    .setColor(`PURPLE`)
                    .addField(`👤 Utente:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.author.toString()}||`)
                    .addField(`⏰ Tempo:`, `10 minuti`, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`📖 Motivo:`, `Bestemmia`, true)
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`🔇 TEMPMUTE 🔇`)
                    .setColor(`RED`)
                    .setThumbnail(message.member.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${client.user.username}**, ID: **${client.user.id}**\n||${client.user.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.member.toString()}||`)
                    .addField(`⏰ Tempo:`, `10 minuti`)
                    .addField(`📖 Motivo:`, `Bestemmia`)
                const embedplogs = new Discord.MessageEmbed()
                    .setAuthor({ name: `[TEMPMUTE - BESTEMMIA] @${message.author.username} (10 minuti)`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor(`PURPLE`)
                client.channels.cache.get(config.channelsid.publiclogs).send({ embeds: [embedplogs] });
                client.channels.cache.get(config.channelsid.logs.moderation.tempmute).send({ embeds: [embed2] })
                client.channels.cache.get(channel).send({ embeds: [embed] })
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`🤬 BAD WORD 🤬`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤 Utente:`, `Nome: **${message.author.username}** - ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`⚓ Canale:`, `<#${channel}>`)
                .addField(`🔒 Parola Bloccata:`, keyword, true)
                .addField(`💬 Messaggio:`, content, true)
                .setColor(`RED`)
                .setThumbnail(message.member.displayAvatarURL({ dynamic: true }))
            client.channels.cache.get(config.channelsid.logs.moderation.badwords).send({ embeds: [embed] })
        }
    }
}