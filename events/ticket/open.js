module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `Open` || interaction.customId == `SottocategorieTicket` && interaction.values[0] == `Other` || interaction.customId == `SottocategorieTicket` && interaction.values[1] == `Other`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket Aperto`)
                .setColor(`GREEN`)
                .setDescription(`Il tuo ticket è stato **aperto**, ora puoi parlare con lo staff\n\n📜**Regole del ticket**\n1) Ricorda sempre che la persona con cui parlerai, è un essere umano come te, quindi non è assicurato che riusciremo ad aiutarti;\n2) Ricorda di essere educato;\n3) Non dire: "Posso fare una domanda?" "Posso chiedere aiuto?" ma espondi direttamente il tuo problema o la tua domanda`)
            let button = new Discord.MessageButton()
                .setLabel(`Chiudi Ticket`)
                .setStyle(`DANGER`)
                .setCustomId(`ChiudiTicket`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            interaction.update({embeds: [embed], components: [row]})
            interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                },
                {
                    id: interaction.user.id,
                    allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                },
                {
                    id: config.idruoli.staff,
                    allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `ATTACH_FILES`]
                }
            ])
        }
    }
}