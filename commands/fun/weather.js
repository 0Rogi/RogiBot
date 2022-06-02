const weather = require(`weather-js`)
const translate = require('translate-google')

module.exports = {
    name: `weather`,
    data: {
        name: `weather`,
        description: `Mostra il tempo meteorologico di un paese`,
        options: [
            {
                name: `paese`,
                description: `Paese di cui mostrare il tempo meteorologico`,
                type: `STRING`,
                required: true
            },
            {
                name: `mostra`,
                description: `Scegli se far visualizzare a tutti il comando o no`,
                type: `BOOLEAN`,
                required: true
            }
        ]
    },
    permissionlevel: 0,
    async execute(interaction) {
        let show = interaction.options.getBoolean(`mostra`)
        if (!show) await interaction.deferReply({ ephemeral: true })
        if (show) await interaction.deferReply()
        let city = interaction.options.getString(`paese`)
        weather.find({ search: city, degreeType: `C` }, async function (error, result) {
            if (error) return interaction.editReply(`Non riesco a trovare il paese`)
            if (!city) return interaction.editReply(`Non riesco a trovare il paese`)
            if (result === undefined || result.length === 0) return interaction.editReply(`Non riesco a trovare il paese`)
            let current = result[0].current
            await translate(current.skytext.toString(), { to: `it` }).then(async response => {
                let weather = response
                await translate(current.day.toString(), { to: `it` }).then(response => {
                    let day = response.toString()
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Meteo attuale per ${current.observationpoint}`)
                        .addField(`💦Umidità`, `${current.humidity}%`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`🌡️Temperatura`, `${current.temperature}°`, true)
                        .addField(`☀️Meteo`, `${weather}`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`📆Giorno`, `${day}`, true)
                        .setColor(`YELLOW`)
                        .setThumbnail(current.imageUrl)
                    interaction.editReply({ embeds: [embed] })
                })
            })
        })
    }
}