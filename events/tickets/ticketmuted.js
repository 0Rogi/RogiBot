const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `TicketsMuted`) {
            database.collection(`Tickets`).find({ id: interaction.user.id }).toArray(function (err, result) {
                if (!result[0]) {
                    interaction.guild.channels.create(`⛔│ticket-${interaction.user.username}`, { type: `GUILD_TEXT` }).then(async ch => {
                        ch.setParent(config.idcanali.helpparent)
                        ch.permissionOverwrites.set([
                            {
                                id: interaction.guild.id,
                                deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                            },
                            {
                                id: interaction.user.id,
                                allow: [`VIEW_CHANNEL`]
                            },
                            {
                                id: config.idruoli.moderator,
                                allow: [`VIEW_CHANNEL`]
                            }
                        ])
                        await database.collection(`Tickets`).insertOne({ username: interaction.member.user.username, id: interaction.member.id, channel: ch.id, category: `Support`, subcategory: `Muted`, opened: false, closing: false })
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Utente Mutato`)
                            .setDescription(`${interaction.member.toString()} è stato mutato e vuole ricevere supporto!\n\nPremi il pulsante qui sotto per **accettare il suo ticket** e parlare con lui`)
                            .setColor(`RED`)
                        let button = new Discord.MessageButton()
                            .setLabel(`Accetta Ticket`)
                            .setCustomId(`TicketsMutedAccept`)
                            .setStyle(`SUCCESS`)
                        let row = new Discord.MessageActionRow()
                            .addComponents(button)
                        ch.send({ embeds: [embed], components: [row] })
                        database.collection(`Tickets`).find({ id: interaction.member.id }).toArray(function (err, result) {
                            if (!result[0]) return
                            if (result[0]) {
                                let embedlog = new Discord.MessageEmbed()
                                    .setTitle(`✉️Ticket Aperto✉️`)
                                    .setColor(`GREEN`)
                                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                                    .addField(`👤Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                                    .addField(`📘Categoria:`, result[0].category, true)
                                    .addField(`\u200b`, `\u200b`, true)
                                    .addField(`📖Sottocategoria:`, result[0].subcategory, true)
                                client.channels.cache.get(config.idcanali.logs.ticket).send({ embeds: [embedlog] })
                            }
                        })
                        interaction.deferUpdate()
                    })
                }
                if (result[0]) {
                    interaction.reply({ content: `<a:error:966371274853089280> Hai già un ticket aperto! Non puoi aprirne due! ${interaction.guild.channels.cache.find(x => x.id == result[0].channel)?.toString()}`, ephemeral: true })
                }
            })
        } else if (interaction.customId == `TicketsMutedAccept`) {
            if (!interaction.member.roles.cache.has(config.idruoli.staff)) return interaction.reply({ content: `<a:error:966371274853089280> Solo lo staff puo' accettare i ticket di supporto!`, ephemeral: true })
            database.collection(`Tickets`).find({ channel: interaction.channel.id }).toArray(function (err, result) {
                if (!result[0]) return
                if (result[0]) {
                    interaction.channel.permissionOverwrites.create(interaction.guild.members.cache.find(x => x.id == result[0].id), { SEND_MESSAGES: true, VIEW_CHANNEL: true, ATTACH_FILES: true })
                    interaction.channel.permissionOverwrites.create(config.idruoli.moderator, { SEND_MESSAGES: true, VIEW_CHANNEL: true, ATTACH_FILES: true })
                    database.collection(`Tickets`).updateOne({ channel: interaction.channel.id }, { $set: { opened: true } })
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Ticket Accettato`)
                        .setDescription(`Il tuo ticket di supporto in **${interaction.guild.name}**, è stato accettato.\n\nOra puoi **parlare con lo staff**.`)
                        .setColor(`GREEN`)
                    interaction.guild.members.cache.find(x => x.id == result[0].id).send({ embeds: [embed] }).catch(() => { })
                    let button = new Discord.MessageButton()
                        .setLabel(`Accetta Ticket`)
                        .setCustomId(`TicketsMutedAccept`)
                        .setStyle(`SUCCESS`)
                        .setDisabled()
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    interaction.update({ components: [row] })
                }
            })
        }
    }
}