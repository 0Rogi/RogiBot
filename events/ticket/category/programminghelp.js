module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `CategorieTicket`) {
            if(interaction.values[0] == `programminghelp` || interaction.values[1] == `programminghelp`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setTitle(`⚙️Aiuto sulla programmazione`)
                    .setDescription(`Scegli una sottocategoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                    .addField(`Sottocategorie:`, `*⤷Ho bisogno d'aiuto per un bot\n⤷Ho bisogno d'aiuto per un sito\n⤷Altro...*`)
                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`SottocategorieTicket`)
                    .setPlaceholder(`Seleziona una sottocategoria`)
                    .addOptions([
                        {
                            label: `🔹Ho bisogno d'aiuto per creare un bot`,
                            description: `Aiuto per creare un bot`,
                            value: `helpbot`
                        },
                        {
                            label: `🔹Ho bisogno d'aiuto per creare un sito`,
                            description: `Aiuto per creare un sito web`,
                            value: `helpweb`
                        },
                        {
                            label: `🔹Altro...`,
                            value: `Other`
                        }
                    ])
                let row = new Discord.MessageActionRow()
                    .addComponents(menu)
                interaction.update({embeds: [embed], components: [row]})
            }
        }
    }
}