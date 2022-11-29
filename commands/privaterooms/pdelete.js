const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `pdelete`,
    description: `Elimina tutti i tuoi canali privati`,
    data: {
        name: `pdelete`,
        description: `Elimina i tuoi canali privati`
    },
    permissionlevel: 0,
    allowedchannels: [config.idcanali.commands],
    requirement: `none`,
    async execute(interaction) {
        //? Fa pensare l'interazione
        await interaction.deferReply();

        //? Trova il canale dell'utente
        let channel = undefined;

        serverstats.privaterooms.forEach(room => {
            if (room.user == interaction.member.id) {
                channel = room;
            }
        })

        //? Se l'utente non ha un canale
        if (!channel) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`❌ ERRORE ❌`)
                .setDescription(`*Non hai nessun canale privato, creane uno da <#991643168275697734>*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (channel) {
            //? Risponde all'interazione
            let embed = new Discord.MessageEmbed()
                .setTitle(`🗑 ELIMINAZIONE 🗑`)
                .setDescription(`Cliccando questo pulsante, eliminerai sia <#${channel.vc}> che <#${channel.text}>.\n\nSe sei sicuro di volerle eliminare, premi il pulsante \`ELIMINA\``)
                .setColor(`RED`);
            let button = new Discord.MessageButton()
                .setStyle(`DANGER`)
                .setCustomId(`DeletePRoom,${interaction.user.id}`)
                .setLabel(`ELIMINA`)
                .setEmoji(`🗑`);
            let row = new Discord.MessageActionRow()
                .addComponents(button);
            interaction.editReply({ embeds: [embed], components: [row] });
        }
    }
}