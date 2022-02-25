module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `SottocategorieTicket`) {
            if(interaction.values[0] == `userreport` || interaction.values[1] == `userreport`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👥Domande allo staff\n🧑Segnala un utente`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                    .setColor(`YELLOW`)
                    .addField(`__⚠️Un utente ti sta dando fastidio nel server__`, `Se un utente ti sta dando fastidio all'interno del server, non aprire un ticket, cercate di risolverla tra voi, o se la situazione degenera, pinga **un** membro dello staff, possibilmente online, che provvederà`)
                    .addField(`__👤Un utente potenzialmente "pericoloso" è all'interno di questo server__`, `Se c'è un utente potenzialmente pericoloso all'interno di questo server, apri il ticket, però assicurati di avere delle prove prima di segnalare quest'utente`)
                    .addField(`😩Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                let button1 = new Discord.MessageButton()
                    .setStyle(`DANGER`)
                    .setLabel(`Problema risolto`)
                    .setCustomId(`Solved`)
                let button2 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setLabel(`Apri Ticket`)
                    .setCustomId(`Open`)
                let row = new Discord.MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)
                interaction.update({embeds: [embed], components: [row]})
            }   
            if(interaction.values[0] == `wantstaff` || interaction.values[1] == `wantstaff`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👥Domande allo staff\n🔨Diventare uno staffer`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                    .setColor(`YELLOW`)
                    .addField(`__❗Vuoi diventare un helper?__`, `Se desideri diventare un helper, appena ci sarà bisogno di un nuovo staffer, potrai fare la candidatura!`)
                    .addField(`__🛡️Vuoi diventare moderatore?__`, `Per poter diventare moderatore, devi prima essere helper, dopo di che se Rogi lo vorrà, potrai essere un moderatore`)
                    .addField(`😩Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                let button1 = new Discord.MessageButton()
                    .setStyle(`DANGER`)
                    .setLabel(`Problema risolto`)
                    .setCustomId(`Solved`)
                let button2 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setLabel(`Apri Ticket`)
                    .setCustomId(`Open`)
                let row = new Discord.MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)
                interaction.update({embeds: [embed], components: [row]})
            }
            if(interaction.values[0] == `wantcollab` || interaction.values[1] == `wantcollab`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👥Domande allo staff\n🤝Facciamo una collaborazione`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                    .setColor(`YELLOW`)
                    .addField(`__🔴Voglio far parte di un video di Rogi__`, `Se desideri far parte di un video di Rogi, sappi che fa entrare nei suoi video solo i suoi amici, quindi è difficile che tu riesca ad entrare nei video`)
                    .addField(`__🛡️Voglio fare una proposta a Rogi__`, `Vuoi fare una proposta a Rogi di qualunque tipo? Allora apri pure il ticket`)
                    .addField(`__💜Voglio fare partnership con questo server__`, `Vuoi fare partner con questo server? Allora apri il ticket e manda la tua descrizione, dopo aspetta che <@816218053112496188> risponda!`)
                    .addField(`😩Non hai ancora risolto il tuo problema?`, `Se non hai ancora risolto il problema, premi il **pulsante** qui sotto e apri effettivamente il ticket per parlare con lo staff`)
                let button1 = new Discord.MessageButton()
                    .setStyle(`DANGER`)
                    .setLabel(`Problema risolto`)
                    .setCustomId(`Solved`)
                let button2 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setLabel(`Apri Ticket`)
                    .setCustomId(`Open`)
                let row = new Discord.MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)
                interaction.update({embeds: [embed], components: [row]})
            }
        }
    }
}