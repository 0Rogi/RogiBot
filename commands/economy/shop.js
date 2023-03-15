const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `shop`,
    description: `Visualizza lo shop`,
    data: {
        name: `shop`,
        description: `Visualizza lo shop`,
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        const embed = new Discord.MessageEmbed()
            .setTitle(`💰 NEGOZIO 💰`)
            .setDescription(`Ecco tutte le categorie di oggetti che puoi comprare\n\n👨‍💻 **Tecnologia**\n_Oggetti che hanno a che fare con la tecnologia: computer, mouse ecc._\n🍖 **Cibo**\n_Oggetti che hanno a che fare con il cibo: caramelle, cioccolate ecc._\n🏡 **Casa**\n_Oggetti che hanno a che fare con la casa: tappeti, cuscini ecc._\n🎮 **Giochi**\n_Oggetti che hanno a che fare con i giochi: carte, videogiochi ecc._\n⚒ **Altro**\n_Altri oggetti: libri, penne, ecc._`)
            .setColor(`YELLOW`);
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId(`Shop,${interaction.user.id}`)
                    .addOptions([
                        {
                            label: 'Tecnologia',
                            value: 'technology',
                            emoji: '👨‍💻',
                        },
                        {
                            label: 'Cibo',
                            value: 'food',
                            emoji: '🍖',
                        },
                        {
                            label: 'Casa',
                            value: 'house',
                            emoji: '🏡',
                        },
                        {
                            label: 'Giochi',
                            value: 'games',
                            emoji: '🎮',
                        },
                        {
                            label: 'Altro',
                            value: 'others',
                            emoji: '⚒',
                        },
                    ])
            );
        interaction.editReply({ embeds: [embed], components: [row] });

    }
}