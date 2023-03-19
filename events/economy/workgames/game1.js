module.exports = {
    name: `interactionCreate`,
    execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (!interaction.isButton()) return;

        if (interaction.customId.split(`,`)[1] == interaction.user.id) {

            if (interaction.customId.split(`,`)[0] == `CorrectWork`) {

                const oldrow1 = interaction.message.components[0].components;
                const oldrow2 = interaction.message.components[1].components;

                let row1 = new Discord.MessageActionRow();
                let row2 = new Discord.MessageActionRow();

                oldrow1.forEach(b => {
                    if (b.customId.includes(`Correct`)) {
                        b.setStyle(`SUCCESS`);
                    }

                    b.setDisabled();

                    row1.addComponents(b);
                });

                oldrow2.forEach(b => {
                    if (b.customId.includes(`Correct`)) {
                        b.setStyle(`SUCCESS`);
                    }

                    b.setDisabled();

                    row2.addComponents(b);
                });

                const money = Math.floor(Math.random() * (10 - 5) + 5);

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:checkmark:1083310732285853766> Risposta Corretta <a:checkmark:1083310732285853766>`)
                    .setDescription(`Bravo! Hai risposto **correttamente**!\n\nHai guadagnato \`${money}\` **RogiBucks** ! 🤑`)
                    .setColor(`GREEN`);
                database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                    $inc: {
                        'economy.money': money,
                    }
                });

                interaction.update({ components: [row1, row2], embeds: [embed] });

            } else if (!interaction.customId.includes(`Correct`) && interaction.customId.includes(`Work`) && interaction.customId != `Workgame2` && !interaction.customId.startsWith(`WorkRisolviCalcolo`)) {

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Risposta Sbagliata <a:error:1086952752892092416>`)
                    .setDescription(`Hai sbagliato... 😐`)
                    .setColor(`RED`);

                const oldrow1 = interaction.message.components[0].components;
                const oldrow2 = interaction.message.components[1].components;
                let row1 = new Discord.MessageActionRow();
                let row2 = new Discord.MessageActionRow();

                oldrow1.forEach(b => {
                    if (b.customId.includes(`Correct`)) {
                        b.setStyle(`SUCCESS`);
                    }

                    if (b.customId == interaction.customId) {
                        b.setStyle(`DANGER`)
                    }

                    b.setDisabled();

                    row1.addComponents(b);
                });

                oldrow2.forEach(b => {
                    if (b.customId.includes(`Correct`)) {
                        b.setStyle(`SUCCESS`);
                    }

                    if (b.customId == interaction.customId) {
                        b.setStyle(`DANGER`)
                    }

                    b.setDisabled();

                    row2.addComponents(b);
                });

                interaction.update({ components: [row1, row2], embeds: [embed] });
            }
        }
    }
}