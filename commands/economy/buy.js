const config = require(`${process.cwd()}/JSON/config.json`);
const items = require(`../../JSON/items.json`);

module.exports = {
    name: `buy`,
    description: `Compra un oggetto dallo shop`,
    data: {
        name: `buy`,
        description: `Compra un oggetto dallo shop`,
        options: [
            {
                name: `oggetto`,
                description: `L'oggetto da comprare`,
                type: `STRING`,
                required: true,
            },
            {
                name: `importo`,
                description: `La quantità di oggetti da comprare`,
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
        let foundObject;
        let category;

        items.food.forEach(e => {
            if (e.object == object) {
                foundObject = e;
                category = `food`;
            }
        });

        items.games.forEach(e => {
            if (e.object == object) {
                foundObject = e;
                category = `games`;
            }
        });

        items.house.forEach(e => {
            if (e.object == object) {
                foundObject = e;
                category = `house`;
            }
        });

        items.others.forEach(e => {
            if (e.object == object) {
                foundObject = e;
                category = `other`;
            }
        });

        items.technology.forEach(e => {
            if (e.object == object) {
                foundObject = e;
                category = `technology`;
            }
        });

        if (foundObject) {

            database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(async function (err, result) {
                if (!result[0] || err) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                        .setDescription(`_Non hai abbastanza RogiBucks!_\n_Non puoi comprare quest'oggetto, non hai abbastanza RogiBucks!_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                } else if (result[0]) {
                    const objectPrice = foundObject.buyprice * objectAmount;
                    const userMoney = result[0]?.economy?.money;

                    if (objectPrice > userMoney) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                            .setDescription(`_Non hai abbastanza RogiBucks!_\n_Non puoi comprare quest'oggetto, non hai abbastanza RogiBucks!_`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                    } else {
                        const userInventory = result[0]?.economy?.inventory;

                        let userHasObject;
                        await userInventory?.forEach(e => {
                            if (e.object == object) {
                                userHasObject = e;
                            }
                        });

                        database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                            $inc: {
                                'economy.money': -objectPrice,
                            }
                        });

                        if (userHasObject) {

                            const filter = {
                                id: interaction.user.id,
                                "economy.inventory": {
                                    $elemMatch: { object: object }
                                }
                            };

                            const update = {
                                $inc: {
                                    [`economy.inventory.$[elem].count`]: objectAmount
                                }
                            };

                            const options = {
                                arrayFilters: [
                                    { "elem.object": object }
                                ]
                            };

                            database.collection("UserStats").updateOne(filter, update, options);

                        } else if (!userHasObject) {

                            const boughtObject = {
                                object: object,
                                count: objectAmount,
                                category: category,
                            }

                            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                                $push: {
                                    'economy.inventory': boughtObject,
                                }
                            });
                        }

                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:checkmark:1083310732285853766> Oggetto Comprato <a:checkmark:1083310732285853766>`)
                            .setDescription(`Hai comprato:\n-**${objectAmount}x ${object}**!`)
                            .setColor(`GREEN`);
                        interaction.editReply({ embeds: [embed] });
                    }
                }
            });

        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                .setDescription(`_Non ho trovato l'oggetto_\n_Inserisci un oggetto valido!_`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
        }
    }
}