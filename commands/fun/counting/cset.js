const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `cset`,
    description: `Modifica il numero attuale di <#${config.idcanali.counting}>`,
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
    allowedchannels: [config.idcanali.counting],
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let number = interaction.options.getNumber(`numero`);
            number = parseInt(number);

            if (number < 0) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Il numero deve essere maggiore o uguale a 0*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

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
                .setTitle(`✏️ Numero Modificato ✏️`)
                .setDescription(`Il numero corrente è stato modificato in **${number}**`)
                .setColor(`YELLOW`);
            interaction.editReply({ embeds: [embed] });

            if (interaction.channel == config.idcanali.counting) {
                client.channels.cache.get(config.idcanali.counting).send(number.toString()).then(msg => {
                    msg.react(`✅`);
                })
            } else if (interaction.channel != config.idcanali.counting) {
                embed.setDescription(`${interaction.user.toString()} ha modificato il numero corrente in **${number}**`);
                client.channels.cache.get(config.idcanali.counting).send({ embeds: [embed] });
                client.channels.cache.get(config.idcanali.counting).send(number.toString()).then(msg => {
                    msg.react(`✅`);
                })
            }
        })
    }
}