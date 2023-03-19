const config = require(`../../JSON/config.json`);
const items = require(`../../JSON/items.json`);
const getUserPermissionlevel = require(`../../functions/helper/getUserPermissionLevel.js`);
const addObject = require(`../../functions/helper/addObject.js`);

module.exports = {
    name: `editinventory`,
    description: `Modifica l'inventario di qualcuno`,
    data: {
        name: `editinventory`,
        description: `Modifica l'inventario di qualcuno`,
        options: [
            {
                name: `add`,
                description: `Aggiunge un oggetto all'inventario di qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui aggiungere l'oggetto`,
                        type: `USER`,
                        required: true,
                    },
                    {
                        name: `oggetto`,
                        description: `L'oggetto da aggiungere`,
                        type: `STRING`,
                        required: true
                    },
                    {
                        name: `importo`,
                        description: `La quantità di oggetti da aggiungere`,
                        type: `NUMBER`,
                        required: false
                    }
                ]
            },
            {
                name: `remove`,
                description: `Rimuove un oggetto dall'invetario di qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui rimuovere l'oggetto`,
                        type: `USER`,
                        required: true,
                    },
                    {
                        name: `oggetto`,
                        description: `L'oggetto da rimuovere`,
                        type: `STRING`,
                        required: true
                    },
                    {
                        name: `importo`,
                        description: `La quantità di oggetti da rimuovere`,
                        type: `NUMBER`,
                        required: false
                    }
                ]
            }
        ]
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        const command = interaction.options.getSubcommand();

        let user = interaction.options.getUser(`utente`);
        user = interaction.guild.members.cache.find(x => x.id == user.id);

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Non riesco a trovare quest'utente!\nInserisci un utente valido*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        const userPermLevel = await getUserPermissionlevel(user);
        const moderatorPermLevel = await getUserPermissionlevel(interaction.member);

        if (moderatorPermLevel < 4 && userPermLevel >= moderatorPermLevel) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Non hai il permesso per impostare i soldi a quest'utente*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        const object = interaction.options.getString(`oggetto`);
        const objectAmount = interaction.options.getNumber(`importo`) || 1;

        switch (command) {
            case `add`: {
                database.collection(`UserStats`).find({ id: user.user.id }).toArray(async function (err, result) {
                    if (err || !result[0]) {
                        const r = await addObject(object, objectAmount, user, interaction)
                        if (r == 0) {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<a:checkmark:1083310732285853766> Oggetto Aggiunto <a:checkmark:1083310732285853766>`)
                                .setDescription(`**x${objectAmount}** ${object.charAt(0).toUpperCase() + object.slice(1)} è stato aggiunto all'inventario di ${user.toString()}`)
                                .setColor(`GREEN`);
                            interaction.editReply({ embeds: [embed] });
                        }
                        return;
                    } else {
                        const userInventory = result[0]?.economy?.inventory;

                        if (!userInventory) {
                            const r = await addObject(object, objectAmount, user, interaction)
                            if (r == 0) {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`<a:checkmark:1083310732285853766> Oggetto Aggiunto <a:checkmark:1083310732285853766>`)
                                    .setDescription(`**x${objectAmount}** ${object.charAt(0).toUpperCase() + object.slice(1)} è stato aggiunto all'inventario di ${user.toString()}`)
                                    .setColor(`GREEN`);
                                interaction.editReply({ embeds: [embed] });
                            }
                            return;
                        }

                        let userHasObject = false;
                        userInventory.forEach(e => {
                            if (e.object == object && e.count > 0) {
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

                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<a:checkmark:1083310732285853766> Oggetto Aggiunto <a:checkmark:1083310732285853766>`)
                                .setDescription(`**x${objectAmount}** ${object.charAt(0).toUpperCase() + object.slice(1)} è stato aggiunto all'inventario di ${user.toString()}`)
                                .setColor(`GREEN`);
                            interaction.editReply({ embeds: [embed] });

                        } else {
                            const r = await addObject(object, objectAmount, user, interaction)
                            if (r == 0) {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`<a:checkmark:1083310732285853766> Oggetto Aggiunto <a:checkmark:1083310732285853766>`)
                                    .setDescription(`**x${objectAmount}** ${object.charAt(0).toUpperCase() + object.slice(1)} è stato aggiunto all'inventario di ${user.toString()}`)
                                    .setColor(`GREEN`);
                                interaction.editReply({ embeds: [embed] });
                            }
                        }
                    }
                });

            } break;
            case `remove`: {
                database.collection(`UserStats`).find({ id: user.user.id }).toArray(function (err, result) {

                    if (err || !result[0]) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                            .setDescription(`_L'inventario di ${user.toString()} è vuoto!_`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                    } else {

                        const inventory = result[0]?.economy?.inventory;

                        if (!inventory) {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                                .setDescription(`_L'inventario di ${user.toString()} è vuoto!_`)
                                .setColor(`RED`);
                            interaction.editReply({ embeds: [embed] });
                            return;
                        }

                        let userHasObject = false;
                        let objectCount = 0;
                        inventory.forEach(e => {
                            if (e.object == object && e.count > 0) {
                                userHasObject = true;
                                objectCount = e.count;
                            }
                        });

                        if (userHasObject) {

                            if (objectAmount > objectCount) {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                                    .setDescription(`_${user.toString()} non ha così tanti **${object}** nel suo inventario_`)
                                    .setColor(`RED`);
                                interaction.editReply({ embeds: [embed] });
                                return;
                            }


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
                                .setTitle(`<a:checkmark:1083310732285853766> Oggetto Rimosso <a:checkmark:1083310732285853766>`)
                                .setDescription(`**x${objectAmount} ${object.charAt(0).toUpperCase() + object.slice(1)}** è stato rimosso dall'inventario di ${user.toString()}`)
                                .setColor(`GREEN`);
                            interaction.editReply({ embeds: [embed] });
                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                                .setDescription(`_Quest'oggetto non è presente nell'inventario di ${user.toString()}_`)
                                .setColor(`RED`);
                            interaction.editReply({ embeds: [embed] });
                        }
                    }

                });
            } break;
        }
    }
}