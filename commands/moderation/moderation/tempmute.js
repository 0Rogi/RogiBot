const ms = require(`ms`)
const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)
const adduser = require(`${process.cwd()}/functions/database/adduser.js`)
const setpermissions = require(`${process.cwd()}/functions/general/setpermissions.js`)

module.exports = {
    name: `tempmute`,
    data: {
        name: `tempmute`,
        description: `Muta temporaneamente un utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente da mutare temporaneamente`,
                type: `USER`,
                required: true
            },
            {
                name: `tempo`,
                description: `Tempo del mute`,
                type: `STRING`,
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

            database.collection(`users`).find({ id: user.id }).toArray(async function (err, result) {
                if (!result[0]) {
                    adduser(guildmember)
                }
                if (result[0]) {
                    if (result[0]?.moderation?.type == `muted`) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Questo utente è già mutato!`)
                            .setDescription(`Quest'utente è già **mutato**, da <@${result[0].moderation.moderator}> per il motivo: **${result[0].moderation.reason}**`)
                            .setColor(`RED`)
                        interaction.editReply({ embeds: [embed] })
                        return
                    }
                    if (result[0]?.moderation?.type == `tempmuted`) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Questo utente è già mutato!`)
                            .setDescription(`Quest'utente è già **tempmutato**, da <@${result[0].moderation.moderator}> per il motivo: **${result[0].moderation.reason}** per **${ms(result[0].moderation.time)}**`)
                            .setColor(`RED`)
                        interaction.editReply({ embeds: [embed] })
                        return
                    }
                }

                let time = interaction.options.getString(`tempo`)
                time = ms(time)
                let timeembed = ms(time, { long: true });
                timeembed = timeembed + ` `
                timeembed = timeembed.replace(`second `, `secondo`)
                timeembed = timeembed.replace(`seconds`, `secondi`)
                timeembed = timeembed.replace(`minute `, `minuto `)
                timeembed = timeembed.replace(`minutes`, `minuti`)
                timeembed = timeembed.replace(`hour `, `ora `)
                timeembed = timeembed.replace(`hours`, `ore`)
                let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`
                let dm = true
                let embed1 = new Discord.MessageEmbed()
                    .setAuthor({ name: `[TEMPMUTE] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`⚠️ **HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                    .setThumbnail(config.images.rogimute)
                    .setColor(`PURPLE`)
                    .addField(`👤 Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                    .addField(`⏰ Tempo:`, timeembed.toString(), true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`📖 Motivo:`, reason.toString(), true)
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`Sei stato mutato temporaneamente!`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setColor(`RED`)
                    .addField(`🔨 Mutato da:`, interaction.member.toString(), true)
                    .addField(`🏠 Mutato in:`, interaction.guild.name, true)
                    .addField(`📖 Per il motivo:`, reason.toString(), true)
                await user.send({ embeds: [embed2] }).catch(() => { dm = false })
                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`🔇 TEMPMUTE 🔇`)
                    .setColor(`RED`)
                    .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                    .addField(`⏰ Tempo:`, timeembed.toString())
                    .addField(`📖 Motivo:`, reason)
                if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`)
                if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`)
                client.channels.cache.get(config.idcanali.logs.moderation.tempmute).send({ embeds: [embed3] })
                interaction.editReply({ embeds: [embed1] })

                setpermissions()
                guildmember.roles.add(config.idruoli.tempmuted)

                database.collection(`users`).find({ id: user.id }).toArray(function (err, result) {
                    database.collection(`users`).updateOne({ id: user.id }, {
                        $set: {
                            moderation: {
                                type: `tempmuted`,
                                moderator: interaction.user.id,
                                reason: reason,
                                time: time
                            }
                        }
                    })
                })
            })
        })
    }
}