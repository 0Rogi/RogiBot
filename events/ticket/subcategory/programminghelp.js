module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `SottocategorieTicket`) {
            if(interaction.values[0] == `helpbot` || interaction.values[1] == `helpbot`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🤖Aiuto per creare un bot`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket\n**N.B.** Questo è un server dedicato a minecraft e ai video di Rogi, quindi non alla programmazione, ti aiuteremo comunque, ma sarebbe meglio chiedere in un server di programmazione`)
                    .setColor(`YELLOW`)
                    .addField(`__💾Prova a salvare i file__`, `La maggior parte delle volte i problemi con il bot sono causati dal fatto che i file non siano stati salvati, quindi controlla di aver premuto control + s`)
                    .addField(`__💻Assicurati di conoscere javascript e discord.js__`, `Se pensi di creare un bot senza conoscere affatto javascript e la api di discord, stai sbagliando, quindi prima di chiedere aiuto, assicurati che tu conosca javascript e l'api di discord`)
                    .addField(`__😕Non sai creare una funzione?__`, `Se non sai come creare una funzione ed è un qualcosa di troppo difficile per te, lascia stare, parti dalle cose più basilari, se pendi che è una cosa che tu possa riuscire a fare, apri il ticket`)
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
            if(interaction.values[0] == `helpweb` || interaction.values[1] == `helpweb`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`📶Aiuto per creare un sito`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket\n**N.B.** Questo è un server dedicato a minecraft e ai video di Rogi, quindi non alla programmazione, ti aiuteremo comunque, ma sarebbe meglio chiedere in un server di programmazione`)
                    .setColor(`YELLOW`)
                    .addField(`__Vuoi creare un sito e non sai come fare__`, `Se desideri creare un sito ma non hai la minima idea di cosa fare, prima di aprire il ticket, vai a studiare html e css, due linguaggi di programmazione per creare siti web`)
                    .addField(`__😕Non sai creare una funzione?__`, `Se non sai come creare una funzione ed è un qualcosa di troppo difficile per te, lascia stare, parti dalle cose più basilari, se pendi che è una cosa che tu possa riuscire a fare, apri il ticket`)
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