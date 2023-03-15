const events = require(`../../functions/general/events.js`);

module.exports = {
    name: `setevent`,
    description: `Imposta un evento all'interno del server`,
    data: {
        name: `setevent`,
        description: `Imposta un evento all'interno del server`,
        options: [
            {
                name: `evento`,
                description: `l'evento da impostare`,
                type: `STRING`,
                required: true,
                choices: [
                    {
                        name: `💾 Reset`,
                        value: `Reset`
                    },
                    {
                        name: `💘 San Valentino`,
                        value: `SaintValentine`
                    },
                    {
                        name: `🌴 Palme`,
                        value: `Palm`
                    },
                    {
                        name: `🐣 Pasqua`,
                        value: `Easter`
                    },
                    {
                        name: `🐠 Pesce d'Aprile`,
                        value: `AprilFool`
                    },
                    {
                        name: `🏛️ Liberazione/Lavoratori/Repubblica`,
                        value: `ItalyFlag`
                    },
                    {
                        name: `🌞 Estate`,
                        value: `Summer`
                    },
                    {
                        name: `🎃 Halloween`,
                        value: `Halloween`
                    },
                    {
                        name: `🎅 Natale`,
                        value: `Christmas`
                    },
                ]
            }
        ]
    },
    permissionlevel: 3 ,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        const event = interaction.options.getString(`evento`);
        events(event);


        const embed = new Discord.MessageEmbed()
            .setTitle(`<a:checkmark:1083310732285853766> Evento Impostato <a:checkmark:1083310732285853766>`)
            .setColor(`YELLOW`);

        switch (event) {
            case `Reset`: {
                embed
                    .setTitle(`<a:checkmark:1083310732285853766> Eventi Resettati <a:checkmark:1083310732285853766>`)
                    .setDescription(`:+1: Il server è tornato normale`)
                    .setThumbnail(`https://i.imgur.com/7raQOYl.gif`);
            } break;

            case `SaintValentine`: {
                embed
                    .setDescription(`💘 Evento di **San Valentino** impostato!\n\nBuona Festa degli innamorati!`)
                    .setThumbnail(`https://i.imgur.com/T2vuTVI.png`);
            } break;

            case `Palm`: {
                embed
                    .setDescription(`🌿 L'evento delle **Palme** è stato impostato!\n\nAuguri a tutti!`)
                    .setThumbnail(`https://i.imgur.com/AcP8l96.png`)
            } break;

            case `Easter`: {
                embed
                    .setDescription(`🐣 L'evento di **Pasqua** è stato impostato!\n\nBuona Pasqua a tutti!`)
                    .setThumbnail(`https://i.imgur.com/COHxYHR.png`);
            } break;

            case `AprilFool`: {
                embed
                    .setDescription(`🐠 L'evento del **Pesce d'Aprile** è stato impostato!\n\nDivertitevi con gli scherzi!`)
                    .setThumbnail(`https://i.imgur.com/BxfH7Um.png`);
            } break;

            case `ItalyFlag`: {
                embed
                    .setDescription(`🇮🇹 L'evento con la **Bandiera Italiana** è stato impostato!`)
                    .setThumbnail(`https://i.imgur.com/85j4jnm.png`);
            } break;

            case `Summer`: {
                embed
                    .setDescription(`🌞 L'evento dell'**Estate** è stato impostato!\n\nBuon'estate a tutti!`)
                    .setThumbnail(`https://i.imgur.com/PZoxdIT.jpg`);
            } break;

            case `Halloween`: {
                embed
                    .setDescription(`🎃 L'evento di **Halloween** è stato impostato!`)
                    .setThumbnail(`https://i.imgur.com/Nv4ZXtG.png`);
            } break;

            case `Christmas`: {
                embed
                    .setDescription(`L'evento di **Natale** è stato impostato!\n\nBuon Natale a tutti!`)
                    .setThumbnail(`https://i.imgur.com/kl0AZYE.png`);
            } break;
        }
        interaction.editReply({ embeds: [embed] });
    }
}