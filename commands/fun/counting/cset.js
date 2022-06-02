const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `cset`,
    data: {
        name: `cset`,
        description: `Imposta un numero in counting`,
        options: [
            {
                name: `numero`,
                description: `Numero da impostare`,
                type: `NUMBER`,
                required: true
            }
        ],
    },
    permissionlevel: 1,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let number = interaction.options.getNumber(`numero`)
            number = parseInt(number)
            await database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    counting: {
                        currentnumber: number,
                        lastuser: null,
                        bestnumber: serverstats.counting.bestnumber
                    }
                }
            })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Numero Modificato`)
                .setDescription(`Il numero corrente è stato modificato in **${number}**`)
                .setColor(`YELLOW`)
            interaction.editReply({ embeds: [embed] })
            client.channels.cache.get(config.idcanali.counting).send(number.toString()).then(msg => {
                msg.react(`✅`)
            })
        })
    }
}