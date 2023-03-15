const config = require(`../../JSON/config.json`);
const items = require(`../../JSON/items.json`);
const getUserPermissionlevel = require(`../../functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `editmoney`,
    description: `Modifica i soldi di qualcuno`,
    data: {
        name: `editmoney`,
        description: `Modifica i soldi di qualcuno`,
        options: [
            {
                name: `set`,
                description: `Imposta i soldi di qualcuno ad un determinato numero`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui impostare i soldi`,
                        type: `USER`,
                        required: true,
                    },
                    {
                        name: `soldi`,
                        description: `I soldi da impostare`,
                        type: `NUMBER`,
                        required: true
                    }
                ]
            },
            {
                name: `add`,
                description: `Aggiunge dei soldi a qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui aggiungere i soldi`,
                        type: `USER`,
                        required: true,
                    },
                    {
                        name: `soldi`,
                        description: `I soldi da aggiungere`,
                        type: `NUMBER`,
                        required: true
                    }
                ]
            },
            {
                name: `remove`,
                description: `Rimuove dei soldi a qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui rimuovere i soldi`,
                        type: `USER`,
                        required: true,
                    },
                    {
                        name: `soldi`,
                        description: `I soldi da rimuovere`,
                        type: `NUMBER`,
                        required: true
                    }
                ]
            }
        ]
    },
    permissionlevel: 2 ,
    allowedchannels: [`ALL`],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        const command = interaction.options.getSubcommand();

        let user = interaction.options.getUser(`utente`);
        user = interaction.guild.members.cache.find(x => x.id == user.id);

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setDescription(`*Non riesco a trovare quest'utente!\nInserisci un utente valido*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        const userPermLevel = await getUserPermissionlevel(user);
        const moderatorPermLevel = await getUserPermissionlevel(interaction.member);

        if (moderatorPermLevel < 4 && userPermLevel >= moderatorPermLevel) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setDescription(`*Non hai il permesso per impostare i soldi a quest'utente*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        const moneyToEdit = interaction.options.getNumber(`soldi`);

        switch (command) {
            case `set`: {

                database.collection(`UserStats`).updateOne({ id: user.user.id }, {
                    $set: {
                        'economy.money': moneyToEdit,
                    }
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:checkmark:1083310732285853766> Soldi Modificati <a:checkmark:1083310732285853766>`)
                    .setDescription(`**${moneyToEdit} RogiBucks** sono stati impostati sul conto di **${user.toString()}**`)
                    .setColor(`GREEN`);
                interaction.editReply({ embeds: [embed] });

            } break;
            case `add`: {

                database.collection(`UserStats`).updateOne({ id: user.user.id }, {
                    $inc: {
                        'economy.money': moneyToEdit,
                    }
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:checkmark:1083310732285853766> Soldi Modificati <a:checkmark:1083310732285853766>`)
                    .setDescription(`**${moneyToEdit} RogiBucks** sono stati aggiunti al conto di **${user.toString()}**`)
                    .setColor(`GREEN`);
                interaction.editReply({ embeds: [embed] });

            } break;
            case `remove`: {

                database.collection(`UserStats`).updateOne({ id: user.user.id }, {
                    $inc: {
                        'economy.money': -moneyToEdit,
                    }
                });

                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:checkmark:1083310732285853766> Soldi Modificati <a:checkmark:1083310732285853766>`)
                    .setDescription(`**${moneyToEdit} RogiBucks** sono stati rimossi dal conto di **${user.toString()}**`)
                    .setColor(`GREEN`);
                interaction.editReply({ embeds: [embed] });

            } break;
        }
    }
}