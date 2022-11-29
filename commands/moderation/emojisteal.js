module.exports = {
    name: `emojisteal`,
    description: `"Ruba" un emoji da un altro server attraverso l'ID`,
    data: {
        name: `emojisteal`,
        description: `Ruba un'emoji dall'ID`,
        options: [
            {
                name: `nome`,
                description: `Nome da dare all'emoji`,
                type: `STRING`,
                required: true
            },
            {
                name: `id`,
                description: `ID dell'emoji da rubare`,
                type: `STRING`,
                required: true
            },
            {
                name: `gif`,
                description: `Se l'emoji deve essere animata o no`,
                type: `BOOLEAN`,
                required: true
            }
        ]
    },
    permissionlevel: 3,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        let name = interaction.options.getString(`nome`);
        let emoji = interaction.options.getString(`id`);
        let animated = interaction.options.getBoolean(`gif`);
        let format;

        if (animated) {
            format = `gif`;
        } else if (!animated) {
            format = `webp`;
        }

        let url = `https://cdn.discordapp.com/emojis/${emoji}.${format}?size=48`;

        interaction.guild.emojis.create(url, name).then(emoji => {
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: `[EMOJISTEAL] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`L'emoji ${emoji.toString()} è stata **creata**!`)
                .setColor(`PURPLE`);
            interaction.editReply({ embeds: [embed] });
        })

    }
}