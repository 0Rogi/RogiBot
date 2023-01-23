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

            database.collection(`Staff`).find({ id: interaction.user.id }).toArray(function (err, result) {
                if (!result[0]) {
                    database.collection(`Staff`).insertOne({ username: interaction.user.username, id: interaction.user.id, rank: ``, messages: 0, vctime: 0, partnerships: 0, actions: 1 });
                } else if (result[0]) {
                    database.collection(`Staff`).updateOne({ id: interaction.user.id }, {
                        $inc: {
                            actions: 1,
                        }
                    })
                }
            })
        })

    }
}