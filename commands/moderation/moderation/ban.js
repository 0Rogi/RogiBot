const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `ban`,
    data: {
        name: `ban`,
        description: `Banna un utente dal server`,
        options: [
            {
                name: `utente`,
                description: `ID dell'utente da bannare`,
                type: `STRING`,
                required: true
            },
            {
                name: `motivo`,
                description: `Motivo del ban`,
                type: `STRING`,
                required: false
            },
        ],
    },
    permissionlevel: 2,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let id = interaction.options.getString(`utente`)
            if (id == `793768313934577664`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`๐ณ COSA? ๐ณ`)
                    .setDescription(`Vuoi seriamente bannare GiulioAndCode?! ๐ณ๐ณ`)
                    .setColor(`ORANGE`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            let user = await client.users.fetch(id).catch((err) => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            })
            if (!user) return
            let guildmember = await interaction.guild.members.cache.find(x => x.id == user.id)
            if (guildmember && guildmember.roles.cache.has(config.idruoli.staff) && !interaction.member.roles.cache.has(config.idruoli.owner)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*${guildmember} รจ uno staffer, non posso bannarlo*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            database.collection(`UserStats`).find({ id: user.id }).toArray(async function (err, result) {
                if (!result[0]) {
                    database.collection(`UserStats`).insertOne({
                        username: user.username, id: user.id, moderation: {}, leavedAt: 0
                    })
                }
                if (result[0]?.moderation.type == `banned`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*${user} รจ giร? bannato da questo server*`)
                        .setColor(`RED`)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                let reason = interaction.options.getString(`motivo`) || `Nessun Motivo`
                let dm = true
                let embed1 = new Discord.MessageEmbed()
                    .setAuthor({ name: `[BAN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`โ?๏ธ **HO AVVISATO** QUEST'UTENTE IN DM โ?๏ธ`)
                    .setThumbnail(config.images.rogiban)
                    .setColor(`PURPLE`)
                    .addField(`Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                    .addField(`Motivo:`, reason.toString())
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`Sei stato bannato!`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setColor(`RED`)
                    .addField(`Bannato da:`, interaction.member.toString(), true)
                    .addField(`Bannato in:`, interaction.guild.name, true)
                    .addField(`Per il motivo:`, reason.toString(), true)
                await user.send({ embeds: [embed2] }).catch(() => { dm = false })
                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`๐ซ BAN ๐ซ`)
                    .setColor(`RED`)
                    .setDescription(`โ?๏ธ L'utente **รจ stato** avvisato nei dm โ?๏ธ`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`โฐ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`๐จ Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`๐ค Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                    .addField(`๐ Motivo:`, reason)
                if (dm == false) embed3.setDescription(`โ?๏ธ L'utente **non รจ stato** avvisato nei dm`)
                if (dm == false) embed1.setDescription(`โ?๏ธ **NON POSSO AVVISARE** QUESTO UTENTE IN DM โ?๏ธ`)
                client.channels.cache.get(config.idcanali.logs.moderation.bans).send({ embeds: [embed3] })
                interaction.editReply({ embeds: [embed1] })
                interaction.guild.members.ban(user, { reason: reason })
                database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {
                    if (!result[0]) {
                        database.collection(`UserStats`).insertOne({
                            username: user.username, id: user.id, moderation: {
                                type: `tempmuted`,
                                moderator: interaction.user.id,
                                reason: reason,
                                time: time
                            },
                            leavedAt: 0
                        })
                    }
                    if (result[0]) {
                        database.collection(`UserStats`).updateOne({ id: user.id }, {
                            $set: {
                                moderation: {
                                    type: `banned`,
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