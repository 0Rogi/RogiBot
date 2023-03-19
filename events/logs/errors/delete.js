const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `Elimina`) {
            if (interaction.guild == config.idServer.idServer && !interaction.member.roles.cache.has(config.rolesid.owner)) return interaction.reply({ ephemeral: true, content: `<a:error:1086952752892092416> Non puoi eliminare questo messaggio` })
            interaction.message.delete().catch(() => { })
        }
    }
}