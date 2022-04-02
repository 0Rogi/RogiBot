const discordModals = require(`discord-modals`)
discordModals(client)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isButton() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `Candidati`) {
            if(!interaction.member.roles.cache.has(config.idruoli.page1) && !interaction.member.roles.cache.has(config.idruoli.page2)) {
                let modal = new discordModals.Modal()
                .setCustomId(`CandidatiPage1`)
                .setTitle(`Domande Personali (Diventa uno Staffer)`)
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question1`)
                    .setLabel(`Che ruolo vorresti interpretare?`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question2`)
                    .setLabel(`Perchè vorresti diventare uno staffer?`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question3`)
                    .setLabel(`Quanto tempo saresti disposto a dedicare?`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question4`)
                    .setLabel(`Parlaci di te (se vuoi)`)
                    .setStyle(`LONG`)
                    .setRequired(false)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                discordModals.showModal(modal, {
                    client: client,
                    interaction: interaction
                })
            }
            if(interaction.member.roles.cache.has(config.idruoli.page1) && !interaction.member.roles.cache.has(config.idruoli.page2)) {
                let modal = new discordModals.Modal()
                    .setCustomId(`CandidatiPage2`)
                    .setTitle(`Abilità (Diventa uno Staffer)`)
                    .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question1`)
                    .setLabel(`In caso ci fosse un raid, cosa faresti?`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question2`)
                    .setLabel(`Due utenti stanno litigando, cosa faresti?`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question3`)
                    .setLabel(`"Voglio fare partnership" Cosa risponderesti`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                .addComponents(new discordModals.TextInputComponent()
                    .setCustomId(`Question4`)
                    .setLabel(`Sei mai stato staffer in altri server?`)
                    .setStyle(`LONG`)
                    .setRequired(true)
                    .setMinLength(1)
                    .setMaxLength(1024)
                )
                discordModals.showModal(modal, {
                    client: client,
                    interaction: interaction
                })
            }
            if(interaction.member.roles.cache.has(config.idruoli.page1) && interaction.member.roles.cache.has(config.idruoli.page2)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Hai già risposto a tutte le domande,\nattendi una risposta dallo staff*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
}