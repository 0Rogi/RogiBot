module.exports = {
    name: `skin`,
    data: {
        name: `skin`,
        description: `Mostra la skin di qualcuno`,
        options: [
            {
                name: `face`,
                description: `Mostra la faccia della skin di Minecraft di qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `player`,
                        description: `Persona di cui mostrare la faccia della skin`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
            {
                name: `body`,
                description: `Mostra il corpo della skin di Minecraft di qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `player`,
                        description: `Persona di cui mostrare il corpo della skin`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
            {
                name: `skin`,
                description: `Mostra la skin di Minecraft di qualcuno`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `player`,
                        description: `Persona di cui mostrare la skin`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
        ]
    },
    permissionlevel: 0,
    async execute(interaction) {
        await interaction.deferReply()
        let command = interaction.options.getSubcommand()
        let player = interaction.options.getString(`player`)
        let image
        let thumb
        if (command == `face`) {
            image = `https://minotar.net/helm/${player}/128.png`
            thumb = `https://minotar.net/cube/${player}/64.png`
        } else if (command == `body`) {
            image = `https://minotar.net/armor/body/${player}/128.png`
            thumb = `https://minotar.net/armor/bust/${player}/64.png`
        } else if (command == `skin`) {
            image = `https://minotar.net/skin/${player}`
        }
        switch (command) {
            case `face`: command = `FACCIA DI ${player}`; break;
            case `body`: command = `CORPO DI ${player}`; break;
            case `skin`: command = `SKIN DI ${player}`; break;
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(command)
            .setColor(`BLUE`)
            .setImage(image)
            .setThumbnail(thumb)
        if (!thumb) {
            let button = new Discord.MessageButton()
                .setStyle(`LINK`)
                .setLabel(`Scarica la Skin`)
                .setURL(`https://minotar.net/download/${player}`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            interaction.editReply({ embeds: [embed], components: [row] })
            return
        }
        interaction.editReply({ embeds: [embed] })
    }
}