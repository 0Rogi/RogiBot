const databasebackup = require(`${process.cwd()}/functions/moderation/databasebackup.js`)

module.exports = {
    name: `backup`,
    data: {
        name: `backup`,
        description: `Esegue il backup del database`
    },
    permissionlevel: 1,
    async execute(interaction) {
        await interaction.deferReply()
        let embed = new Discord.MessageEmbed()
            .setTitle(`📦 Backup in corso 📦`)
            .setDescription(`<a:loading:998616752781008986> Il backup di tutto il database è **in corso** <a:loading:998616752781008986>`)
            .setColor(`YELLOW`)
        interaction.editReply({ embeds: [embed] })
        await databasebackup(true)
        let embed2 = new Discord.MessageEmbed()
            .setTitle(`📦 Backup Effettuato 📦`)
            .setDescription(`Il backup di tutto il database è stato **effettuato**!`)
            .setColor(`GREEN`)
        interaction.editReply({ embeds: [embed2] })
    }
}