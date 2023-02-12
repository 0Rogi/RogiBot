const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = async function nightSecurity(enable) {

    if (enable) {
        client.channels.cache.get(config.channelsid.generaltxt).sendTyping()

        //? Set slowmode in all channels
        client.channels.cache.get(config.channelsid.generaltxt).setRateLimitPerUser(5)
        client.channels.cache.get(config.channelsid.serverbooster).setRateLimitPerUser(5)
        client.channels.cache.get(config.channelsid.commands).setRateLimitPerUser(5)
        client.channels.cache.get(config.channelsid.counting).setRateLimitPerUser(5)
        client.channels.cache.get(config.channelsid.countingextreme).setRateLimitPerUser(5)
        client.channels.cache.get(config.channelsid.countinginfinity).setRateLimitPerUser(5)

        //? Set limit to voice channels
        client.channels.cache.get(config.channelsid.generalvc).setUserLimit(15)

        //? Disable tickets
        let msg = await client.channels.cache.get(config.channelsid.tickets).messages.fetch(`993212657924579420`)

        let button = new Discord.MessageButton()
            .setLabel(`Apri Ticket`)
            .setCustomId(`LOCKEDTickets`)
            .setStyle(`PRIMARY`)
        let row = new Discord.MessageActionRow()
            .addComponents(button)

        msg.edit({ components: [row] })

        //? Disable threads
        let everyone = client.guilds.cache.get(config.idServer.idServer).roles.cache.find(r => r.name === `@everyone`);
        everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`, `STREAM`, `USE_EXTERNAL_EMOJIS`]);

        //? Send message
        let phrases = [`Buonanotte a tutti!`, `Notte!`, `Ed anche questo giorno è passato..., buonanotte!`, `Oggi sono stanchissimo, buonanotte!`, `Oggi mi avete fatto lavorare davvero molto... vado a dormire ora, buonanotte!`]
        client.channels.cache.get(config.channelsid.generaltxt).send(phrases[Math.floor(Math.random() * phrases.length)])
        client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **abilitata** 🔒`)

    }

    if (!enable) {
        client.channels.cache.get(config.channelsid.generaltxt).sendTyping()

        //? Reset slowmode in all channels
        client.channels.cache.get(config.channelsid.generaltxt).setRateLimitPerUser(1)
        client.channels.cache.get(config.channelsid.serverbooster).setRateLimitPerUser(0)
        client.channels.cache.get(config.channelsid.commands).setRateLimitPerUser(1)
        client.channels.cache.get(config.channelsid.counting).setRateLimitPerUser(1)
        client.channels.cache.get(config.channelsid.countingextreme).setRateLimitPerUser(1)
        client.channels.cache.get(config.channelsid.countinginfinity).setRateLimitPerUser(1)

        //? Remove the limit from voice channels
        client.channels.cache.get(config.channelsid.generalvc).setUserLimit(0)

        //? Enable tickets
        let msg = await client.channels.cache.get(config.channelsid.tickets).messages.fetch(`993212657924579420`)

        let button = new Discord.MessageButton()
            .setLabel(`Apri Ticket`)
            .setCustomId(`Tickets`)
            .setStyle(`PRIMARY`)
        let row = new Discord.MessageActionRow()
            .addComponents(button)

        msg.edit({ components: [row] })

        //? Enable Threads
        let everyone = client.guilds.cache.get(config.idServer.idServer).roles.cache.find(r => r.name === `@everyone`);
        everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`, `STREAM`, `USE_EXTERNAL_EMOJIS`, `SEND_MESSAGES_IN_THREADS`]);

        //? Send the message
        let phrases = [`Buongiorno a tutti, come va?`, `Salve mondo! Come va la vita oggi?`, `Buongiornissimo! Come state?`, `Buongiorno guys||...and girls||, tutto bene?`, `Salve! Tutto bene?`]
        if (new Date().getDay() == 0) phrases = [`Buongiorno e buona domenica a tutti! Come state?`, `Salve e buona domenica a tutti quanti! Come va la vita?`, `Ciao, buona domenica a tutti! Cosa fare di bello oggi?`]

        if (new Date().getMonth() == 0 && new Date().getDate() == 1) {
            client.channels.cache.get(config.channelsid.generaltxt).send(`Buongiorno e **buon ${new Date().getFullYear()}** a tutti quanti! 🎉`);
            client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`);
            return;
        }

        if (new Date().getMonth() == 0 && new Date().getDate() == 6) {
            client.channels.cache.get(config.channelsid.generaltxt).send(`Buongiorno, **buona epifania**! 🧙‍♀️`);
            client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`);
            return;
        }

        if (new Date().getMonth() == 1 && new Date().getDate() == 14) {
            client.channels.cache.get(config.channelsid.generaltxt).send(`Buongiorno e **buon San Valentino** a tutti i fidanzati!`);
            client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`);
            return;
        }

        if (new Date().getMonth() == 3 && new Date().getDate() == 1) {
            client.channels.cache.get(config.channelsid.generaltxt).send(`Buongiorno e **buon Pesce d'Aprile** a tutti! 👀`);
            client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`);
            return;
        }

        if (new Date().getMonth() == 9 && new Date().getDate() == 31) {
            client.channels.cache.get(config.channelsid.generaltxt).send(`Buongiorno, **buon Halloween**! 🎃`);
            client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`);
            return;
        }

        if (new Date().getMonth() == 11 && new Date().getDate() == 25) {
            client.channels.cache.get(config.channelsid.generaltxt).send(`Buongiorno e **buon Natale** a tutti!`);
            client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`);
            return;
        }

        client.channels.cache.get(config.channelsid.generaltxt).send(phrases[Math.floor(Math.random() * phrases.length)])
        client.channels.cache.get(config.channelsid.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`)

    }
}