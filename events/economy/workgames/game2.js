module.exports = {
    name: `interactionCreate`,
    execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isButton() && interaction.customId.startsWith(`Workgame2`)) {

            if (!interaction.customId.includes(interaction.user.id)) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante`, ephemeral: true });

            const currentWord = parseInt(interaction.message.embeds[0].footer.text.slice(15, 16));

            const oldrow = interaction.message.components[0].components;

            let row = new Discord.MessageActionRow();

            if (currentWord == parseInt(interaction.customId.split(`,`)[3])) {

                let embed = interaction.message.embeds[0].setFooter({ text: `Parole Giuste: ${currentWord + 1}/3` });

                oldrow.forEach(b => {
                    if (b.customId == interaction.customId) {

                        b.setStyle(`SUCCESS`);

                        b.setDisabled();

                    }

                    row.addComponents(b);
                });

                if (currentWord + 1 == 3) {
                    const money = Math.floor(Math.random() * (13 - 7) + 7);

                    embed
                        .setTitle(`🥳 GIOCO COMPLETATO 🥳`)
                        .setDescription(`Hai **finito** il **gioco** con successo!\n\nHai guadagnato \`${money}\` **RogiBucks** ! 🤑`)
                        .setColor(`GREEN`);

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': money,
                        }
                    });
                }

                interaction.update({ embeds: [embed], components: [row] })

            } else {
                oldrow.forEach(b => {
                    if (b.style == `SUCCESS`) return row.addComponents(b);
                    if (b.customId == interaction.customId) b.setStyle(`DANGER`);

                    b.setDisabled();

                    row.addComponents(b);
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> RISPOSTA SBAGLIATA <a:error:1086952752892092416>`)
                    .setDescription(`Hai risposto in modo sbagliato 😕`)
                    .setColor(`RED`);

                interaction.update({ components: [row], embeds: [embed] });
            }
        }
    }
}