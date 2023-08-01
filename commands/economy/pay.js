const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `pay`,
    description: `Paga qualcuno con i tuoi RogiBucks`,
    data: {
        name: `pay`,
        description: `Paga qualcuno utilizzando i tuoi RogiBucks`,
        options: [
            {
                name: `utente`,
                description: `L'utente da pagare`,
                type: `USER`,
                required: true,
            },
            {
                name: `soldi`,
                description: `Soldi da pagare all'utente selezionato`,
                type: `NUMBER`,
                required: true,
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser(`utente`);
        const money = interaction.options.getNumber(`soldi`);

        if (user == interaction.user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                .setDescription(`_Non puoi pagare te stesso!_`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(async function (err, result) {
            if (err || !result[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                    .setDescription(`_Non hai abbastanza RogiBucks per pagare \`${money}\` a ${user.toString()}!_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
            } else if (result[0]) {

                const userMoney = result[0]?.economy?.money || 0;

                if (userMoney < money) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                        .setDescription(`_Non hai abbastanza RogiBucks per pagare \`${money}\` a ${user.toString()}!_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                } else {
                    await database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': -money,
                        }
                    });

                    await database.collection(`UserStats`).updateOne({ id: user.id }, {
                        $inc: {
                            'economy.money': money,
                        }
                    });

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Pagamento Effettuato`)
                        .setDescription(`Hai pagato \`${money}\` a ${user.toString()}!`)
                        .setColor(`GREEN`);
                    interaction.editReply({ embeds: [embed] });
                }
            }
        });
    }
}