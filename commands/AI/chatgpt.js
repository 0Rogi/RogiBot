const config = require(`../../JSON/config.json`);
const { Configuration, OpenAIApi } = require(`openai`);

module.exports = {
    name: `chatgpt`,
    description: `Utilizza l'intelligenza artificiale ChatGPT qui su discord!`,
    data: {
        name: `chatgpt`,
        description: `Utilizza l'intelligenza artificiale ChatGPT qui su discord!`,
        options: [
            {
                name: `domanda`,
                description: `Domanda da fare a chatgpt`,
                type: `STRING`,
                required: true,
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `Level 5`,
    async execute(interaction) {
        await interaction.deferReply();

        if (!interaction.member.roles.cache.has(config.rolesid.level5) && !interaction.member.roles.cache.has(config.rolesid.level10) && !interaction.member.roles.cache.has(config.rolesid.level15) && !interaction.member.roles.cache.has(config.rolesid.level20) && !interaction.member.roles.cache.has(config.rolesid.level25) && !interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setDescription(`*Devi avere almeno il livello 5 per usare questo comando!*`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const loadingembed = new Discord.MessageEmbed()
            .setDescription(`<a:loading:1026141957937967214> _**ChatGPT** sta **elaborando** la tua **domanda**_ <a:loading:1026141957937967214>`)
            .setColor(`GREEN`)
            .setThumbnail(`https://i.imgur.com/WC9FBp4.png`);
        interaction.editReply({ embeds: [loadingembed] });

        const configuration = new Configuration({
            apiKey: process.env.openaikey
        });

        const openai = new OpenAIApi(configuration);

        try {
            let question = interaction.options.getString(`domanda`);

            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                max_tokens: 1024
            });

            question = question.charAt(0).toUpperCase() + question.slice(1)

            const replyembed = new Discord.MessageEmbed()
                .addField(`❓ Domanda`, `\`\`\`\n${question.length > (1024 - 16 - 3) ? question.slice(0, (1024 - 16 - 3)) + `...` : question}\n\`\`\``)
                .addField(`😌 Risposta`, `\`\`\`\n${completion.data.choices[0].text.length > (1024 - 16 - 3) ? completion.data.choices[0].text.slice(0, (1024 - 16 - 3)) : completion.data.choices[0].text}\n\`\`\``)
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
            interaction.editReply({ embeds: [replyembed], components: [row] });

        } catch (e) {
            const errorembed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
                .setDescription(`😕 Si è verificato un **errore**:\n\n${e.toString()}`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [errorembed] });
        }
    }
}