const items = require(`../../JSON/items.json`);

module.exports = function addObject(object, objectAmount, user, interaction) {
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

    const objectToAdd = {
        object: object,
        count: objectAmount,
        category: category,
    }

    if (!category) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Oggetto Non Trovato`)
            .setDescription(`_Hai inserito un oggetto non valido!_\n_Inserisci un oggetto presente nello shop_`)
            .setColor(`RED`);
        interaction.editReply({ embeds: [embed] });
        return 1;
    }

    database.collection(`UserStats`).find({ id: user.user.id }).toArray(function (err, result) {
        if (err || !result[0]) return 1;

        const userInventory = result[0]?.economy?.inventory;

        if (!userInventory) return 1;

        if (userInventory) {
            let userHasObject = false;
            userInventory.forEach(e => {
                if (e.object == object) {
                    userHasObject = true;
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

            } else {
                database.collection(`UserStats`).updateOne({ id: user.user.id }, {
                    $push: {
                        'economy.inventory': objectToAdd,
                    }
                });
            }
        }
    });

    return 0;
}