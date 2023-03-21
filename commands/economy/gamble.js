const config = require(`${process.cwd()}/JSON/config.json`);
const moment = require(`moment`);

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

                let inCooldown = false;
                let cooldown;
                if (gambleCooldown.has(interaction.user.id)) {
                    cooldown = gambleCooldown.get(interaction.user.id);
                    new Date().getTime() > cooldown ? inCooldown = false : inCooldown = true;
                }

                if (inCooldown) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:1086952752892092416> Sei in cooldown <a:error:1086952752892092416>`)
                        .setDescription(`_Potrai usare di nuovo \`/gamble\` il ${moment(cooldown).format(`DD/MM/YYYY hh:mm:ss A`)}_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                gambleCooldown.set(interaction.user.id, new Date().getTime() + 1000 * 60 * 30);

                let won = false;
                const random = Math.random();

                if (moneyToBet >= 1 && moneyToBet <= 10 && random < 0.5) {
                    won = true;
                } else if (moneyToBet >= 11 && moneyToBet <= 50 && random < 0.1) {
                    won = true;
                } else if (moneyToBet >= 51 && moneyToBet <= 100 && random < 0.05) {
                    won = true;
                } else if (moneyToBet >= 101 && moneyToBet <= 999 && random < 0.01) {
                    won = true;
                } else if (moneyToBet >= 1000 && random < 0.005) {
                    won = true;
                }

                if (won) {

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': moneyToBet,
                        }
                    });

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥳 Hai Vinto 🥳`)
                        .setDescription(`👏 Complimenti!\nHai **vinto** \`${moneyToBet}\` RogiBucks`)
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