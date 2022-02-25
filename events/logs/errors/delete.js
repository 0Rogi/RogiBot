module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.guild != config.idServer.idServer || !interaction.isButton()) return
        if(interaction.customId == `Elimina`) {
            if(interaction.channel != config.idcanali.logs.codeerror && interaction.user.id != config.rogi) return interaction.deferUpdate()
            let message = interaction.message
            message.delete()
        }
    }
}