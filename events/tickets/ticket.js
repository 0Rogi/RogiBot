const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)
const fs = require(`fs`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.guild != config.idServer.idServer) return
        if(!interaction.isButton()) return
        if(interaction.customId == `Tickets`) {
            database.collection(`Tickets`).find({id: interaction.user.id}).toArray(function(err, result) {
                if(!result[0]) {
                    interaction.guild.channels.create(`❓│ticket-${interaction.user.username}`, { type:`GUILD_TEXT` }).then(ch => {
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
                                id: config.idruoli.staff,
                                deny: [`VIEW_CHANNEL`]
                            }
                        ])
                        database.collection(`Tickets`).insertOne({username: interaction.member.user.username, id: interaction.member.id, channel: ch.id, category: null, subcategory: null, opened: false, closing: false})
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`🗨Scegli una CATEGORIA`)
                            .setDescription(`Scegli una categoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                            .setColor(`YELLOW`)
                            .addField(`Categorie:`, `**👀Problemi nel server**\n*⤷Ho riscontrato un bug all'interno del bot\n⤷Ho riscontrato un bug all'interno del server\n⤷Altro...*\n**👥Domande allo staff**\n*⤷Voglio segnalare un utente\n⤷Posso far parte dello staff?\n⤷Facciamo una collaborazione?\n⤷Altro...*`)
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
                        ch.send({embeds: [embed], components: [row]})
                        interaction.deferUpdate()
                    })
                }
                if(result[0]) {
                    interaction.reply({content: `<a:error:966371274853089280> Hai già un ticket aperto! Non puoi aprirne due! ${interaction.guild.channels.cache.find(x => x.id == result[0].channel)?.toString()}`, ephemeral: true})
                }
            })
        } else if(interaction.customId.startsWith(`TicketOpen`)) {
            if(interaction.member.id != interaction.customId.split(`,`)[1]) return interaction.reply({content: `<a:error:966371274853089280>Questo non è un tuo menù!`, ephemeral: true})
            let category
            let subcategory
            database.collection(`Tickets`).find({id: interaction.member.id, channel: interaction.channel.id}).toArray(function(err, result) {
                if(!result[0]) return
                if(result[0]) {
                    category = result[0].category
                    subcategory = result[0].subcategory
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`${category}\n${subcategory}`)
                        .setColor(`GREEN`)
                        .setDescription(`Il tuo ticket è stato **aperto**, ora puoi parlare con lo staff\n\n📜**Regole del ticket**\n1) Ricorda sempre che la persona con cui parlerai, è un __essere umano come te__, quindi non è assicurato che riusciremo ad aiutarti;\n2) Ricorda di essere educato;\n3) Non dire: "Posso fare una domanda?" "Posso chiedere aiuto?" ma esponi direttamente il tuo problema o la tua domanda`)        
                    let button = new Discord.MessageButton()
                        .setLabel(`Chiudi Ticket`)
                        .setStyle(`DANGER`)
                        .setCustomId(`TicketClose`)
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    interaction.update({embeds: [embed], components: [row]})
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
                    database.collection(`Tickets`).updateOne({id: interaction.member.id, channel: interaction.channel.id}, {$set:{opened: true}})
                    database.collection(`Tickets`).find({id: interaction.member.id, channel: interaction.channel.id}).toArray(function(err, result) {
                        if(!result[0]) return
                        if(result[0]) {
                            let embedlog = new Discord.MessageEmbed()
                                .setTitle(`✉️Ticket Aperto✉️`)
                                .setColor(`GREEN`)
                                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                                .addField(`👤Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                                .addField(`📘Categoria:`, result[0].category, true)
                                .addField(`\u200b`, `\u200b`, true)
                                .addField(`📖Sottocategoria:`,  result[0].subcategory, true)
                            client.channels.cache.get(config.idcanali.logs.ticket).send({embeds: [embedlog]})
                        }
                    })
                }
            })
        } else if(interaction.customId == `TicketClose` || interaction.customId == `TicketSolved`) {
            database.collection(`Tickets`).find({channel: interaction.channel.id}).toArray(function(err, result) {
                if(!result[0]) return
                if(result[0]) {
                    if(result[0].closing == true) {
                        interaction.reply({content: `<a:error:966371274853089280>Questo ticket è già in chiusura`, ephemeral: true})
                        return
                    }
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
                    interaction.channel.send({embeds: [embed], components: [row]}).then(msg => {
                        setTimeout(() => {
                            if(msg.embeds[0]?.title == `Chiusura Annullata`) return
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Ticket in chiusura`)
                                .setDescription(`Questo ticket si chiuderà in \`10 secondi\``)
                                .setColor(`RED`)
                            msg.edit({embeds: [embed]}).then(() => {
                                setTimeout(() => {
                                    database.collection(`Tickets`).find({channel: interaction.channel.id}).toArray(function(err, result) {
                                        if(!result[0]) return
                                        if(result[0]) {
                                            if(result[0].closing == true) {
                                                database.collection(`Tickets`).find({channel: interaction.channel.id}).toArray(async function(err, result) {
                                                    if(!result[0]) return
                                                    if(result[0]) {
                                                        let embedlog = new Discord.MessageEmbed()
                                                            .setTitle(`✉️Ticket Chiuso✉️`)
                                                            .setColor(`RED`)
                                                            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                                                            .addField(`👑Owner:`, `Nome: ${interaction.guild.members.cache.find(x => x.id == result[0].id) ? interaction.guild.members.cache.find(x => x.id == result[0].id).user.username : result[0].username}, ID: ${interaction.guild.members.cache.find(x => x.id == result[0].id) ? interaction.guild.members.cache.find(x => x.id == result[0].id).id : result[0].id}`)
                                                            .addField(`👤Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                                                            .addField(`📘Categoria:`, result[0].category, true)
                                                            .addField(`\u200b`, `\u200b`, true)
                                                            .addField(`📖Sottocategoria:`,  result[0].subcategory, true)
                                                        let fetch =  await interaction.channel.messages.fetch({
                                                            limit: 1
                                                        })
                                                        let firstmsg = await fetch.last()
                                                        interaction.channel.messages.fetch({before: firstmsg.id}).then(async messages => {
                                                            messages.reverse()
                                                            let transcript = ``
                                                            await messages.forEach(msg => {
                                                                message = `@${msg.author.username} - ${moment(msg.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)}:\n`
                                                                if(msg.content) message += `${msg.content}`
                                                                if(msg.embeds[0] && !msg.content) message += `Embed: ${msg.embeds[0].title}`
                                                                transcript += message + `\n\n`
                                                            })
                                                            fs.writeFile(`transcript.txt`, transcript, function(err) {
                                                                client.channels.cache.get(config.idcanali.logs.ticket).send({embeds: [embedlog], files: [`${process.cwd()}/transcript.txt`]})
                                                                database.collection(`Tickets`).deleteOne({channel: interaction.channel.id}).then(() => {
                                                                    interaction.channel.delete().catch(() => {})
                                                                })
                                                            })
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }, 1000 * 10)
                            })
                        }, 1000 * 10)
                    })
                    database.collection(`Tickets`).updateOne({channel: interaction.channel.id}, {$set:{closing: true}})
                }
            })
        } else if(interaction.customId == `TicketNoClose`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket non in Chiusura`)
                .setDescription(`Chiusura annullata da ${interaction.member.toString()}`)
                .setColor(`RED`)
            let button = new Discord.MessageButton()
                .setLabel(`Annulla`)
                .setCustomId(`TicketNoClose`)
                .setStyle(`DANGER`)
                .setDisabled()
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            interaction.update({embeds: [embed], components: [row]})
            database.collection(`Tickets`).updateOne({channel: interaction.channel.id}, {$set:{closing: false}})
        }
    }
}