const config = require(`../../JSON/config.json`);
const { Configuration, OpenAIApi } = require(`openai`);

module.exports = {
    name: `dalle`,
    description: `Genera un'immagine a partire da un testo attraverso l'intelligenza artificiale`,
    data: {
        name: `dalle`,
        description: `Genera un'immagine a partire da un testo attraverso l'intelligenza artificiale`,
        options: [
            {
                name: `immagine`,
                description: `Immagine che si vuole generare`,
                type: `STRING`,
                required: true,
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `Level 15`,
    async execute(interaction) {

        await interaction.deferReply();

        if (!interaction.member.roles.cache.has(config.rolesid.level15) && !interaction.member.roles.cache.has(config.rolesid.level20) && !interaction.member.roles.cache.has(config.rolesid.level25) && !interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Devi avere almeno il livello 15 per usare questo comando!*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed], ephemeral: true });
            return;
        }

        const loadingembed = new Discord.MessageEmbed()
            .setDescription(`<a:loading:1026141957937967214> _**Dall-E** sta **elaborando** la tua **richiesta**_ <a:loading:1026141957937967214>`)
            .setColor(`GREEN`)
            .setThumbnail(`https://i.imgur.com/WC9FBp4.png`);
        interaction.editReply({ embeds: [loadingembed] });

        let image = interaction.options.getString(`immagine`);

        const configuration = new Configuration({
            apiKey: process.env.openaikey
        });

        const openai = new OpenAIApi(configuration);

        try {
            const data = await openai.createImage({
                prompt: image,
                n: 1,
                size: `1024x1024`,
            });

            image = image.charAt(0).toUpperCase() + image.slice(1);

            const replyembed = new Discord.MessageEmbed()
                .setTitle(`${image.length > 256 - 3 ? image.slice(0, 256 - 3) + `...` : image}`)
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
                )
            interaction.editReply({ embeds: [replyembed], components: [row] });

        } catch (e) {
            const errorembed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                .setDescription(`😕 Si è verificato un **errore**:\n\n${e.toString()}`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [errorembed] });
        }
    }
}