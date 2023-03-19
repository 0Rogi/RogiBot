const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `TicketsMuted`) {
            let ticket = await serverstats.tickets.find(ticket => ticket.userid == interaction.user.id)
            if (!ticket) {
                interaction.guild.channels.create(`—͟͞͞⛔】ticket-${interaction.user.username}`, { type: `GUILD_TEXT`, parent: config.channelsid.ticketsparent }).then(async ch => {
                    ch.setParent(config.channelsid.ticketsparent)
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
                            id: config.rolesid.moderator,
                            allow: [`VIEW_CHANNEL`]
                        }
                    ])

                    let ticket = {
                        name: interaction.user.username,
                        userid: interaction.user.id,
                        channelid: ch.id,
                        category: `Support`,
                        subcategory: `Muted`,
                        closing: false,
                    }

                    await database.collection(`ServerStats`).updateOne({}, { $push: { "tickets": ticket } })

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

                    let embedlog = new Discord.MessageEmbed()
                        .setTitle(`✉️ Ticket Aperto ✉️`)
                        .setColor(`GREEN`)
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`👤 Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                        .addField(`📘 Categoria:`, ticket.category, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`📖 Sottocategoria:`, ticket.subcategory, true)
                    client.channels.cache.get(config.channelsid.logs.ticket).send({ embeds: [embedlog] })
                    interaction.deferUpdate()
                })
            }
            if (ticket) {
                interaction.reply({ content: `<a:error:1086952752892092416> Hai già un ticket aperto! Non puoi aprirne due! ${interaction.guild.channels.cache.find(x => x.id == ticket.channelid)?.toString()}`, ephemeral: true })
            }
        } else if (interaction.customId == `TicketsMutedAccept`) {
            if (!interaction.member.permissions.has(`MANAGE_MESSAGES`)) return interaction.reply({ content: `<a:error:1086952752892092416> Solo lo staff puo' accettare i ticket di supporto!`, ephemeral: true })
            let ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
            if (ticket) {
                interaction.channel.permissionOverwrites.create(interaction.guild.members.cache.find(x => x.id == ticket.userid), { SEND_MESSAGES: true, VIEW_CHANNEL: true, ATTACH_FILES: true })
                interaction.channel.permissionOverwrites.create(config.rolesid.moderator, { SEND_MESSAGES: true, VIEW_CHANNEL: true, ATTACH_FILES: true })
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Ticket Accettato`)
                    .setDescription(`Il tuo ticket di supporto in **${interaction.guild.name}**, è stato accettato.\n\nOra puoi **parlare con lo staff**.`)
                    .setColor(`GREEN`)
                interaction.guild.members.cache.find(x => x.id == ticket.userid).send({ embeds: [embed] }).catch(() => { })
                let button = new Discord.MessageButton()
                    .setLabel(`Accetta Ticket`)
                    .setCustomId(`TicketsMutedAccept`)
                    .setStyle(`SUCCESS`)
                    .setDisabled()
                let row = new Discord.MessageActionRow()
                    .addComponents(button)
                interaction.update({ components: [row] })
            }
        }
    }
}