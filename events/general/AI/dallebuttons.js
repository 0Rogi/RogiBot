const { Configuration, OpenAIApi } = require(`openai`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isButton() && interaction.customId == `DalleExplain`) {

            const embed = new Discord.MessageEmbed()
                .setTitle(`Cosa è Dall-E?`)
                .setDescription(`L'intelligenza artificiale (IA) di **Dall-E** è un **sistema computerizzato** creato per **generare immagini** in modo autonomo, **utilizzando algoritmi di apprendimento automatico** e reti neurali. Questa IA è stata addestrata su una vasta gamma di immagini e ha la **capacità di generare immagini completamente nuove e uniche** partendo da una descrizione testuale.\n\nIn altre parole, se gli si **fornisce una descrizione verbale di un'immagine**, come ad esempio "un elefante rosa che gioca a pallavolo sulla spiaggia", l'IA di Dall-E può **generare un'immagine che corrisponde** a questa descrizione, pur non avendo mai visto prima una tale immagine.\n\nQuesta tecnologia è stata sviluppata per essere utilizzata in molti settori, tra cui la pubblicità, il design, la moda e molto altro ancora. Ad esempio, un'azienda di moda potrebbe utilizzare l'IA di Dall-E per creare immagini di prodotto per il loro catalogo o una società di architettura potrebbe utilizzarlo per visualizzare in modo realistico le loro idee di design.\n\nIn sintesi, **l'IA di Dall-E è un sistema avanzato di generazione di immagini che utilizza l'apprendimento automatico per creare immagini completamente nuove e uniche, partendo da descrizioni verbali**.`)
                .setColor(`YELLOW`)
                .setThumbnail(`https://i.imgur.com/BUreFiD.png`);
            interaction.reply({ ephemeral: true, embeds: [embed] });
        }

        if (interaction.isButton() && interaction.customId.split(`,`)[0] == `RegenerateResponseDallE`) {

            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel(`Cos'è Dall-E`)
                        .setEmoji(`🧐`)
                        .setStyle(`SECONDARY`)
                        .setCustomId(`DalleExplain`)
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel(`Rigenera Immagine`)
                        .setEmoji(`🔁`)
                        .setStyle(`PRIMARY`)
                        .setCustomId(`RegenerateResponseDallE,${interaction.user.id}`)
                        .setDisabled()
                );
            interaction.message.edit({ components: [row] });

            const configuration = new Configuration({
                apiKey: process.env.openaikey
            });

            const openai = new OpenAIApi(configuration);

            try {
                interaction.deferUpdate();

                const image = interaction.message.embeds[0].title

                const data = await openai.createImage({
                    prompt: image,
                    n: 1,
                    size: `1024x1024`,
                });

                const replyembed = new Discord.MessageEmbed()
                    .setTitle(`${image}`)
                    .setImage(data.data.data[0].url)
                    .setColor(`YELLOW`);
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Cos'è Dall-E`)
                            .setEmoji(`🧐`)
                            .setStyle(`SECONDARY`)
                            .setCustomId(`DalleExplain`)
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Rigenera Immagine`)
                            .setEmoji(`🔁`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`RegenerateResponseDallE,${interaction.user.id}`)
                    );
                interaction.message.edit({ embeds: [replyembed], components: [row] });
            } catch (e) {
                const errorembed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                    .setDescription(`😕 Si è verificato un **errore**:\n\n${e.toString()}`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [errorembed], ephemeral: true });

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Cos'è Dall-E`)
                            .setEmoji(`🧐`)
                            .setStyle(`SECONDARY`)
                            .setCustomId(`DalleExplain`)
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Rigenera Immagine`)
                            .setEmoji(`🔁`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`RegenerateResponseDallE,${interaction.user.id}`)
                    )
                interaction.message.edit({ components: [row] })
            }
        }
    }
}