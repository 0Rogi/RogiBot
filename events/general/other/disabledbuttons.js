module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (interaction.customId == `BigOpen`) {
            interaction.reply({ content: `<a:error:1086952752892092416> Questo pulsante è disabilitato 😔`, ephemeral: true })
        }
        if (interaction.customId == `HalloweenPumpkinAnnounce`) {
            interaction.reply({ content: `<a:error:1086952752892092416> Questo pulsante è disabilitato 😔`, ephemeral: true })
        }
    }
}