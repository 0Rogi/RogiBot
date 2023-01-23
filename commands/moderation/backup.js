const databasebackup = require(`${process.cwd()}/functions/moderation/databasebackup.js`);

module.exports = {
    name: `backup`,
    description: `Esegue il backup di tutto il database`,
    data: {
        name: `backup`,
        description: `Esegue il backup del database`
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply()

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

        let embed = new Discord.MessageEmbed()
            .setTitle(`📦 BACKUP IN CORSO 📦`)
            .setDescription(`<a:loading:1026141957937967214> Il backup di tutto il database è **in corso** <a:loading:1026141957937967214>`)
            .setColor(`YELLOW`);
        interaction.editReply({ embeds: [embed] });

        await databasebackup(true);

        let embed2 = new Discord.MessageEmbed()
            .setTitle(`📦 Backup Effettuato 📦`)
            .setDescription(`Il backup di tutto il database è stato **effettuato**!`)
            .setColor(`GREEN`);
        interaction.editReply({ embeds: [embed2] });
    }
}