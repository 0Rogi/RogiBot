const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `puser`,
    data: {
        name: `puser`,
        description: `Aggiunge/Rimuove un utente dalla tua stanza privata`,
        options: [
            {
                name: `add`,
                description: `Aggiunge un utente alla tua stanza privata`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente da aggiungere alla tua stanza`,
                        type: `USER`,
                        required: true
                    }
                ]
            },
            {
                name: `kick`,
                description: `Espelle un utente dalla tua stanza privata`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente da espellere dalla tua stanza`,
                        type: `USER`,
                        required: true
                    }
                ]
            },
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
            let command = interaction.options.getSubcommand();

            if (command == `add`) {
                //? Prende l'utente e il canale testuale
                let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id);
                let textchannel = client.channels.cache.get(channel.text);

                //? Controlla che l'utente non sia già nel canale
                if (textchannel.permissionsFor(user).has(`VIEW_CHANNEL`, true)) {
                    //? Risponde all'interazione
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`❌ ERRORE ❌`)
                        .setColor(`RED`)
                        .setDescription(`*Questo utente ha già accesso alla tua stanza privata*`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                //? Risponde all'interazione
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👤 UTENTE AGGIUNTO`)
                    .setDescription(`${user} è stato **aggiunto** alla tua stanza privata con successo`)
                    .setColor(`GREEN`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }));
                interaction.editReply({ embeds: [embed] });

                //? Aggiunge l'utente
                textchannel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true });
                client.channels.cache.get(channel.vc).permissionOverwrites.create(user.id, { VIEW_CHANNEL: true });
            } else if (command == `kick`) {
                //? Prende l'utente e il canale testuale
                let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id);
                let textchannel = client.channels.cache.get(channel.text);

                //? Controlla se l'utente non è un mod o un bot
                if (user.roles.cache.has(config.idruoli.moderator) || user.permissions.has(`ADMINISTRATOR`) || user.bot) {
                    //? Risponde all'interazione
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`❌ ERRORE ❌`)
                        .setColor(`RED`)
                        .setDescription(`*Questo utente non puo' essere rimosso dalla tua stanza privata*`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                //? Controlla che l'utente non sia già nel canale
                if (!textchannel.permissionsFor(user).has(`VIEW_CHANNEL`, true)) {
                    //? Risponde all'interazione
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`❌ ERRORE ❌`)
                        .setColor(`RED`)
                        .setDescription(`*Questo utente non ha già accesso alla tua stanza privata*`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                //? Risponde all'interazione
                let embed = new Discord.MessageEmbed()
                    .setTitle(`☹️ UTENTE RIMOSSO`)
                    .setDescription(`${user} è stato **rimosso** dalla tua stanza privata con successo`)
                    .setColor(`RED`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }));
                interaction.editReply({ embeds: [embed] });

                //? Rimuove l'utente e lo espelle dalla vc
                textchannel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: false });
                client.channels.cache.get(channel.vc).permissionOverwrites.create(user.id, { VIEW_CHANNEL: false });
                if (user.voice.channel == channel.vc) user.voice.setChannel(config.idcanali.generalvc);
            }
        }
    }
}