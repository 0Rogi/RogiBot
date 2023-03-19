const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `gamble`,
    description: `Scommetti dei RogiBucks`,
    data: {
        name: `gamble`,
        description: `Scommetti i tuoi RogiBucks!`,
        options: [
            {
                name: `soldi`,
                description: `I RogiBucks da scommettere`,
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

        const moneyToBet = interaction.options.getNumber(`soldi`);

        database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(function (err, result) {
            if (err || !result[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                    .setDescription(`_Hai scommesso troppi soldi, non ne hai abbastanza!_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
            } else if (result[0]) {

                const userMoney = result[0]?.economy?.money || 0;

                if (moneyToBet > userMoney) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                        .setDescription(`_Hai scommesso troppi RogiBucks, non ne hai abbastanza!_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                if (Math.round(Math.random()) == 1) {

                    const wonMoney = moneyToBet * 2;

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': wonMoney,
                        }
                    });

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥳 Hai Vinto 🥳`)
                        .setDescription(`👏 Complimenti!\nHai **vinto** \`${wonMoney}\``)
                        .setColor(`YELLOW`);
                    interaction.editReply({ embeds: [embed] });

                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`😕 Hai Perso 😕`)
                        .setDescription(`Mi **dispiace**!\nHai perso \`${moneyToBet}\` RogiBucks 😞`)
                        .setColor(`YELLOW`);
                    interaction.editReply({ embeds: [embed] });

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': -moneyToBet,
                        }
                    });
                }
            }
        });
    }
}