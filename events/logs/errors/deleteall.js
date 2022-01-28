module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `EliminaTutti`) {
            let message = interaction.message
            let field = message.embeds[0].fields[1].value
            client.channels.cache.get(config.idcanali.codeerror).messages.fetch()
            .then(messages => {
                messages.forEach(msg => {
                    try {
                        if (msg.embeds[0].fields[1].value == field) msg.delete()
                    } catch {

                    }
                });
            })
        }
    }
}