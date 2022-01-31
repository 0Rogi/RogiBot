module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `Ticket`) {
            var server = client.guilds.cache.get(config.idServer.idServer)
            var user = interaction.user
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Hai già un ticket aperto*`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.rogierror)
                    interaction.reply({embeds: [embed], ephemeral: true})
                    return
                }
            server.channels.create(`ticket-${user.username}`, { type:`GUILD_TEXT` }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`)
                canale.setParent(config.idcanali.helpparent)
                canale.permissionOverwrites.set([
                    {
                        id:server.id,
                        deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                    },
                    {
                        id:user.id,
                        allow: [`VIEW_CHANNEL`]
                    },
                    {
                        id: config.idruoli.staff,
                        deny: [`VIEW_CHANNEL`]
                    }
                ])
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🗨Scegli una CATEGORIA`)
                    .setDescription(`Scegli una categoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                    .setColor(`YELLOW`)
                    .addField(`Categorie:`, `**👀Problemi nel server**\n*⤷Ho riscontrato un bug all'interno del bot\n⤷Ho riscontrato un bug all'interno del server\n⤷Altro...*\n**👥Domande allo staff**\n*⤷Voglio segnalare un utente\n⤷Posso far parte dello staff?\n⤷Facciamo una collaborazione?\n⤷Altro...*\n**⚙️Aiuto sulla programmazione**\n*⤷Ho bisogno d'aiuto per un bot\n⤷Ho bisogno d'aiuto per un sito\n⤷Altro...*`)
                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`CategorieTicket`)
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
                        },
                        {
                            label: `Aiuto sulla programmazione`,
                            description: `Per ricevere aiuto sulla programmazione`,
                            value: `programminghelp`,
                            emoji: `⚙️`
                        }
                    ])
                let row = new Discord.MessageActionRow()
                    .addComponents(menu)
                canale.send({embeds: [embed], components: [row]})
                interaction.deferUpdate()
                let embedlog = new Discord.MessageEmbed()
                    .setTitle(`✉️Ticket Aperto✉️`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤Utente:`, `Nome: **${user.username}**, ID: **${user.id}**\n${user.toString()}`)
                    .setThumbnail(user.displayAvatarURL({dynamic: true}))
                    .setColor(`YELLOW`)
                let logs = client.channels.cache.get(config.idcanali.logs.ticket)
                logs.send({embeds: [embedlog]})
        })
    }
}}