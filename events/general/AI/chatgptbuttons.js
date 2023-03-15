const { Configuration, OpenAIApi } = require(`openai`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isButton() && interaction.customId == `ChatGPTExplain`) {

            const embed = new Discord.MessageEmbed()
                .setTitle(`Cosa è ChatGPT?`)
                .setDescription(`ChatGPT è un **modello di linguaggio creato da OpenAI** che è progettato per **elaborare il linguaggio** naturale e **generare risposte** automatiche. In pratica, questo significa che ChatGPT può **rispondere a domande**, **fornire informazioni**, **fare previsioni** e molto altro ancora, tutto attraverso il linguaggio scritto.\n\nEcco **alcuni esempi** di domande e risposte che ChatGPT potrebbe affrontare:\n\n❓ **DOMANDA**:\n\`\`\`Quali sono i principali monumenti di Roma?\n\`\`\`\n😌 **RISPOSTA**:\n\`\`\`Alcuni dei principali monumenti di Roma includono il Colosseo, il Pantheon, il Vaticano e la Fontana di Trevi.\n\`\`\`\n❓ **DOMANDA**: \n\`\`\`Come si prepara la carbonara?\n\`\`\`\n😌 **RISPOSTA**: \`\`\`\nLa carbonara è un piatto italiano che si prepara con uova, pancetta, pecorino romano e pepe nero. Ci sono diverse varianti della ricetta, ma la versione classica prevede la cottura della pancetta e la mescolanza con uova e formaggio, servito con pasta.\n\`\`\`\n❓ **DOMANDA**: \n\`\`\`Quali sono i sintomi del COVID-19?\n\`\`\`\n😌 **RISPOSTA**: \n\`\`\`I sintomi del COVID-19 possono includere febbre, tosse secca, affaticamento, mal di testa, perdita di gusto o olfatto e difficoltà respiratorie. Tuttavia, i sintomi possono variare da persona a persona e alcuni individui possono essere asintomatici.\n\`\`\`\n❓ **DOMANDA**: \n\`\`\`Chi ha vinto l'Oscar come miglior attore nel 2020?\n\`\`\`\n😌 **RISPOSTA**: \n\`\`\`Nel 2020, Joaquin Phoenix ha vinto l'Oscar come miglior attore per la sua interpretazione nel film "Joker".\n\`\`\`\n_Pensa, persino **questo testo** è stato scritto da **ChatGPT** :)_`)
                .setColor(`YELLOW`)
                .setThumbnail(`https://i.imgur.com/WC9FBp4.png`);
            interaction.reply({ ephemeral: true, embeds: [embed] });
        }

        if (interaction.isButton() && interaction.customId.split(`,`)[0] == `RegenerateResponse`) {

            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel(`Cos'è chat GPT`)
                        .setEmoji(`🧐`)
                        .setStyle(`SECONDARY`)
                        .setCustomId(`ChatGPTExplain`)
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel(`Rigenera Risposta`)
                        .setEmoji(`🔁`)
                        .setStyle(`PRIMARY`)
                        .setCustomId(`RegenerateResponse,${interaction.user.id}`)
                        .setDisabled()
                );
            interaction.message.edit({ components: [row] })

            const configuration = new Configuration({
                apiKey: process.env.openaikey
            });

            const openai = new OpenAIApi(configuration);

            try {

                const question = interaction.message.embeds[0].fields[0].value.slice(4, interaction.message.embeds[0].fields[0].value.length - 4);

                interaction.deferUpdate();

                const completion = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: question,
                    max_tokens: 1024
                });

                const replyembed = new Discord.MessageEmbed()
                    .addField(`❓ Domanda`, `\`\`\`\n${question.length > (1024 - 16 - 3) ? question.slice(0, (1024 - 16 - 3)) + `...` : question}\n\`\`\``)
                    .addField(`😌 Risposta`, `\`\`\`\n${completion.data.choices[0].text.length > (1024 - 16 - 3) ? completion.data.choices[0].text.length.slice(0, (1024 - 16 - 3)) : completion.data.choices[0].text}\n\`\`\``)
                    .setColor(`GREEN`);
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Cos'è chat GPT`)
                            .setEmoji(`🧐`)
                            .setStyle(`SECONDARY`)
                            .setCustomId(`ChatGPTExplain`)
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Rigenera Risposta`)
                            .setEmoji(`🔁`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`RegenerateResponse,${interaction.user.id}`)
                    )
                interaction.message.edit({ embeds: [replyembed], components: [row] });
            } catch (e) {
                const errorembed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                    .setDescription(`😕 Si è verificato un **errore**:\n\n${e.toString()}`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [errorembed], ephemeral: true })
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Cos'è chat GPT`)
                            .setEmoji(`🧐`)
                            .setStyle(`SECONDARY`)
                            .setCustomId(`ChatGPTExplain`)
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Rigenera Risposta`)
                            .setEmoji(`🔁`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`RegenerateResponse,${interaction.user.id}`)
                    )
                interaction.message.edit({ components: [row] });
            }
        }
    }
}