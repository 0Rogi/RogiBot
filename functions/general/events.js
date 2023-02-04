const config = require(`../../JSON/config.json`);

module.exports = function events(event) {

    const server = client.guilds.cache.get(config.idServer.idServer);

    switch (event) {

        case `Reset`: {
            server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
            server.setName(`Rogi Discord`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: ``
                }
            });

            //? Delete Ship and Kiss command
            server.commands.cache.find(x => x.name == `kiss`)?.delete();
            server.commands.cache.find(x => x.name == `ship`)?.delete();

            //? Delete Halloween Emoji
            server.emojis.cache.find(x => x.name == `RogiHalloween`)?.delete();
        } break;

        case `SaintValentine`: {
            server.setIcon(`https://i.imgur.com/T2vuTVI.png`);
            server.setName(`💘 Rogi Discord ❤️`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `SaintValentine`
                }
            });

            //? Create ship and kiss commands
            server.commands.create(
                {
                    name: `ship`,
                    description: `Mostra la percentuale di amore fra 2 utenti`,
                    options: [
                        {
                            name: `utente1`,
                            description: `Primo utente di cui vedere la percentuale`,
                            type: `USER`,
                            required: true,
                        },
                        {
                            name: `utente2`,
                            description: `Secondo utente di cui vedere la percentuale`,
                            type: `USER`,
                            required: true,
                        },
                    ]
                });
            server.commands.create(
                {
                    name: `kiss`,
                    description: `Bacia un utente`,
                    options: [
                        {
                            name: `utente`,
                            description: `Bacia un altro utente`,
                            type: `USER`,
                            required: true,
                        }
                    ]
                })
        } break;

        case `Palm`: {
            server.setIcon(`https://i.imgur.com/AcP8l96.png`)
            server.setName(`🌴 Rogi Discord 🌿`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `Palm`
                }
            });
        } break;

        case `Easter`: {
            server.setIcon(`https://i.imgur.com/COHxYHR.png`);
            server.setName(`🐣 Rogi Discord 🐰`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `Easter`
                }
            });
        } break;

        case `AprilFool`: {
            server.setIcon(`https://i.imgur.com/BxfH7Um.png`);
            server.setName(`RoGi DiScOrD`);
        } break;

        case `ItalyFlag`: {
            server.setIcon(`https://i.imgur.com/85j4jnm.png`);
            server.setName(`🗼 Rogi Discord 🍝`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `ItalyFlag`
                }
            });
        } break;

        case `Summer`: {
            server.setIcon(`https://i.imgur.com/PZoxdIT.jpg`)
            server.setName(`🏖️ Rogi Discord 🌊`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `Summer`
                }
            });
        } break;

        case `Halloween`: {
            server.setIcon(`https://i.imgur.com/Nv4ZXtG.png`);
            server.setName(`🎃 Rogi Discord 👻`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `Halloween`
                }
            });
            //? Create Halloween Emoji
            server.emojis.create(`https://i.imgur.com/VNoWpMV.png`, `RogiHalloween`);
        } break;

        case `Christmas`: {
            server.setIcon(`https://i.imgur.com/kl0AZYE.png`);
            server.setName(`🎅 Rogi Discord 🎄`);
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    currentevent: `Christmas`
                }
            });
        } break;
    }
}