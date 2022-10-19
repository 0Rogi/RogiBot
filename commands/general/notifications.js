const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `videonotification`,
    data: {
        name: `videonotification`,
        description: `Aggiungi/Rimuovi il ruolo video notification`
    },
    permissionlevel: 0,
    allowedchannels: [config.idcanali.commands],
    requirement: `none`,
    async execute(interaction) {
        //? Fa pensare l'interazione
        await interaction.deferReply({ ephemeral: true });

        //? Se l'utente ha già il ruolo
        if (interaction.member.roles.cache.has(config.idruoli.videonotification)) {
            //? Rimuove il ruolo
            interaction.member.roles.remove(config.idruoli.videonotification);

            //? Risponde all'interazione
            let embed = new Discord.MessageEmbed()
                .setTitle(`RUOLO RIMOSSO`)
                .setDescription(`Il ruolo <@&${config.idruoli.videonotification}> ti è stato **rimosso**`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed], ephemeral: true });
        }

        //? Se l'utente non ha il ruolo
        if (!interaction.member.roles.cache.has(config.idruoli.videonotification)) {
            //? Aggiunge il ruolo
            interaction.member.roles.add(config.idruoli.videonotification);

            //? Risponde all'interazione
            let embed = new Discord.MessageEmbed()
                .setTitle(`RUOLO AGGIUNTO`)
                .setDescription(`Il ruolo <@&${config.idruoli.videonotification}> ti è stato **aggiunto**`)
                .setColor(`GREEN`);
            interaction.editReply({ embeds: [embed], ephemeral: true });
        }
    }
}