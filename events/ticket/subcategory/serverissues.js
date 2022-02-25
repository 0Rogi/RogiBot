module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `SottocategorieTicket`) {
            if(interaction.values[0] == `botbugs` || interaction.values[1] == `botbugs`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👀Problemi nel server\n🤖Bug nel bot`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                    .setColor(`YELLOW`)
                    .addField(`__🔴Il bot è offline__`, `Se stai avendo problemi con il bot, è probabile che il bot sia in fase di test, quindi attendi una mezz'oretta e tutto ritornerà come prima!`)
                    .addField(`__⚠️Non puoi usare alcuni comandi__`, `Se non puoi usare alcuni comandi, è possibile che siano dei comandi riservati allo staff o per usarli hai bisogno di un determinato livello`)
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
            if(interaction.values[0] == `serverbug` || interaction.values[1] == `serverbug`) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👀Problemi nel server\n🎡Bug nel server`)
                    .setDescription(`🧠Prima di parlare con lo staff, cerca di risolvere il tuo problema da solo\nEcco dei piccoli consigli **che possono** aiutarti prima di aprire il ticket`)
                    .setColor(`YELLOW`)
                    .addField(`__💢Puoi vedere qualche chat che non dovresti__`, `Se il tuo problema è che riesci a vedere qualche chat che non dovresti, è possibile che ci siano dei test in corso`)
                    .addField(`__❕Non posso usare le ricompense dei livelli__`, `Se non puoi usare alcune ricompense, prima di aprire il ticket, assicurati che tu abbia il livello necessario`)
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