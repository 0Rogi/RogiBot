const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = async function nightSecurity(enable) {

    if (enable) {
        client.channels.cache.get(config.idcanali.generaltxt).sendTyping()

        //? Set slowmode in all channels
        client.channels.cache.get(config.idcanali.generaltxt).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.serverbooster).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.commands).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.counting).setRateLimitPerUser(5)
        client.channels.cache.get(config.idcanali.countingextreme).setRateLimitPerUser(5)
        client.channels.cache.get(`997201717038944337`).setRateLimitPerUser(5)

        //? Set limit to voice channels
        client.channels.cache.get(config.idcanali.generalvc).setUserLimit(15)

        //? Disable Members and Subscribers join
        client.channels.cache.get(config.idcanali.membri).permissionOverwrites.create(config.idServer.idServer, { CONNECT: false })
        client.channels.cache.get(config.idcanali.iscritti).permissionOverwrites.create(config.idServer.idServer, { CONNECT: false })

        //? Disable tickets
        let msg = await client.channels.cache.get(config.idcanali.needhelp).messages.fetch(`993212657924579420`)

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

        //? Grants helpers to timeout members
        client.guilds.cache.get(config.idServer.idServer).roles.cache.find(x => x.id == config.idruoli.helper).setPermissions([`MANAGE_NICKNAMES`, `MANAGE_MESSAGES`, `MODERATE_MEMBERS`])

        //? Send message
        let phrases = [`Buonanotte a tutti!`, `Notte!`, `Ed anche questo giorno è passato..., buonanotte!`, `Oggi sono stanchissimo, buonanotte!`, `Oggi mi avete fatto lavorare davvero molto... vado a dormire ora, buonanotte!`]
        client.channels.cache.get(config.idcanali.generaltxt).send(phrases[Math.floor(Math.random() * phrases.length)])
        client.channels.cache.get(config.idcanali.generaltxt).send(`La sicurezza notturna è stata **abilitata** 🔒`)

    }

    if (!enable) {
        client.channels.cache.get(config.idcanali.generaltxt).sendTyping()

        //? Reset slowmode in all channels
        client.channels.cache.get(config.idcanali.generaltxt).setRateLimitPerUser(1)
        client.channels.cache.get(config.idcanali.serverbooster).setRateLimitPerUser(0)
        client.channels.cache.get(config.idcanali.commands).setRateLimitPerUser(1)
        client.channels.cache.get(config.idcanali.counting).setRateLimitPerUser(1)
        client.channels.cache.get(config.idcanali.countingextreme).setRateLimitPerUser(1)
        client.channels.cache.get(`997201717038944337`).setRateLimitPerUser(1)

        //? Remove the limit from voice channels
        client.channels.cache.get(config.idcanali.generalvc).setUserLimit(0)

        //? Enable Members and Subscribers join
        client.channels.cache.get(config.idcanali.membri).permissionOverwrites.create(config.idServer.idServer, { CONNECT: true, SEND_MESSAGES: false })
        client.channels.cache.get(config.idcanali.iscritti).permissionOverwrites.create(config.idServer.idServer, { CONNECT: true, SEND_MESSAGES: false })

        //? Enable tickets
        let msg = await client.channels.cache.get(config.idcanali.needhelp).messages.fetch(`993212657924579420`)

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

        //? Remove helpers permission to timeout members
        client.guilds.cache.get(config.idServer.idServer).roles.cache.find(x => x.id == config.idruoli.helper).setPermissions([`MANAGE_NICKNAMES`, `MANAGE_MESSAGES`])

        //? Send the message
        let phrases = [`Buongiorno a tutti, come va?`, `Salve mondo! Come va la vita oggi?`, `Buongiornissimo! Come state?`, `Buongiorno guys||...and girls||, tutto bene?`, `Salve! Tutto bene?`]
        if (new Date().getDay() == 0) phrases = [`Buongiorno e buona domenica a tutti! Come state?`, `Salve e buona domenica a tutti quanti! Come va la vita?`, `Ciao, buona domenica a tutti! Cosa fare di bello oggi?`]
        client.channels.cache.get(config.idcanali.generaltxt).send(phrases[Math.floor(Math.random() * phrases.length)])
        client.channels.cache.get(config.idcanali.generaltxt).send(`La sicurezza notturna è stata **disabilitata** 🔓`)

    }
}