const moment = require(`moment`)
const fs = require(`fs`)
const config = require(`${process.cwd()}/JSON/config.json`)
const createTranscript = require(`${process.cwd()}/functions/transcripts/createtranscript.js`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.guild != config.idServer.idServer) return
        if (!interaction.isButton()) return

        if (interaction.customId == `LOCKEDTickets`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                .setDescription(`I ticket si possono aprire dalle **08:00 alle 22:30**, attualmente sono **chiusi**\n\nPotrai riaprirli nuovamente alle **08:00**, mi spiace.`)
                .setColor(`RED`)
            interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }
        if (interaction.customId == `Tickets`) {

            if (serverstats.tickets.find(ticket => ticket.userid == interaction.user.id)) {
                interaction.reply({ content: `<a:error:966371274853089280> Hai già un ticket aperto! Non puoi aprirne due! <#${serverstats.tickets.find(ticket => ticket.userid == interaction.user.id).channelid}>`, ephemeral: true })
                return
            }

            let server = client.guilds.cache.get(config.idServer.idServer)

            let channel = await server.channels.create(`—͟͞͞❓】${interaction.user.username}`, {
                type: `GUILD_TEXT`,
                parent: config.idcanali.helpparent,
                permissionOverwrites: [
                    {
                        id: config.idServer.idServer,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.user.id,
                        allow: [`VIEW_CHANNEL`],
                        deny: [`SEND_MESSAGES`]
                    }
                ]
            })

            let ticket = {
                name: interaction.user.username,
                userid: interaction.user.id,
                channelid: channel.id,
                category: null,
                subcategory: null,
                closing: false,
            }

            database.collection(`ServerStats`).updateOne({}, { $push: { "tickets": ticket } })

            let embed = new Discord.MessageEmbed()
                .setTitle(`🗨 Scegli una CATEGORIA`)
                .setDescription(`Scegli una categoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                .setColor(`YELLOW`)
                .addField(`📂 CATEGORIE:`, `**👀 Problemi nel server**\n*⤷ Ho riscontrato un bug all'interno del bot\n⤷ Ho riscontrato un bug all'interno del server\n⤷ Altro...*\n**👥 Domande allo staff**\n*⤷ Voglio segnalare un utente\n⤷ Posso far parte dello staff?\n⤷ Facciamo una collaborazione?\n⤷ Altro...*`)

            let menu = new Discord.MessageSelectMenu()
                .setCustomId(`CategoryTicket,${interaction.member.id}`)
                .setPlaceholder(`Seleziona una categoria`)
                .addOptions([
                    {
                        label: `Problemi nel server`,
                        description: `Per segnalare un problema nel server`,
                        value: `serverissues`,
                        emoji: `👀`
                    },
                    {
                        label: `Domande allo staff`,
                        description: `Per fare domande allo staff`,
                        value: `staffquestions`,
                        emoji: `👥`
                    }
                ])
            let row = new Discord.MessageActionRow()
                .addComponents(menu)

            channel.send({ embeds: [embed], components: [row] })
            interaction.deferUpdate()
        } else if (interaction.customId.startsWith(`TicketOpen`)) {
            if (interaction.member.id != interaction.customId.split(`,`)[1]) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })
            let ticket
            setTimeout(async () => {
                ticket = await serverstats.tickets.find(ticket => ticket.userid == interaction.user.id)
                let embed = new Discord.MessageEmbed()
                    .setTitle(`${ticket.category}\n${ticket.subcategory}`)
                    .setColor(`GREEN`)
                    .setDescription(`Il tuo ticket è stato ** aperto **, ora puoi parlare con lo staff\n\n📜 ** Regole del ticket **\n1) Ricorda sempre che la persona con cui parlerai, è un __essere umano come te__, quindi non è assicurato che riusciremo ad aiutarti; \n2) Ricorda di essere educato; \n3) Non dire: "Posso fare una domanda?" "Posso chiedere aiuto?" ma esponi direttamente il tuo problema o la tua domanda`)
                let button = new Discord.MessageButton()
                    .setLabel(`Chiudi Ticket`)
                    .setStyle(`DANGER`)
                    .setCustomId(`TicketClose`)
                let row = new Discord.MessageActionRow()
                    .addComponents(button)
                interaction.update({ embeds: [embed], components: [row] })
                if (ticket.subcategory != `Facciamo una collaborazione?`) {
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.id,
                            deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                        },
                        {
                            id: interaction.user.id,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                        },
                        {
                            id: config.idruoli.staff,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                        }
                    ])
                } else if (ticket.subcategory == `Facciamo una collaborazione?`) {
                    interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.id,
                            deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                        },
                        {
                            id: interaction.user.id,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                        },
                        {
                            id: config.idruoli.staff,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                        },
                        {
                            id: `985910805730054154`,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                        }
                    ])
                }
                let embedlog = new Discord.MessageEmbed()
                    .setTitle(`✉️ Ticket Aperto ✉️`)
                    .setColor(`GREEN`)
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤 Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                    .addField(`📘 Categoria:`, ticket.category, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`📖 Sottocategoria:`, ticket.subcategory, true)
                client.channels.cache.get(config.idcanali.logs.ticket).send({ embeds: [embedlog] })
            }, 1000)
        } else if (interaction.customId == `TicketClose` || interaction.customId == `TicketSolved`) {
            let ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
            if (!ticket) return interaction.reply({ content: `<a:error:966371274853089280> Questo canale non è un ticket`, ephemeral: true })
            if (ticket.closing) return interaction.reply({ content: `<a:error:966371274853089280> Questo ticket è già in chiusura`, ephemeral: true })

            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket in chiusura`)
                .setDescription(`Questo ticket si chiuderà in \`20 secondi\``)
                .setColor(`RED`)
            let button = new Discord.MessageButton()
                .setLabel(`Annulla`)
                .setCustomId(`TicketNoClose`)
                .setStyle(`DANGER`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            interaction.deferUpdate()
            interaction.channel.send({ embeds: [embed], components: [row] }).then(msg => {
                database.collection(`ServerStats`).updateOne({ "tickets.channelid": interaction.channel.id.toString() }, {
                    "$set": { "tickets.$.closing": true }
                })
                setTimeout(async () => {
                    ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
                    if (!ticket.closing || msg.embeds[0].title != `Ticket in chiusura`) return
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Ticket in chiusura`)
                        .setDescription(`Questo ticket si chiuderà in \`10 secondi\``)
                        .setColor(`RED`)
                    msg.edit({ embeds: [embed] }).then(msg2 => {
                        setTimeout(async () => {
                            ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
                            if (!ticket.closing || msg2.embeds[0].title != `Ticket in chiusura`) return
                            if (ticket.closing) {
                                let user = await client.users.fetch(ticket.userid)
                                let embedlog = new Discord.MessageEmbed()
                                    .setTitle(`✉️ Ticket Chiuso ✉️`)
                                    .setColor(`RED`)
                                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                                    .addField(`👑 Owner:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                                    .addField(`👤 Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                                    .addField(`📘 Categoria:`, ticket.category, true)
                                    .addField(`\u200b`, `\u200b`, true)
                                    .addField(`📖 Sottocategoria:`, ticket.subcategory, true)

                                let transcript = await createTranscript(interaction.channel.id)
                                fs.writeFile(`transcript${ticket.userid}.txt`, transcript, async function (err) {
                                    await client.channels.cache.get(config.idcanali.logs.ticket).send({ embeds: [embedlog], files: [`${process.cwd()}/transcript${ticket.userid}.txt`] })
                                    database.collection(`ServerStats`).updateOne({}, { $pull: { "tickets": { channelid: interaction.channel.id.toString() } } })
                                    interaction.channel.delete()
                                })
                            }
                        }, 1000 * 10)
                    })
                }, 1000 * 10)
            })
        } else if (interaction.customId == `TicketNoClose`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Chiusura Annullata`)
                .setDescription(`Chiusura annullata da ${interaction.user.toString()}`)
                .setColor(`RED`)
            interaction.update({ embeds: [embed], components: [] })
            database.collection(`ServerStats`).updateOne({ "tickets.channelid": interaction.channel.id.toString() }, {
                "$set": { "tickets.$.closing": false }
            })
        }
    }
}