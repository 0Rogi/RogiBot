const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        //? Check if maintenance is enabled or not
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        //? Check if the button is the correct one
        if (!interaction.isButton()) return;
        if (interaction.customId == `HalloweenPumpkinAnnounce`) {
            //? Create 2 random rows, with 6 buttons
            let button1 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setEmoji(`<:candy1:1036233375092052048>`)
                .setCustomId(`HalloweenCandy1`);
            let button2 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setEmoji(`<:candy2:1036233376610394142>`)
                .setCustomId(`HalloweenCandy2`);
            let button3 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setEmoji(`<:candy3:1036233378183258172>`)
                .setCustomId(`HalloweenCandy3`);
            let button4 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setEmoji(`<:candy4:1036233379739344906>`)
                .setCustomId(`HalloweenCandy4`);
            let button5 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setEmoji(`<:candy5:1036233397921652767>`)
                .setCustomId(`HalloweenCandy5`);
            let button6 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setEmoji(`<:candy6:1036233410861076550>`)
                .setCustomId(`HalloweenCandy6`);
            let row1a = new Discord.MessageActionRow();
            let row1b = new Discord.MessageActionRow();
            let row2a = new Discord.MessageActionRow();
            let row2b = new Discord.MessageActionRow();
            row1a.addComponents(button3, button1, button2);
            row1b.addComponents(button2, button3, button1);
            row2a.addComponents(button4, button6, button5);
            row2b.addComponents(button5, button6, button4);
            let row1 = [row1a, row1b];
            let row2 = [row2a, row2b];
            row1 = row1[Math.floor(Math.random() * row1.length)];
            row2 = row2[Math.floor(Math.random() * row2.length)];
            //? Create the embed with the question
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:question:1036238504650358864> DOMANDA NUMERO 1 <:question:1036238504650358864>`)
                .setDescription(`La prima domanda è molto semplice, qual è la **caramella preferita** da questo **mostro**? *(se proprio non riesci a capirlo, puoi usare l'indizio qui sotto 🫣)*\n\n**INDIZIO:** ||L'unica presente anche nell'immagine del mostro 🙃||`)
                .setColor(`ORANGE`);
            //? Send the embed and the buttons
            interaction.reply({ components: [row1, row2], ephemeral: true, embeds: [embed] })
        } else if (interaction.customId == `HalloweenCandy2` || interaction.customId == `HalloweenCandy3` || interaction.customId == `HalloweenCandy4` || interaction.customId == `HalloweenCandy5` || interaction.customId == `HalloweenCandy6`) { //? Se la risposta è sbagliata
            //? Dice che la risposta è sbagliata
            interaction.update({ content: `<a:error:966371274853089280> Risposta errata 😐`, ephemeral: true, components: [], embeds: [] });
            //? Mette in timeout per 20 secondi
            interaction.member.timeout(1000 * 20, `Risposta Sbagliata`).catch(() => { });
        } else if (interaction.customId == `HalloweenCandy1`) { //? Se la risposta è giusta
            //? Dice che la risposta è corretta
            interaction.update({ content: `<a:checkmark:970022827866611762> Risposta corretta 🥳`, ephemeral: true, components: [], embeds: [] });
            //? Create 2 random rows, with 6 buttons for the second question
            let button1 = new Discord.MessageButton()
                .setLabel(`Webfigure`)
                .setCustomId(`Webfigure`)
                .setStyle(`SECONDARY`);
            let button2 = new Discord.MessageButton()
                .setLabel(`Gooling`)
                .setCustomId(`Gooling`)
                .setStyle(`SECONDARY`);
            let button3 = new Discord.MessageButton()
                .setLabel(`Acidling`)
                .setCustomId(`Acidling`)
                .setStyle(`SECONDARY`);
            let button4 = new Discord.MessageButton()
                .setLabel(`Piketoe`)
                .setCustomId(`Piketoe`)
                .setStyle(`SECONDARY`);
            let button5 = new Discord.MessageButton()
                .setLabel(`Bighog`)
                .setCustomId(`Bighog`)
                .setStyle(`SECONDARY`);
            let button6 = new Discord.MessageButton()
                .setLabel(`Auraclaw`)
                .setCustomId(`Auraclaw`)
                .setStyle(`SECONDARY`);
            let row1a = new Discord.MessageActionRow();
            let row1b = new Discord.MessageActionRow();
            let row2a = new Discord.MessageActionRow();
            let row2b = new Discord.MessageActionRow();
            row1a.addComponents(button3, button1, button2);
            row1b.addComponents(button2, button3, button1);
            row2a.addComponents(button4, button6, button5);
            row2b.addComponents(button5, button6, button4);
            let row1 = [row1a, row1b];
            let row2 = [row2a, row2b];
            row1 = row1[Math.floor(Math.random() * row1.length)];
            row2 = row2[Math.floor(Math.random() * row2.length)];
            //? Create the embed with the question
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:question:1036238504650358864> DOMANDA NUMERO 2 <:question:1036238504650358864>`)
                .setDescription(`Devi rispondere ad altre **2 domande** prima di ricevere i tuoi **punti** 👀, ecco a te la **seconda domanda**:\n\nQual è il nome del **mostro**? *(se proprio non riesci a capirlo, puoi usare l'indizio qui sotto 🫣)*\n\n**INDIZIO:** ||Leggi l'annuncio, è scritto lì 😌||`)
                .setColor(`ORANGE`);
            //? Send the embed and the buttons
            setTimeout(() => {
                interaction.editReply({ embeds: [embed], components: [row1, row2] });
            }, 1000 * 2)
        } else if (interaction.customId == `Webfigure` || interaction.customId == `Gooling` || interaction.customId == `Acidling` || interaction.customId == `Piketoe` || interaction.customId == `Auraclaw`) { //? Se la risposta è sbagliata
            //? Dice che la risposta è sbagliata
            interaction.editReply({ content: `<a:error:966371274853089280> Risposta errata 😐`, ephemeral: true, components: [], embeds: [] });
            //? Mette in timeout per 20 secondi
            interaction.member.timeout(1000 * 20, `Risposta Sbagliata`).catch(() => { });
        } else if (interaction.customId == `Bighog`) {  //? Se la risposta è giusta
            //? Dice che la risposta è corretta
            interaction.update({ content: `<a:checkmark:970022827866611762> Risposta corretta 🥳`, ephemeral: true, components: [], embeds: [] });
            //? Create 2 random rows, with 6 buttons for the last question
            let button1 = new Discord.MessageButton()
                .setLabel(`Gabvy`)
                .setCustomId(`Gabvy`)
                .setEmoji(`<:Gabvy:1036313717694009364>`)
                .setStyle(`PRIMARY`);
            let button2 = new Discord.MessageButton()
                .setLabel(`BLuu`)
                .setCustomId(`BLuu`)
                .setEmoji(`<:BLuu:1036313716410568744>`)
                .setStyle(`PRIMARY`);
            let button3 = new Discord.MessageButton()
                .setLabel(`Rogi`)
                .setCustomId(`Rogi`)
                .setEmoji(`<:Rogi:1036313719149449326>`)
                .setStyle(`PRIMARY`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2, button3);
            //? Create the embed with the question
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:question:1036238504650358864> DOMANDA NUMERO 3 <:question:1036238504650358864>`)
                .setDescription(`Devi rispondere a **quest'ultima domanda** prima di ricevere i tuoi **punti** 👀, ecco a te l'**ultima domanda**:\n\nQual è stata l'ultima vittima del **mostro**? *(se proprio non riesci a capirlo, puoi usare l'indizio qui sotto 🫣)*\n\n**INDIZIO:** ||Leggi sopra la tomba 🤦‍♂️||`)
                .setColor(`ORANGE`);
            //? Send the embed and the buttons
            setTimeout(() => {
                interaction.editReply({ embeds: [embed], components: [row] });
            }, 1000 * 2)
        } else if (interaction.customId == `Gabvy` || interaction.customId == `BLuu`) { //? Se la risposta è sbagliata
            //? Dice che la risposta è sbagliata
            interaction.editReply({ content: `<a:error:966371274853089280> Risposta errata 😐`, ephemeral: true, components: [], embeds: [] });
            //? Mette in timeout per 20 secondi
            interaction.member.timeout(1000 * 20, `Risposta Sbagliata`).catch(() => { });
        } else if (interaction.customId == `Rogi`) { //? Se la risposta è giusta
            //? Dice che la risposta è corretta
            interaction.update({ content: `<a:checkmark:970022827866611762> Risposta corretta 🥳`, ephemeral: true, components: [], embeds: [] });
            //? Give the points

            //? Find userstats
            let userstats;
            serverstats.halloweenevent.forEach(user => {
                if (user.id == interaction.user.id) {
                    userstats = user;
                }
            })

            //? Store points in the database
            if (!userstats) {
                userstats = {
                    username: interaction.user.username,
                    id: interaction.user.id,
                    missioncompleted: 0,
                    points: 100,
                    skeletons: {
                        found: 0,
                        messages: [],
                    },
                    batkilled: false,
                    ghostfound: false,
                    pumpkins: 0,
                    potions: 0,
                    inventory: {
                        object1: 0,
                        object2: 0,
                    },
                    killedzombies6: 0,
                    candies: 0,
                    killedmob: true,
                }
                database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                setTimeout(() => {
                    interaction.editReply({ content: `Hai guadagnato ben 100 punti! ⭐` })
                }, 2000)
                return;
            }

            if (userstats) {
                if (userstats.killedmob) {
                    setTimeout(() => {
                        interaction.editReply({ content: `Uhm... l'hai già ucciso il mostro tu...`, ephemeral: true });
                    }, 2000)
                    return;
                }
                let pointstoadd = (Math.floor(5 * userstats.points * 0.1));
                userstats.points = pointstoadd + userstats.points;
                userstats.killedmob = true;
                setTimeout(() => {
                    interaction.editReply({ content: `Hai guadagnato ben **${pointstoadd}** punti! ⭐` });
                }, 2000)
                await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: interaction.user.id } } });
                database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                return;
            }
        }
    }
}