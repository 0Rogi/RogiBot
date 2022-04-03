const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `CategorieTicket`) {
            if(interaction.values[0] == `serverissues` || interaction.values[1] == `serverissues`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setTitle(`👀Problemi nel server`)
                    .setDescription(`Scegli una sottocategoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                    .addField(`Sottocategorie:`, `*⤷Ho riscontrato un bug all'interno del bot\n⤷Ho riscontrato un bug all'interno del server\n⤷Altro...*`)
                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`SottocategorieTicket`)
                    .setPlaceholder(`Seleziona una sottocategoria`)
                    .addOptions([
                        {
                            label: `Ho riscontrato un bug all'interno del bot`,
                            value: `botbugs`,
                            descritpion: `Problemi con il bot`,
                            emoji: `🔹`
                        },
                        {
                            label: `Ho riscontrato un bug all'interno del server`,
                            value: `serverbug`,
                            descritpion: `Problemi con il server`,
                            emoji: `🔹`
                        },
                        {
                            label: `Altro...`,
                            value: `Other`,
                            emoji: `🔹`
                        }
                    ])
                let row = new Discord.MessageActionRow()
                    .addComponents(menu)
                interaction.update({embeds: [embed], components: [row]})
            }
        }
    }
}