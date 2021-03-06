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
                .setTitle(`🤖 Tutti i comandi del Bot 🤖`)
                .setDescription(`Usa il **menu** qui sotto per scegliere la categoria di comandi da vedere!\n\n🎡 **GENERAL**\n*Comandi generali*\n😂 **FUN**\n*Comandi di divertimento*\n🔨 **MODERATION**\n*Comandi di moderazione*\n👑 **OWNER**\n*Comandi per l'owner*\n📈 **STATISTICS**\n*Comandi per mostrare statistiche*\n🎫 **TICKET**\n*Comandi dei ticket*`)
                .setColor(`YELLOW`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            let row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId(`Help,${interaction.user.id}`)
                    .addOptions([
                        {
                            label: `General`,
                            value: `general`,
                            emoji: `🎡`
                        },
                        {
                            label: `Fun`,
                            value: `fun`,
                            emoji: `😂`
                        },
                        {
                            label: `Moderation`,
                            value: `moderation`,
                            emoji: `🔨`
                        },
                        {
                            label: `Owner`,
                            value: `owner`,
                            emoji: `👑`
                        },
                        {
                            label: `Statistics`,
                            value: `statistics`,
                            emoji: `📈`
                        },
                        {
                            label: `Ticket`,
                            value: `ticket`,
                            emoji: `🎫`
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
            .addField(`⚔️ Livello di Permesso:`, command.permissionlevel, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`📋 Utilizzo:`, command.data.description.toString() || "a", true)
        interaction.reply({ embeds: [embed] })
    }
}