const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)
const setpermissions = require(`${process.cwd()}/functions/general/setpermissions.js`)

module.exports = {
    name: `mute`,
    data: {
        name: `mute`,
        description: `Muta un utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente da mutare`,
                type: `USER`,
                required: true
            },
            {
                name: `motivo`,
                description: `Motivo del mute`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 2,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let user = interaction.options.getUser(`utente`)
            let guildmember = await interaction.guild.members.cache.find(x => x.id == user.id)
            if (!guildmember) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            if (guildmember && guildmember.roles.cache.has(config.idruoli.staff) && !interaction.member.roles.cache.has(config.idruoli.owner)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*${guildmember} è uno staffer, non posso mutarlo*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            setpermissions()
            database.collection(`UserStats`).find({ id: user.id }).toArray(async function (err, result) {
                if (result[0]) {
                    if (result[0].moderation.type != null) {
                        switch (result[0].moderation.type) {
                            case `tempmuted`: {
                                result[0].moderation.type = `tempmutato`
                            } break
                            case `muted`: {
                                result[0].moderation.type = `mutato`
                            } break
                            case `banned`: {
                                result[0].moderation.type = `bannato`
                            } break
                        }
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Questo utente ha già uno stato di moderazione!`)
                            .setDescription(`Quest'utente è già **${result[0].moderation.type}**, da <@${result[0].moderation.moderator}> per il motivo: **${result[0].moderation.reason}**`)
                            .setColor(`RED`)
                        interaction.editReply({ embeds: [embed] })
                        return
                    }
                }
                let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`
                let dm = true
                let embed1 = new Discord.MessageEmbed()
                    .setAuthor({ name: `[MUTE] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`⚠️ **HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                    .setThumbnail(config.images.rogimute)
                    .setColor(`PURPLE`)
                    .addField(`Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                    .addField(`Motivo:`, reason.toString())
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`Sei stato mutato!`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setColor(`RED`)
                    .addField(`Mutato da:`, interaction.member.toString(), true)
                    .addField(`Mutato in:`, interaction.guild.name, true)
                    .addField(`Per il motivo:`, reason.toString(), true)
                await user.send({ embeds: [embed2] }).catch(() => { dm = false })
                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`🔇 MUTE 🔇`)
                    .setColor(`RED`)
                    .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                    .addField(`📖 Motivo:`, reason)
                if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`)
                if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`)
                client.channels.cache.get(config.idcanali.logs.moderation.mute).send({ embeds: [embed3] })
                interaction.editReply({ embeds: [embed1] })
                guildmember.roles.add(config.idruoli.muted)
                database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {
                    if (!result[0]) {
                        database.collection(`UserStats`).insertOne({
                            username: user.username, id: user.id, roles: guildmember._roles, moderation: {
                                type: `muted`,
                                moderator: interaction.user.id,
                                reason: reason
                            },
                            leavedAt: 0
                        })
                    }
                    if (result[0]) {
                        database.collection(`UserStats`).updateOne({ id: user.id }, {
                            $set: {
                                moderation: {
                                    type: `muted`,
                                    moderator: interaction.user.id,
                                    reason: reason
                                }
                            }
                        })
                    }
                })
            })
        })
    }
}