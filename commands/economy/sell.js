const config = require(`${process.cwd()}/JSON/config.json`);
const items = require(`../../JSON/items.json`);

module.exports = {
    name: `sell`,
    description: `Vendi un oggetto comprato dallo shop`,
    data: {
        name: `sell`,
        description: `Vendi un oggetto comprato dallo shop`,
        options: [
            {
                name: `oggetto`,
                description: `L'oggetto da vendere`,
                type: `STRING`,
                required: true,
            },
            {
                name: `importo`,
                description: `La quantità di oggetti da vendere`,
                type: `NUMBER`,
                required: false,
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        const object = interaction.options.getString(`oggetto`).toLowerCase();
        const objectAmount = interaction.options.getNumber(`importo`) || 1;

        database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(async function (err, result) {
            if (!result[0] || err) {

            } else if (result[0]) {
                const userInventory = result[0]?.economy?.inventory;

                let found;

                await userInventory.forEach(e => {
                    if (e?.object == object && e.count > 0) {
                        found = e;
                    }
                });

                items.food.forEach(e => {
                    if (e?.object == found?.object) {
                        found = e;
                    }
                });

                items.games.forEach(e => {
                    if (e?.object == found?.object) {
                        found = e;
                    }
                });

                items.house.forEach(e => {
                    if (e?.object == found?.object) {
                        found = e;
                    }
                });

                items.others.forEach(e => {
                    if (e?.object == found?.object) {
                        found = e;
                    }
                });

                items.technology.forEach(e => {
                    if (e?.object == found?.object) {
                        found = e;
                    }
                });

                if (found) {

                    const sellPrice = found.sellprice * objectAmount;

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            'economy.money': sellPrice,
                        }
                    });

                    const filter = {
                        id: interaction.user.id,
                        "economy.inventory": {
                            $elemMatch: { object: object }
                        }
                    };

                    const update = {
                        $inc: {
                            [`economy.inventory.$[elem].count`]: -objectAmount
                        }
                    };

                    const options = {
                        arrayFilters: [
                            { "elem.object": object }
                        ]
                    };

                    database.collection("UserStats").updateOne(filter, update, options);

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:checkmark:1083310732285853766> Oggetto Venduto <a:checkmark:1083310732285853766>`)
                        .setDescription(`Hai venduto:\n-**${objectAmount}x ${object}**!`)
                        .setColor(`GREEN`);
                    interaction.editReply({ embeds: [embed] });
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                        .setDescription(`_Non hai quest'oggetto_\n_Inserisci un oggetto presente nel tuo inventario per venderlo!_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                }
            }
        });
    }
} 