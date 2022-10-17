const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `pname`,
    data: {
        name: `pname`,
        description: `Imposta il nome del tuo canale privato`,
        options: [
            {
                name: `text`,
                description: `Modifica il nome del canale privato TESTUALE`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `name`,
                        description: `Il nuovo nome da impostare`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
            {
                name: `voice`,
                description: `Modifica il nome del canale privato VOCALE`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `name`,
                        description: `Il nuovo nome da impostare`,
                        type: `STRING`,
                        required: true
                    }
                ]
            }
        ]
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
            //? Definisce il tipo di canale
            let channeltype = interaction.options.getSubcommand();
            let prefix;

            switch (channeltype) {
                case `text`: {
                    channel = channel.text;
                    prefix = `—͟͞͞💬】`;
                } break;
                case `voice`: {
                    channel = channel.vc;
                    prefix = `—͟͞͞🔊】`;
                } break;
            }

            //? Risponde all'interazione
            let embed = new Discord.MessageEmbed()
                .setTitle(`✏ Nome Cambiato ✏`)
                .setDescription(`Il **nome** del tuo **canale privato**, è ora:\n\`${prefix}${interaction.options.getString(`name`).slice(0, 97)}\``)
                .setColor(`GREEN`);
            interaction.editReply({ embeds: [embed] });

            //? Modifica il topic del canale
            client.channels.cache.get(channel).setName(`${prefix}${interaction.options.getString(`name`).slice(0, 97)}`);
        }

    }
}