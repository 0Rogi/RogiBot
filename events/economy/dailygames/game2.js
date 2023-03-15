const config = require(`../../../JSON/config.json`);
const items = require(`../../../JSON/items.json`);
const addObject = require(`../../../functions/helper/addObject`);
const moment = require(`moment`);

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isButton() && interaction.customId == `SpinWheel`) {

            database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(async function (err, result) {
                if (err || !result[0]) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                        .setDescription(`_Non hai abbastanza RogiBucks per girare la ruota della fortuna!_`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed], ephemeral: true });
                    return;
                }

                if (result[0]) {
                    const money = result[0]?.economy?.money;

                    if (20 > money) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                            .setDescription(`_Non hai abbastanza RogiBucks per girare la ruota della fortuna!_`)
                            .setColor(`RED`);
                        interaction.reply({ embeds: [embed], ephemeral: true });
                        return;
                    }

                    if (new Date().getTime() < result[0]?.economy?.game2cooldown) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                            .setDescription(`_Sei in **cooldown**!_\n_Potrai rigirare la ruota della fortuna il **${moment(result[0]?.economy?.game2cooldown).format(`DD/MM/YYYY hh:mm:ss A`)}**_`)
                            .setColor(`RED`);
                        interaction.reply({ embeds: [embed], ephemeral: true });
                        return;
                    }

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set:
                        {
                            'economy.game2cooldown': new Date().getTime() + 1000 * 60 * 30
                        }
                    });

                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $inc:
                        {
                            'economy.money': -20
                        }
                    });

                    const prizes = [`50 RogiBucks`, `Timeout 30 secondi`, `10 RogiBucks`, `Nulla`, `Oggetto Random dallo Shop del Cibo`, `XP Boost per 2 minuti`];
                    const random = Math.floor(Math.random() * prizes.length);

                    const won = prizes[random];

                    switch (won) {
                        case `50 RogiBucks`: {

                            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                                $inc: {
                                    'economy.money': 50,
                                }
                            });

                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
                                .setDescription(`**50 RogiBucks** sono stati aggiunti sul tuo conto!`)
                                .setColor(`GREEN`);
                            interaction.reply({ embeds: [embed], ephemeral: true });
                        } break;
                        case `Timeout 30 secondi`: {

                            interaction.member.timeout(1000 * 30).catch(() => { });

                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
                                .setDescription(`Sei stato messo in timeout per **30 secondi**!`)
                                .setColor(`RED`);
                            interaction.reply({ embeds: [embed], ephemeral: true });

                        } break;
                        case `10 RogiBucks`: {

                            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                                $inc: {
                                    'economy.money': 10,
                                }
                            });

                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
                                .setDescription(`**10 RogiBucks** sono stati aggiunti sul tuo conto!`)
                                .setColor(`GREEN`);
                            interaction.reply({ embeds: [embed], ephemeral: true });

                        } break;
                        case `Nulla`: {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
                                .setDescription(`Non hai vinto nulla`)
                                .setColor(`RED`);
                            interaction.reply({ embeds: [embed], ephemeral: true });
                        } break;
                        case `Oggetto Random dallo Shop del Cibo`: {

                            const wonFood = Math.floor(Math.random() * items.food.length);

                            const r = await addObject(items.food[wonFood].object, 1, interaction.member, interaction);
                            if (r == 0) {

                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
                                    .setDescription(`**x1 ${items.food[wonFood].object}** sono stati aggiunti nel tuo inventario!`)
                                    .setColor(`GREEN`);
                                interaction.reply({ embeds: [embed], ephemeral: true });

                            }

                        } break;
                        case `XP Boost per 2 minuti`: {

                            interaction.member.roles.add(config.rolesid.xpboost);

                            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                                $set: {
                                    'economy.xpboost': new Date().getTime() + 1000 * 60 * 2
                                }
                            });

                            const embed = new Discord.MessageEmbed()
                                .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
                                .setDescription(`Hai vinto un **XP Boost** per **2 minuti**!`)
                                .setColor(`GREEN`);
                            interaction.reply({ embeds: [embed], ephemeral: true });

                        } break;
                    }
                }
            });
        }
    }
}