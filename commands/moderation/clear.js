const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `clear`,
    data: {
        name: `clear`,
        description: `Cancella dei messaggi`,
        options: [
            {
                name: `quantità`,
                description: `Numero dei messaggi da eliminare`,
                type: `NUMBER`,
                required: true
            }
        ]
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        interaction.deferReply({ ephemeral: true }).then(() => {
            let count = interaction.options.getNumber(`quantità`)
            if (!count) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Inserisci un numero valido*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.editReply({ embeds: [embed], ephemeral: true })
                return
            }
            if (count > 100) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Posso cancellare solo 100 messaggi per volta*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.editReply({ embeds: [embed], ephemeral: true })
                return
            }
            if (count < 1) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Devi inserire un numero maggiore o uguale a 1*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.editReply({ embeds: [embed], ephemeral: true })
                return
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Messaggi Eliminati`)
                .setDescription(`**${count}** messaggi sono stati eliminati!`)
                .setColor(`GREEN`)
            interaction.editReply({ embeds: [embed], ephemeral: true })
            interaction.channel.bulkDelete(count, true)
        })
    }
}