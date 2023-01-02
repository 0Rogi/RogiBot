const config = require(`${process.cwd()}/JSON/config.json`);
const moment = require(`moment`);

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.guild != config.idServer.idServer) return;

        if (interaction.isButton()) {

            if (interaction.customId != `CandidaturaPartnerManager`) return;

            // if (interaction.member.permissions.has(`MANAGE_MESSAGES`)) return interaction.reply({ content: `Vuoi essere depexato a <@&985910805730054154> 🤨`, ephemeral: true });
            if (interaction.member.roles.cache.has(`985910805730054154`)) return interaction.reply({ content: `Ma... sei già partner manager...`, ephemeral: true });

            const modal = new Discord.Modal()
                .setCustomId(`partnermanagerapply`)
                .setTitle(`CANDIDATURA`);
            let question1 = new Discord.TextInputComponent()
                .setCustomId(`question1`)
                .setLabel(`Quanti anni hai?`)
                .setStyle(`SHORT`)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(1024);
            let question2 = new Discord.TextInputComponent()
                .setCustomId(`question2`)
                .setLabel(`Quanto tempo hai da dedicare al server?`)
                .setStyle(`SHORT`)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(1024);
            let question3 = new Discord.TextInputComponent()
                .setCustomId(`question3`)
                .setLabel(`Quante partner faresti in media?`)
                .setStyle(`SHORT`)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(1024);
            let question4 = new Discord.TextInputComponent()
                .setCustomId(`question4`)
                .setLabel(`Perchè dovremmo accettare proprio te?`)
                .setStyle(`SHORT`)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(1024);
            let question5 = new Discord.TextInputComponent()
                .setCustomId(`question5`)
                .setLabel(`Parlaci un po' di te (facoltativo)`)
                .setStyle(`PARAGRAPH`)
                .setRequired(false)
                .setMinLength(1)
                .setMaxLength(1024);

            let row1 = new Discord.MessageActionRow().addComponents(question1);
            let row2 = new Discord.MessageActionRow().addComponents(question2);
            let row3 = new Discord.MessageActionRow().addComponents(question3);
            let row4 = new Discord.MessageActionRow().addComponents(question4);
            let row5 = new Discord.MessageActionRow().addComponents(question5);

            modal.addComponents(row1, row2, row3, row4, row5);
            interaction.showModal(modal);
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId == `partnermanagerapply`) {

                let question1 = interaction.fields.getTextInputValue(`question1`).trim();
                let question2 = interaction.fields.getTextInputValue(`question2`).trim();
                let question3 = interaction.fields.getTextInputValue(`question3`).trim();
                let question4 = interaction.fields.getTextInputValue(`question4`).trim();
                let question5 = interaction.fields.getTextInputValue(`question5`).trim() || `_Nessuna Risposta_`;

                if (question1.length <= 0 || question2.length <= 0 || question3.length <= 0 || question4.length <= 0 || question5.length <= 0) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`❌ ERRORE ❌`)
                        .setDescription(`_Hai inserito delle risposte non valide_`)
                        .setColor(`RED`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                    return;
                }

                let embed = new Discord.MessageEmbed()
                    .setTitle(`🔗 NUOVA CANDIDATURA 🔗`)
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤 Utente:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`Quanti anni hai?`, question1, true)
                    .addField(`Quanto tempo hai da dedicare al server?`, question2, true)
                    .addField(`Quante partner faresti in media?`, question3, true)
                    .addField(`Perchè dovremmo accettare proprio te?`, question4, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`Parlaci un po' di te (facoltativo)`, question5, true)
                    .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                    .setColor(`YELLOW`)
                    .setFooter(`User ID: ${interaction.user.id}`);
                let button1 = new Discord.MessageButton()
                    .setLabel(`ACCETTA`)
                    .setStyle(`SUCCESS`)
                    .setCustomId(`AcceptManager`);
                let button2 = new Discord.MessageButton()
                    .setLabel(`RIFIUTA`)
                    .setStyle(`DANGER`)
                    .setCustomId(`RefuseManager`);
                let row = new Discord.MessageActionRow()
                    .addComponents(button1, button2);
                client.channels.cache.get(config.idcanali.logs.partnership.applies).send({ embeds: [embed], components: [row] });

                interaction.reply({ content: `<a:checkmark:970022827866611762> La tua candidatura è stata **consegnata allo staff** con successo!`, ephemeral: true });
            }
        }
    }
}