const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return
        if (!interaction.isSelectMenu()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId.startsWith(`CategoryTicket`)) {
            if (interaction.member.id != interaction.customId.split(`,`)[1])
                return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo menù!`, ephemeral: true })
            switch (interaction.values[0]) {
                case `serverissues`: {
                    let embed = new Discord.MessageEmbed()
                        .setColor(`YELLOW`)
                        .setTitle(`👀 Problemi nel server`)
                        .setDescription(`Scegli una sottocategoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                        .addField(`Sottocategorie:`, `*⤷ Ho riscontrato un bug all'interno del bot\n⤷ Ho riscontrato un bug all'interno del server\n⤷ Altro...*`)
                    let menu = new Discord.MessageSelectMenu()
                        .setCustomId(`SubcategoryTicket,${interaction.member.id}`)
                        .setPlaceholder(`Seleziona una sottocategoria`)
                        .addOptions([
                            {
                                label: `Ho riscontrato un bug all'interno del bot`,
                                value: `botbugs`,
                                descritpion: `Problemi con il bot`,
                                emoji: `🔹`
                            },
                            {
                                label: `Ho riscontrato un bug all'interno del server`,
                                value: `serverbug`,
                                descritpion: `Problemi con il server`,
                                emoji: `🔹`
                            },
                            {
                                label: `Altro...`,
                                value: `Other`,
                                emoji: `🔹`
                            }
                        ])
                    let row = new Discord.MessageActionRow().addComponents(menu)
                    interaction.update({ embeds: [embed], components: [row] })
                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.category": "Problemi nel server" }
                    })
                } break
                case `staffquestions`: {
                    let embed = new Discord.MessageEmbed()
                        .setColor(`YELLOW`)
                        .setTitle(`👥 Domande allo staff`)
                        .setDescription(`Scegli una sottocategoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                        .addField(`Sottocategorie:`, `*⤷ Voglio segnalare un utente\n⤷ Posso far parte dello staff?\n⤷ Facciamo una collaborazione?\n⤷ Altro...*`)
                    let menu = new Discord.MessageSelectMenu()
                        .setCustomId(`SubcategoryTicket,${interaction.member.id}`)
                        .setPlaceholder(`Seleziona una sottocategoria`)
                        .addOptions([
                            {
                                label: `Voglio segnalare un utente`,
                                description: `Segnala un utente pericoloso`,
                                value: `userreport`,
                                emoji: `🔹`
                            },
                            {
                                label: `Posso far parte dello staff?`,
                                description: `Chiedi di diventare Staffer`,
                                value: `wantstaff`,
                                emoji: `🔹`
                            },
                            {
                                label: `Facciamo una collaborazione?`,
                                description: `Chiedi di fare una collaborazione`,
                                value: `wantcollab`,
                                emoji: `🔹`
                            },
                            {
                                label: `Altro...`,
                                emoji: `🔹`,
                                value: `Other`
                            }
                        ])
                    let row = new Discord.MessageActionRow().addComponents(menu)
                    interaction.update({ embeds: [embed], components: [row] })
                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.category": "Domande allo staff" }
                    })
                } break
            }
        } else if (interaction.customId.startsWith(`SubcategoryTicket`)) {
            if (interaction.member.id != interaction.customId.split(`,`)[1])
                return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo menù!`, ephemeral: true })
            switch (interaction.values[0]) {
                case `botbugs`: {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`👀 Problemi nel server\n🤖 Bug nel bot`)
                        .setDescription(`🧠 Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                        .setColor(`YELLOW`)
                        .addField(`__🔴 Il bot è offline__`, `Se stai avendo problemi con il bot, è probabile che il bot sia in fase di test, quindi attendi una mezz'oretta e tutto ritornerà come prima!`)
                        .addField(`__⚠️ Non puoi usare alcuni comandi__`, `Se non puoi usare alcuni comandi, è possibile che siano dei comandi riservati allo staff o per usarli hai bisogno di un determinato livello`)
                        .addField(`😩 Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                    let button1 = new Discord.MessageButton()
                        .setStyle(`DANGER`)
                        .setLabel(`Problema risolto`)
                        .setCustomId(`TicketSolved`)
                    let button2 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Apri Ticket`)
                        .setCustomId(`TicketOpen,${interaction.member.id}`)
                    let row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2)
                    interaction.update({ embeds: [embed], components: [row] })
                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.subcategory": "Ho riscontrato un bug all'interno del bot" }
                    })
                } break
                case `serverbug`: {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`👀 Problemi nel server\n🎡 Bug nel server`)
                        .setDescription(`🧠 Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                        .setColor(`YELLOW`)
                        .addField(`__💢 Puoi vedere qualche chat che non dovresti__`, `Se il tuo problema è che riesci a vedere qualche chat che non dovresti, è possibile che ci siano dei test in corso`)
                        .addField(`__❕ Non posso usare le ricompense dei livelli__`, `Se non puoi usare alcune ricompense, prima di aprire il ticket, assicurati che tu abbia il livello necessario`)
                        .addField(`😩 Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                    let button1 = new Discord.MessageButton()
                        .setStyle(`DANGER`)
                        .setLabel(`Problema risolto`)
                        .setCustomId(`TicketSolved`)
                    let button2 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Apri Ticket`)
                        .setCustomId(`TicketOpen,${interaction.member.id}`)
                    let row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2)
                    interaction.update({ embeds: [embed], components: [row] })

                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.subcategory": "Ho riscontrato un bug all'interno del server" }
                    })
                } break
                case `userreport`: {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`👥 Domande allo staff\n🧑 Segnala un utente`)
                        .setDescription(`🧠 Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                        .setColor(`YELLOW`)
                        .addField(`__⚠️ Un utente ti sta dando fastidio nel server__`, `Se un utente ti sta dando fastidio all'interno del server, non aprire un ticket, cercate di risolverla tra voi, o se la situazione degenera, pinga **un** membro dello staff, possibilmente online, che provvederà`)
                        .addField(`__👤 Un utente potenzialmente "pericoloso" è all'interno di questo server__`, `Se c'è un utente potenzialmente pericoloso all'interno di questo server, apri il ticket, però assicurati di avere delle prove prima di segnalare quest'utente`)
                        .addField(`😩 Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                    let button1 = new Discord.MessageButton()
                        .setStyle(`DANGER`)
                        .setLabel(`Problema risolto`)
                        .setCustomId(`TicketSolved`)
                    let button2 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Apri Ticket`)
                        .setCustomId(`TicketOpen,${interaction.member.id}`)
                    let row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2)
                    interaction.update({ embeds: [embed], components: [row] })
                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.subcategory": "Voglio segnalare un utente" }
                    })
                } break
                case `wantstaff`: {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`👥 Domande allo staff\n🔨 Diventare uno staffer`)
                        .setDescription(`🧠 Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                        .setColor(`YELLOW`)
                        .addField(`__❗ Vuoi diventare un moderatore?__`, `Se desideri diventare un moderatore, appena ci sarà bisogno di un nuovo staffer, potrai fare la candidatura!`)
                        .addField(`__🛡️ Vuoi diventare admin?__`, `Per poter diventare admin, devi prima essere moderatore, dopo di che se Rogi lo vorrà, potrai essere un admin`)
                        .addField(`😩 Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                    let button1 = new Discord.MessageButton()
                        .setStyle(`DANGER`)
                        .setLabel(`Problema risolto`)
                        .setCustomId(`TicketSolved`)
                    let button2 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Apri Ticket`)
                        .setCustomId(`TicketOpen,${interaction.member.id}`)
                    let row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2)
                    interaction.update({ embeds: [embed], components: [row] })

                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.subcategory": "Posso far parte dello staff?" }
                    })
                } break
                case `wantcollab`: {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`👥 Domande allo staff\n🤝 Facciamo una collaborazione`)
                        .setDescription(`🧠 Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                        .setColor(`YELLOW`)
                        .addField(`__🔴 Voglio far parte di un video di Rogi__`, `Se desideri far parte di un video di Rogi, sappi che fa entrare nei suoi video solo i suoi amici, quindi è difficile che tu riesca ad entrare nei video`)
                        .addField(`__🛡️ Voglio fare una proposta a Rogi__`, `Vuoi fare una proposta a Rogi di qualunque tipo? Allora apri pure il ticket`)
                        .addField(`😩 Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                    let button1 = new Discord.MessageButton()
                        .setStyle(`DANGER`)
                        .setLabel(`Problema risolto`)
                        .setCustomId(`TicketSolved`)
                    let button2 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setLabel(`Apri Ticket`)
                        .setCustomId(`TicketOpen,${interaction.member.id}`)
                    let row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2)
                    interaction.update({ embeds: [embed], components: [row] })
                    database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.subcategory": "Facciamo una collaborazione?" }
                    })
                } break
                case `Other`: {
                    await database.collection(`ServerStats`).updateOne({ "tickets.userid": interaction.user.id.toString() }, {
                        "$set": { "tickets.$.subcategory": "Altro..." }
                    })
                    let ticket = await serverstats.tickets.find(ticket => ticket.userid == interaction.user.id)
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`${ticket.category}\nAltro...`)
                        .setColor(`GREEN`)
                        .setDescription(`Il tuo ticket è stato **aperto**, ora puoi parlare con lo staff\n\n📜**Regole del ticket**\n1) Ricorda sempre che la persona con cui parlerai, è un __essere umano come te__, quindi non è assicurato che riusciremo ad aiutarti;\n2) Ricorda di essere educato;\n3) Non dire: "Posso fare una domanda?" "Posso chiedere aiuto?" ma esponi direttamente il tuo problema o la tua domanda`)
                    let button = new Discord.MessageButton()
                        .setLabel(`Chiudi Ticket`)
                        .setStyle(`DANGER`)
                        .setCustomId(`TicketClose`)
                    let row = new Discord.MessageActionRow().addComponents(button)
                    interaction.update({ embeds: [embed], components: [row] })
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
                            id: config.rolesid.moderator,
                            allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                        }
                    ])
                    let embedlog = new Discord.MessageEmbed()
                        .setTitle(`✉️ Ticket Aperto ✉️`)
                        .setColor(`GREEN`)
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`👤 Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                        .addField(`📖 Categoria:`, ticket.category, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`Sottocategoria:`, `Altro...`, true)
                    client.channels.cache.get(config.channelsid.logs.ticket).send({ embeds: [embedlog] })
                }
            }
        }
    }
}