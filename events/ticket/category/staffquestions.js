module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `CategorieTicket`) {
            if(interaction.values[0] == `staffquestions` || interaction.values[1] == `staffquestions`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`YELLOW`)
                    .setTitle(`👥Domande allo staff`)
                    .setDescription(`Scegli una sottocategoria, in modo da poter avere delle **possibili soluzioni** prima di aprire il ticket`)
                    .addField(`Sottocategorie:`, `*⤷Voglio segnalare un utente\n⤷Posso far parte dello staff?\n⤷Facciamo una collaborazione?\n⤷Altro...*`)
                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`SottocategorieTicket`)
                    .setPlaceholder(`Seleziona una sottocategoria`)
                    .addOptions([
                        {
                            label: `Voglio segnalare un utente`,
                            description: `Segnala un utente pericoloso`,
                            value: `userreport`,
                            emoji: `🔹`
                        },
                        {
                            label: `Posso far parte dello staff?`,
                            description: `Chiedi di diventare Mod o Helper`,
                            value: `wantstaff`,
                            emoji: `🔹`
                        },
                        {
                            label: `Facciamo una collaborazione?`,
                            description: `Chiedi di fare una collaborazione`,
                            value: `wantcollab`,
                            emoji: `🔹`
                        },
                        {
                            label: `Altro...`,
                            emoji: `🔹`,
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