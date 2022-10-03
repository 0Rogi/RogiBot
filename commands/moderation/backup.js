const databasebackup = require(`${process.cwd()}/functions/moderation/databasebackup.js`);

module.exports = {
    name: `backup`,
    data: {
        name: `backup`,
        description: `Esegue il backup del database`
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply()
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