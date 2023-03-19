const items = require(`../../JSON/items.json`);

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {

        if (interaction.isSelectMenu() && interaction.customId.split(`,`)[0] == `ViewInventory`) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo menù!`, ephemeral: true });

            const userId = interaction.customId.split(`,`)[2];
            const category = interaction.values[0];

            if (category == `back`) {
                database.collection(`UserStats`).find({ id: userId }).toArray(async function (err, result) {

                    if (err || !result[0]) {

                    } else {
                        const inventory = result[0]?.economy?.inventory || undefined;
                        const money = result[0]?.economy?.money || 0;

                        let foodItems = 0;
                        let gamesItems = 0;
                        let houseItems = 0;
                        let otherItems = 0;
                        let techItems = 0;

                        inventory?.forEach(e => {

                            const itemsCount = e.count;

                            switch (e.category) {
                                case `food`: {
                                    foodItems += itemsCount;
                                } break;
                                case `games`: {
                                    gamesItems += itemsCount;
                                } break;
                                case `house`: {
                                    houseItems += itemsCount;
                                } break;
                                case `other`: {
                                    otherItems += itemsCount;
                                } break;
                                case `technology`: {
                                    techItems += itemsCount;
                                } break;
                            }
                        });

                        const totalObjects = foodItems + gamesItems + houseItems + otherItems + techItems;

                        const user = await client.users.fetch(userId);

                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Inventario di ${user.username}`)
                            .setColor(`YELLOW`)
                            .setDescription(`💰 RogiBucks: **${money}**`)
                            .addField(`🍖 Cibo:`, foodItems.toString(), true)
                            .addField(`🎮 Giochi:`, gamesItems.toString(), true)
                            .addField(`🏡 Oggetti della Casa:`, houseItems.toString(), true)
                            .addField(`👨‍💻 Oggetti Tecnologici:`, techItems.toString(), true)
                            .addField(`\u200b`, `\u200b`, true)
                            .addField(`⚒️ Altri Oggetti:`, otherItems.toString(), true)
                            .setFooter({ text: `Oggetti Totali: ${totalObjects}` })
                            .setThumbnail(user.displayAvatarURL({ dynamic: true }));
                        interaction.update({ embeds: [embed] });
                    }
                });
                return;
            }
            database.collection(`UserStats`).find({ id: userId }).toArray(function (err, result) {

                if (err || !result[0]) {

                    interaction.reply({ content: `<a:error:1086952752892092416> Si è verificato un errore`, ephemeral: true });

                } else {

                    const inventory = result[0]?.economy?.inventory;
                    let foundSomething = false

                    const embed = new Discord.MessageEmbed()
                        .setColor(`YELLOW`);

                    switch (category) {
                        case `food`: {
                            embed.setTitle(`🍖 Cibo`);
                        } break;
                        case `games`: {
                            embed.setTitle(`🎮 Giochi`);
                        } break;
                        case `house`: {
                            embed.setTitle(`🏡 Oggetti della Casa`);
                        } break;
                        case `other`: {
                            embed.setTitle(`⚒️ Altri Oggetti`);
                        } break;
                        case `technology`: {
                            embed.setTitle(`👨‍💻 Oggetti Tecnologici`);
                        } break;
                    }

                    inventory.forEach(i => {

                        let emoji;

                        items.food.forEach(e => {
                            if (e.object == i.object) {
                                emoji = e.emoji;
                                foundSomething = true;
                            }
                        });
                        items.games.forEach(e => {
                            if (e.object == i.object) {
                                emoji = e.emoji;
                                foundSomething = true;
                            }
                        });
                        items.house.forEach(e => {
                            if (e.object == i.object) {
                                emoji = e.emoji;
                                foundSomething = true;
                            }
                        });
                        items.others.forEach(e => {
                            if (e.object == i.object) {
                                emoji = e.emoji;
                                foundSomething = true;
                            }
                        });
                        items.technology.forEach(e => {
                            if (e.object == i.object) {
                                emoji = e.emoji;
                                foundSomething = true;
                            }
                        });

                        if (i.category == category && i.count > 0) {
                            embed.addField(`${emoji} ${i.object.charAt(0).toUpperCase() + i.object.slice(1)}`, `x${i.count}`, true)
                        }

                    });

                    if (embed.fields.length <= 0) {
                        embed.setDescription(`_Non ci sono oggetti in questa categoria_`);
                    }
                    interaction.update({ embeds: [embed] });
                }
            });
        }
    }
}