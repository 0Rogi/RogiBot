const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.guild != config.idServer.idServer || !interaction.isButton()) return
        if(interaction.customId == `EliminaTutti`) {
            let message = interaction.message
            let field = message.embeds[0].fields[1].value
            client.channels.cache.get(config.idcanali.logs.codeerror).messages.fetch()
            .then(messages => {
                messages.forEach(msg => {
                    try {
                        if (msg.embeds[0].fields[1].value == field) msg.delete().catch(() => {})
                    } catch {

                    }
                })
            })
        }
    }
}