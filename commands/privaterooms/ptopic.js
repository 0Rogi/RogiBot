const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `ptopic`,
    descritpion: `Cambia la descrizione di un tuo canale privato`,
    data: {
        name: `ptopic`,
        description: `Modifica la descrizione del canale testuale`,
        options: [
            {
                name: `descrizione`,
                description: `Descrizione del canale`,
                type: `STRING`,
                required: true
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {
        //? Fa pensare l'interazione
        await interaction.deferReply();

        //? Prende il topic scelto
        let topic = interaction.options.getString(`descrizione`).slice(0, 1024);

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
                .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                .setDescription(`*Non hai nessun canale privato, creane uno da <#991643168275697734>*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (channel) {
            //? Risponde all'interazione
            let embed = new Discord.MessageEmbed()
                .setTitle(`✏ Descrizione Cambiata ✏`)
                .setDescription(`La **descrizione** del tuo **canale privato**, è ora ${topic}`)
                .setColor(`GREEN`);
            interaction.editReply({ embeds: [embed] });

            //? Modifica il topic del canale
            client.channels.cache.get(channel.text).setTopic(topic);
        }
    }
}