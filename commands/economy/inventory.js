const config = require(`../../JSON/config.json`);
const items = require(`../../JSON/items.json`);

module.exports = {
    name: `inventory`,
    description: `Mostra l'inventario tuo o di un altro utente`,
    data: {
        name: `inventory`,
        description: `Mostra l'inventario tuo o di un altro utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente di cui vedere l'inventario`,
                type: `USER`,
                required: false,
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.options.getUser(`utente`) || interaction.user;

        database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {

            if (err || !result[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Inventario di ${user.username}`)
                    .setDescription(`_${user.toString()} non ha mai guadagnato dei soldi_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
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

                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`ViewInventory,${interaction.user.id},${user.id}`)
                    .addOptions([
                        {
                            label: `Visualizza Inventario`,
                            value: `back`,
                            emoji: `🧺`
                        },
                        {
                            label: `Cibo`,
                            value: `food`,
                            emoji: `🍖`
                        },
                        {
                            label: `Giochi`,
                            value: `games`,
                            emoji: `🎮`
                        },
                        {
                            label: `Oggetti della Casa`,
                            value: `house`,
                            emoji: `🏡`
                        },
                        {
                            label: `Oggetti Tecnologici`,
                            value: `technology`,
                            emoji: `👨‍💻`
                        },
                        {
                            label: `Altri Oggetti`,
                            value: `other`,
                            emoji: `⚒️`
                        },
                    ]);
                const row = new Discord.MessageActionRow().addComponents(menu);
                interaction.editReply({ embeds: [embed], components: [row] });
            }
        });
    }
}