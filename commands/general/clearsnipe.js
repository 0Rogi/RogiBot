const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `clearsnipe`,
    data: {
        name: `clearsnipe`,
        description: `Elimina l'ultimo messaggio eliminato dallo snipe`,
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    execute(interaction) {
        interaction.deferReply().then(() => {
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    snipe: {
                        cleared: true
                    }
                }
            })
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:checkmark:970022827866611762>Snipe Cancellato`)
                .setDescription(`L'ultimo messaggio eliminato, è stato nascosto.`)
                .setColor(`GREEN`)
            interaction.editReply({ embeds: [embed] })
        })
    }
}