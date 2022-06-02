module.exports = {
    name: `snipe`,
    data: {
        name: `snipe`,
        description: `Mostra l'ultimo messaggio eliminato nel server`,
    },
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(() => {
            if (serverstats.snipe.cleared) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Snipe`)
                    .setDescription(`<a:error:966371274853089280>L'ultimo messaggio eliminato, è stato **nascosto da un moderatore**!\n**Non è possibile vederlo**.`)
                    .setColor(`YELLOW`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Snipe`)
                .setDescription(`Ecco l'**ultimo messaggio eliminato** nel server`)
                .addField(`Utente:`, ` <@${serverstats.snipe.author}>`, true)
                .addField(`Contenuto:`, `${serverstats.snipe.message}`, true)
                .addField(`Canale:`, `<#${serverstats.snipe.channel}>`, true)
                .setColor(`YELLOW`)
            interaction.editReply({ embeds: [embed] })
        })
    }
}