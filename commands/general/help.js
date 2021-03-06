const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `help`,
    data: {
        name: `help`,
        description: `Mostra i comandi del bot`,
        options: [
            {
                name: `comando`,
                description: `Il comando di cui mostrare le informazioni`,
                type: `STRING`
            }
        ]
    },
    permissionlevel: 0,
    execute(interaction) {
        let command = interaction.options.getString(`comando`)
        command = client.commands.get(command)
        if (!command) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`š¤ Tutti i comandi del Bot š¤`)
                .setDescription(`Usa il **menu** qui sotto per scegliere la categoria di comandi da vedere!\n\nš” **GENERAL**\n*Comandi generali*\nš **FUN**\n*Comandi di divertimento*\nšØ **MODERATION**\n*Comandi di moderazione*\nš **OWNER**\n*Comandi per l'owner*\nš **STATISTICS**\n*Comandi per mostrare statistiche*\nš« **TICKET**\n*Comandi dei ticket*`)
                .setColor(`YELLOW`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            let row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId(`Help,${interaction.user.id}`)
                    .addOptions([
                        {
                            label: `General`,
                            value: `general`,
                            emoji: `š”`
                        },
                        {
                            label: `Fun`,
                            value: `fun`,
                            emoji: `š`
                        },
                        {
                            label: `Moderation`,
                            value: `moderation`,
                            emoji: `šØ`
                        },
                        {
                            label: `Owner`,
                            value: `owner`,
                            emoji: `š`
                        },
                        {
                            label: `Statistics`,
                            value: `statistics`,
                            emoji: `š`
                        },
                        {
                            label: `Ticket`,
                            value: `ticket`,
                            emoji: `š«`
                        },
                    ])
            )
            interaction.reply({ embeds: [embed], components: [row] })
            return
        }
        switch (command.permissionlevel) {
            case 0: {
                command.permissionlevel = `_Tutti Possono Usarlo_`
            } break
            case 1: {
                command.permissionlevel = `Almeno <@&${config.idruoli.helper}>`
            } break
            case 2: {
                command.permissionlevel = `Almeno <@&${config.idruoli.moderator}>`
            } break
            case 3: {
                command.permissionlevel = `Almeno <@&${config.idruoli.srmoderator}>`
            } break
            case 4: {
                command.permissionlevel = `Almeno <@&${config.idruoli.owner}>`
            } break
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`/${command.name}`)
            .setColor(`YELLOW`)
            .addField(`āļø Livello di Permesso:`, command.permissionlevel, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`š Utilizzo:`, command.data.description.toString() || "a", true)
        interaction.reply({ embeds: [embed] })
    }
}