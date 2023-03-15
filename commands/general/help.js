const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `help`,
    description: `Mostra tutti i comandi del bot`,
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
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    execute(interaction) {
        let command = interaction.options.getString(`comando`)
        command = client.commands.get(command)
        if (!command) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🤖 Tutti i comandi del Bot 🤖`)
                .setDescription(`Usa il **menu** qui sotto per scegliere la categoria di comandi da vedere!\n\n🎡 **GENERAL**\n*Comandi generali*\n😂 **FUN**\n*Comandi di divertimento*\n🤖 **ARTIFICIAL INTELLIGENCE**\n*Comandi con cui poter utilizzare l'intelligenza artificiale qui su discord*\n🤑 **ECONOMY**\n*Comandi relativi al sistema di economia*\n📈 **STATISTICS**\n*Comandi per mostrare statistiche*\n🎫 **TICKET**\n*Comandi dei ticket*\n🔐 **PRIVATE ROOMS**\n*Comandi delle stanze private*\n🔨 **MODERATION**\n*Comandi di moderazione*\n👑 **OWNER**\n*Comandi per l'owner*\n\n**🔗 TAGS:**\n<:StaffTag:1032334168371245136> Comando utilizzabile solo dallo **STAFF**\n<:LevellingTag:1032335296332832779> Comando utilizzabile solo dopo **un certo livello**`)
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
                            label: `Artificial Intelligence`,
                            value: `ai`,
                            emoji: `🤖`
                        },
                        {
                            label: `Economy`,
                            value: `economy`,
                            emoji: `🤑`,
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
                        {
                            label: `Private Rooms`,
                            value: `prooms`,
                            emoji: `🔐`
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
                    ])
            )
            interaction.reply({ embeds: [embed], components: [row] })
            return
        }
        switch (command.permissionlevel) {
            case 0: {
                command.permissionlevel = `_Tutti Possono Usarlo_`
            } break;
            case 1: {
                command.permissionlevel = `Almeno <@&${config.rolesid.moderator}>`
            } break;
            case 2: {
                command.permissionlevel = `Almeno <@&${config.rolesid.admin}>`
            } break;
            case 3: {
                command.permissionlevel = `Almeno <@&${config.rolesid.owner}>`
            } break;
        }
        let channels = ``;
        command.allowedchannels.forEach(c => {
            channels += `<#${c}>\n`
        })
        if (command.requirement == `none`) command.requirement = `_Nessun Requisito Necessario_`
        if (command.allowedchannels.includes(`ALL`)) channels = `_Tutti i Canali_`
        let embed = new Discord.MessageEmbed()
            .setTitle(`/${command.name}`)
            .setColor(`YELLOW`)
            .addField(`📋 Utilizzo:`, command.description || `_Nessuna Descrizione_`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`⚔️ Livello di Permesso:`, command.permissionlevel || `_Tutti Possono Usarlo_`, true)
            .addField(`🚨 Requisito Necessario:`, command.requirement || `_Nessun Requisito Necessario_`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`⚓ Canali Concessi`, channels || `_Tutti i Canali_`, true);
        interaction.reply({ embeds: [embed] });
    }
}