const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `halloween`,
    data: {
        name: `halloween`,
        description: `Comandi per l'evento di halloween`,
        options: [
            {
                name: `plant`,
                description: `Pianta una zucca di halloween`,
                type: `SUB_COMMAND`
            },
            {
                name: `collect`,
                description: `Raccoglie una zucca di halloween piantanta in precendenza`,
                type: `SUB_COMMAND`
            },
            {
                name: `potion`,
                description: `Crea una pozione`,
                type: `SUB_COMMAND`
            },
            {
                name: `inventory`,
                description: `Vedi il tuo inventario`,
                type: `SUB_COMMAND`
            },
            {
                name: `ping`,
                description: `Scegli i ping da ricevere durante l'evento di halloween`,
                type: `SUB_COMMAND`
            },
            {
                name: `stats`,
                description: `Visualizza le tue statistiche dell'evento di halloween`,
                type: `SUB_COMMAND`
            },
            {
                name: `leaderboard`,
                description: `Visualizza la classifica dei primi utenti dell'evento di halloween`,
                type: `SUB_COMMAND`
            },
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.idcanali.commands],
    requirement: `none`,
    async execute(interaction) {
        await interaction.deferReply();

        //? Get the command
        let command = interaction.options.getSubcommand();

        if (command == `plant` || command == `collect`) {
            //? Give error if the day is wrong
            if (new Date().getDate() != 30) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`❌ ERRORE ❌`)
                    .setDescription(`_Questo comando è utilizzabile solo per la missione del **30 ottobre**_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            switch (command) {
                //? If the command is plant
                case `plant`: {
                    //? Check if there is already a planted pumpkin
                    let found = false
                    await serverstats?.halloweenpumpkins?.forEach(pumpkin => {
                        if (pumpkin.user == interaction.user.id) {
                            found = true
                        }
                    })

                    //? If there is a pumpkin
                    if (found) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`❌ ERRORE ❌`)
                            .setDescription(`_Hai già piantato una zucca!\nRaccoglila con \`/halloween collect\` prima di piantarne un'altra!_`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    //? Reply to interaction
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Zucca Piantata`)
                        .setDescription(`Hai **piantato** la **tua zucca** 🎃!\nTorna fra **un'ora** per poterla raccogliere`)
                        .setColor(`ORANGE`);
                    interaction.editReply({ embeds: [embed] });

                    //? Store in the database the pumpkin
                    let pumpkin = {
                        username: interaction.user.username,
                        user: interaction.user.id,
                        time: new Date().getTime() + 1000 * 60 * 60
                    }
                    database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenpumpkins": pumpkin } });
                } break;

                //? If the command is collect
                case `collect`: {
                    //? Check if there is a planted pumpkin
                    let found = false;
                    let pumpkinplant;
                    await serverstats?.halloweenpumpkins?.forEach(pumpkin => {
                        if (pumpkin.user == interaction.user.id) {
                            found = true;
                            pumpkinplant = pumpkin;
                        }
                    })

                    //? If there isn't a planted pumpkin
                    if (!found) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`❌ ERRORE ❌`)
                            .setDescription(`_**Non hai zucche** piantate, usa \`/halloween plant\` per piantarne una_`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    //? If the pumpkin isn't grow
                    if (pumpkinplant.time > new Date().getTime()) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`❌ ERRORE ❌`)
                            .setDescription(`*Non è ancora passata un'ora...*`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    //? Remove the pumpkin from the database
                    await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenpumpkins": { user: interaction.user.id } } });

                    //? Reply to the interaction
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Zucca Raccolta`)
                        .setDescription(`La tua **zucca** 🎃 è stata **raccolta**!`)
                        .setColor(`ORANGE`);
                    interaction.editReply({ embeds: [embed] });

                    //? Find userstats
                    let userstats;
                    serverstats.halloweenevent.forEach(user => {
                        if (user.id == interaction.user.id) {
                            userstats = user;
                        }
                    })

                    //? Store points in the database
                    if (!userstats) {
                        userstats = {
                            username: interaction.user.username,
                            id: interaction.user.id,
                            missioncompleted: 0,
                            points: 0,
                            skeletons: {
                                found: 0,
                                messages: [],
                            },
                            batkilled: false,
                            ghostfound: false,
                            pumpkins: 1,
                            potions: 0,
                            inventory: {
                                object1: 0,
                                object2: 0,
                            },
                            killedzombies6: 0,
                            candies: 0,
                        }
                        database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                        return;
                    }

                    if (userstats) {
                        userstats.pumpkins = userstats.pumpkins + 1;

                        //? If pumpkins are 3, complete the mission
                        if (userstats.pumpkins == 3) {
                            userstats.missioncompleted = userstats.missioncompleted + 1;
                            userstats.points = userstats.points + 200;
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Missione Completata!`)
                                .setDescription(`Hai raccolto la tua **3 zucca**!\n\n_Hai completato la missione guadagnando ben **200 punti!**_`)
                                .setColor(`YELLOW`);
                            interaction.editReply({ embeds: [embed] });
                        }

                        await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: interaction.user.id } } });
                        database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                        return;

                    } break;
                }
            }
        }

        if (command == `potion` || command == `inventory`) {
            //? Give error if the day is wrong
            if (new Date().getDate() != 31) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`❌ ERRORE ❌`)
                    .setDescription(`_Questo comando è utilizzabile solo per la missione del **31 ottobre**_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            switch (command) {
                //? If the command is potion
                case `potion`: {
                    let userstats;
                    await serverstats?.halloweenevent?.forEach(user => {
                        if (user.id == interaction.user.id) {
                            userstats = user;
                        }
                    })

                    if (!userstats) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`❌ ERRORE ❌`)
                            .setDescription(`_Non hai mai partecipato all'evento di halloween..._`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    } else if (userstats) {
                        if (userstats.inventory.object1 >= 1 && userstats.inventory.object2 >= 1) {
                            userstats.inventory.object1 = userstats.inventory.object1 - 1;
                            userstats.inventory.object2 = userstats.inventory.object2 - 1;

                            userstats.potions = userstats.potions + 1;

                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Pozione Creata`)
                                .setDescription(`Hai creato la tua pozione, ora hai ben **${userstats.potions}** pozioni! 🧪`)
                                .setColor(`YELLOW`);
                            interaction.editReply({ embeds: [embed] });

                            if (userstats.potions == 3) {
                                userstats.points = userstats.points + 250;

                                userstats.missioncompleted = userstats.missioncompleted + 1;

                                let embed = new Discord.MessageEmbed()
                                    .setTitle(`MISSIONE COMPLETATA`)
                                    .setDescription(`Hai completato la missione, guadagnando **250 punti**!`)
                                    .setColor(`YELLOW`);
                                interaction.editReply({ embeds: [embed] });
                            }

                            await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: interaction.user.id } } });
                            database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });

                        } else {
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`❌ ERRORE ❌`)
                                .setDescription(`_Non hai abbastanza oggetti per craftare una pozione..._`)
                                .setColor(`RED`);
                            interaction.editReply({ embeds: [embed] });
                            return;
                        }
                    }
                } break;
                //? If the command is inventory
                case `inventory`: {
                    //? Find userstats
                    let userstats;
                    await serverstats?.halloweenevent?.forEach(user => {
                        if (user.id == interaction.user.id) {
                            userstats = user;
                        }
                    })

                    //? If userstats aren't found
                    if (!userstats) {
                        //? Reply to interaction
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`❌ ERRORE ❌`)
                            .setDescription(`_Non hai mai partecipato all'evento di halloween..._`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    } else if (userstats) {
                        //? Send the inventory
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`🎃 INVENTARIO DI HALLOWEEN 🎃`)
                            .setDescription(`<:pumpkin:1034526318294994954> Polpa di Zucca: **${userstats.inventory.object1}**\n🦴 Ossa di scheletro: **${userstats.inventory.object2}**\n🧪 Pozioni: **${userstats.potions}**`)
                            .setColor(`YELLOW`)
                        interaction.editReply({ embeds: [embed] });
                    }
                } break;
            }
        }

        switch (command) {
            case `ping`: {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🎃 PING DI HALLOWEEN 🎃`)
                    .setDescription(`Usa il men qui sotto, per scegliere quali ping avere!`)
                    .setColor(`ORANGE`);
                let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageSelectMenu()
                            .setCustomId(`HalloweenPing,${interaction.user.id}`)
                            .addOptions([
                                {
                                    label: `Ping Zombie`,
                                    value: `HalloweenZombiePing`,
                                    emoji: `<:zombie2:1033321689691475988>`
                                },
                                {
                                    label: `Ping Missioni`,
                                    value: `HalloweenMissionPing`,
                                    emoji: `🚀`
                                }
                            ])
                    );
                interaction.editReply({ embeds: [embed], components: [row] });
            } break;

            case `stats`: {
                //? Find userstats
                let userstats;
                serverstats.halloweenevent.forEach(user => {
                    if (user.id == interaction.user.id) {
                        userstats = user;
                    }
                })

                if (!userstats) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`❌ ERRORE ❌`)
                        .setDescription(`_Non hai mai partecipato all'evento di halloween_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                let embed = new Discord.MessageEmbed()
                    .setTitle(`📊 STATISTICHE DI HALLOWEEN 🎃`)
                    .setColor(`ORANGE`)
                    .addField(`🌟 Punti:`, userstats.points.toString(), true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`🚀 Missioni Completate:`, userstats.missioncompleted.toString(), true);
                interaction.editReply({ embeds: [embed] });
            } break;

            case `leaderboard`: {

                serverstats.halloweenevent.sort((a, b) => b.points - a.points);

                let text = ``
                let i = 0;
                serverstats.halloweenevent.forEach((e) => {
                    i++
                    if (i > 10) return;
                    text += `**#${i}** 👤 ${e.username} - 🌟 **${e.points}** - 🚀 **${e.missioncompleted}**\n`;
                });

                if (text == ``) {
                    text = `_Classifica Vuota_`
                }
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🎃 CLASSIFICA DI HALLOWEEN 🎃`)
                    .setColor(`ORANGE`)
                    .setDescription(`_Classifica dei primi **10 utenti**_`)
                    .addField(`👤 UTENTE - 🌟 PUNTI - 🚀 MISSIONI COMPLETATE`, text);
                interaction.editReply({ embeds: [embed] });

            } break;
        }
    }
}
