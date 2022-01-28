module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `Elimina`) {
            let message = interaction.message
            message.delete()
        }
    }
}