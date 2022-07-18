const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `unmute`,
    data: {
        name: `unmute`,
        description: `Smuta un utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente da smutare`,
                type: `USER`,
                required: true
            }
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
            database.collection(`UserStats`).find({ id: user.id }).toArray(async function (err, result) {
                if (!result[0]) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Erorre`)
                        .setDescription(`*Questo utente non ha uno stato di moderazione*`)
                        .setColor(`RED`)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (result[0]?.moderation.type != `muted` && result[0].moderation.type != `tempmuted`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Erorre`)
                        .setDescription(`*Questo utente non è mutato*`)
                        .setColor(`RED`)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                let dm = true
                let embed1 = new Discord.MessageEmbed()
                    .setAuthor({ name: `[UNMUTE] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`⚠️ **HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                    .setThumbnail(config.images.rogimute)
                    .setColor(`PURPLE`)
                    .addField(`Utente:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`Sei stato smutato!`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setColor(`RED`)
                    .addField(`Smutato da:`, interaction.member.toString(), true)
                    .addField(`Smutato in:`, interaction.guild.name, true)
                await user.send({ embeds: [embed2] }).catch(() => { dm = false })
                let embed3 = new Discord.MessageEmbed()
                    .setTitle(`🔊 UNMUTE 🔊`)
                    .setColor(`RED`)
                    .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                if (dm == false) embed3.setDescription(`⚠️ L'utente **non è stato** avvisato nei dm`)
                if (dm == false) embed1.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`)
                client.channels.cache.get(config.idcanali.logs.moderation.unmute).send({ embeds: [embed3] })
                interaction.editReply({ embeds: [embed1] })
                guildmember.roles.remove(config.idruoli.muted)
                guildmember.roles.remove(config.idruoli.tempmuted)
                if (result[0]) {
                    database.collection(`UserStats`).updateOne({ id: user.id }, {
                        $set: { moderation: {} }
                    })
                }
            })
        })
    }
}