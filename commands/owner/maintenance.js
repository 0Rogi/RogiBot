const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `maintenance`,
    data: {
        name: `maintenance`,
        description: `Imposta lo stato di manutenzione del bot`,
        options: [
            {
                name: `stato`,
                description: `Stato della manutenzione`,
                type: `BOOLEAN`,
                required: true
            }
        ]
    },
    permissionlevel: 4,
    allowedchannels: [`ALL`],
    execute(interaction) {
        if (!interaction.member.roles.cache.has(config.idruoli.owner) && interaction.guild == config.idServer.idServer) return
        if (interaction.guild == config.idServer.idServerTest && !interaction.member.roles.cache.has(`954438340801884261`)) return

        interaction.deferReply().then(async () => {
            let stato = interaction.options.getBoolean(`stato`)
            if (stato) {
                if (serverstats.maintenance == true) {
                    let embed = new Discord.MessageEmbed()
                        .setDescription(`La manutenzione è già attivata`)
                        .setColor(`RED`)
                    interaction.editReply({ embeds: [embed] })
                    return
                }

                await database.collection(`ServerStats`).updateOne({}, { $set: { maintenance: true } })

                let embed = new Discord.MessageEmbed()
                    .setTitle(`Manutenzione attivata`)
                    .setColor(`YELLOW`)
                interaction.editReply({ embeds: [embed] })
            } else if (!stato) {
                if (serverstats.maintenance == false) {
                    let embed = new Discord.MessageEmbed()
                        .setDescription(`La manutenzione è già disattivata`)
                        .setColor(`RED`)
                    interaction.editReply({ embeds: [embed] })
                    return
                }

                await database.collection(`ServerStats`).updateOne({}, { $set: { maintenance: false } })

                let embed = new Discord.MessageEmbed()
                    .setTitle(`Manutenzione Disattivata`)
                    .setColor(`YELLOW`)
                interaction.editReply({ embeds: [embed] })
            }
        })
    }
}