module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (interaction.customId == `BigOpen`) {
            interaction.reply({ content: `<a:error:966371274853089280> Questo pulsante è disabilitato 😔`, ephemeral: true })
        }
        if (interaction.customId == `HalloweenPumpkinAnnounce`) {
            interaction.reply({ content: `<a:error:966371274853089280> Questo pulsante è disabilitato 😔`, ephemeral: true })
        }
    }
}