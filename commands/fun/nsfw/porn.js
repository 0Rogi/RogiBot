const pornhub = require(`discord-phub`)
const config = require(`${process.cwd()}/JSON/config.json`)
let oldimg

module.exports = {
    name: `porn`,
    data: {
        name: `porn`,
        description: `Comandi nsfw`,
        options: [
            {
                name: `pussy`,
                description: `Manda una vagina`,
                type: `SUB_COMMAND`
            },
            {
                name: `oral`,
                description: `Manda sesso orale`,
                type: `SUB_COMMAND`
            },
            {
                name: `milf`,
                description: `Manda una milf`,
                type: `SUB_COMMAND`
            },
            {
                name: `cumshots`,
                description: `Manda masturbazione maschile`,
                type: `SUB_COMMAND`
            },
            {
                name: `cock`,
                description: `Manda un pene`,
                type: `SUB_COMMAND`
            },
            {
                name: `boobs`,
                description: `Manda delle tette`,
                type: `SUB_COMMAND`
            },
            {
                name: `ass`,
                description: `Manda un culo`,
                type: `SUB_COMMAND`
            },
            {
                name: `anal`,
                description: `Manda sesso anale`,
                type: `SUB_COMMAND`
            },
            {
                name: `squirting`,
                description: `Manda masturbazione femminile`,
                type: `SUB_COMMAND`
            },
            {
                name: `lgbt-lesbian`,
                description: `Manda sesso tra donne`,
                type: `SUB_COMMAND`
            },
            {
                name: `lgbt-gay`,
                description: `Manda sesso tra uomini`,
                type: `SUB_COMMAND`
            }
        ]
    },
    permissionlevel: 0,
    async execute(interaction) {
        if (interaction.channel != config.idcanali.nsfw && interaction.channel != config.idcanali.testing) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Puoi usare questo comando solo in <#${config.idcanali.nsfw}> 😦*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }
        await interaction.deferReply()
        let img
        while (true) {
            img = new pornhub.RandomPHUB()
            img = img.getRandomInCategory(interaction.options.getSubcommand())
            if (!img.url.endsWith(`.mp4`)) {
                if (oldimg) {
                    if (img.url != oldimg) break
                } else {
                    break
                }
            }
        }
        let embed = new Discord.MessageEmbed()
            .setImage(img.url)
            .setColor(`YELLOW`)
        oldimg = img.url
        interaction.editReply({ embeds: [embed] })
    }
}