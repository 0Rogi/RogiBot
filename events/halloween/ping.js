module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (!interaction.isSelectMenu()) return;

        if (interaction.customId.startsWith(`HalloweenPing`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) {
                interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo menù!`, ephemeral: true });
                return;
            }
            if (interaction.values[0] == `HalloweenZombiePing`) {
                if (interaction.member.roles.cache.has(`1033320608060153997`)) {
                    interaction.member.roles.remove(`1033320608060153997`);
                    interaction.reply({ content: `Ruolo <@&1033320608060153997> rimosso!`, ephemeral: true });
                    return;
                } else {
                    interaction.member.roles.add(`1033320608060153997`);
                    interaction.reply({ content: `Ruolo <@&1033320608060153997> aggiunto!`, ephemeral: true });
                }
            }
            if (interaction.values[0] == `HalloweenMissionPing`) {
                if (interaction.member.roles.cache.has(`1033320600271323227`)) {
                    interaction.member.roles.remove(`1033320600271323227`);
                    interaction.reply({ content: `Ruolo <@&1033320600271323227> rimosso!`, ephemeral: true });
                    return;
                } else {
                    interaction.member.roles.add(`1033320600271323227`);
                    interaction.reply({ content: `Ruolo <@&1033320600271323227> aggiunto!`, ephemeral: true });
                }
            }
        }
    }
}