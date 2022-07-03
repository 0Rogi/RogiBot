const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `Elimina`) {
            if (interaction.channel == config.idServer.idServer && !interaction.member.roles.cache.has(config.idruoli.owner)) return interaction.deferUpdate()
            interaction.message.delete().catch(() => { })
        }
    }
}