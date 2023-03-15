const config = require(`${process.cwd()}/JSON/config.json`);
const moment = require(`moment`);

module.exports = {
    name: `daily`,
    description: `Riscatta i tuoi RogiBucks giornalieri`,
    data: {
        name: `daily`,
        description: `Riscatta i tuoi RogiBucks giornalieri`
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(function (err, result) {
            if (err || !result[0]) {

                database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                    $inc: {
                        'economy.money': 20
                    }
                });

                database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                    $set: {
                        'economy.daily': new Date().getTime() + 1000 * 60 * 60 * 24,
                    }
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle(`RogiBucks Riscattati`)
                    .setDescription(`Hai riscattato i tuoi **20 RogiBucks** giornalieri!`)
                    .setColor(`YELLOW`);
                interaction.editReply({ embeds: [embed] });

            } else if (result[0]) {

                const dailyCooldown = result[0]?.economy?.daily || 0;

                if (new Date().getTime() > dailyCooldown) {

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': 20
                        }
                    });

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'economy.daily': new Date().getTime() + 1000 * 60 * 60 * 24,
                        }
                    });

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Soldi Riscattati`)
                        .setDescription(`Hai riscattato i tuoi **20 RogiBucks** giornalieri!`)
                        .setColor(`YELLOW`);
                    interaction.editReply({ embeds: [embed] });

                } else {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:966371274853089280> Sei in cooldown <a:error:966371274853089280>`)
                        .setDescription(`_Hai già riscattato i tuoi RogiBucks giornalieri nelle ultime 24 ore!_\n\n_Potrai riscattarli di nuovo il ${moment(dailyCooldown).format(`DD/MM/YYYY hh:mm:ss A`)}_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                }
            }
        });
    }
}