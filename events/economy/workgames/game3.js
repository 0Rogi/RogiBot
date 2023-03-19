module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isButton() && interaction.customId.startsWith(`WorkRisolviCalcolo`)) {

            if (!interaction.customId.includes(interaction.user.id)) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante`, ephemeral: true });

            const number1 = Math.floor(Math.random() * (20 - 1) + 1);
            const number2 = Math.floor(Math.random() * (20 - 1) + 1);
            const number3 = Math.floor(Math.random() * (10 - 1) + 1);

            const mode = Math.floor(Math.random() * (3 - 1) + 1);

            const modal = new Discord.Modal()
                .setCustomId(`WorkGame3Modal,${mode > 1 ? `${number1}+${number2}*${number3}` : `(${number1}+${number2})*${number3}`}`)
                .setTitle(`MINIGAME 3`);
            const input = new Discord.TextInputComponent()
                .setCustomId(`InputGame3`)
                .setLabel(`Risolvi: ${mode > 1 ? `${number1}+${number2}*${number3}` : `(${number1}+${number2})*${number3}`}`)
                .setStyle(`SHORT`);

            const row = new Discord.MessageActionRow().addComponents(input);

            modal?.addComponents(row);

            interaction.showModal(modal);
        }

        if (interaction.isModalSubmit() && interaction.customId.startsWith(`WorkGame3Modal`)) {
            const correctResult = eval(interaction.customId.split(`,`)[1])
            const userResult = interaction.fields.getTextInputValue(`InputGame3`);

            if (correctResult == userResult) {
                const money = Math.floor(Math.random() * (15 - 5) + 5);

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:checkmark:1083310732285853766> Risposta Corretta <a:checkmark:1083310732285853766>`)
                    .setDescription(`Giusto!\n**${interaction.customId.split(`,`)[1]}** è uguale a **${correctResult}**\n\nHai guadagnato \`${money}\` **RogiBucks** 🤑`)
                    .setColor(`GREEN`);
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Risolvi Calcolo`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`WorkRisolviCalcolo,${interaction.user.id}`)
                            .setDisabled()
                    );
                interaction.update({ embeds: [embed], components: [row] });

                database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                    $inc: {
                        'economy.money': money,
                    }
                });
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Risposta Errata <a:error:1086952752892092416>`)
                    .setDescription(`Sbagliato!\n\`${interaction.customId.split(`,`)[1]}\` è uguale a \`${correctResult}\` ma tu hai scritto \`${userResult}\` 😔`)
                    .setColor(`RED`);
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Risolvi Calcolo`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`WorkRisolviCalcolo,${interaction.user.id}`)
                            .setDisabled()
                    );
                interaction.update({ embeds: [embed], components: [row] });
            }
        }
    }
}