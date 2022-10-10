const { getChannelVideos } = require(`yt-channel-info`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function ytnotifier() {

    if (serverstats?.maintenance) return;

    //? Rogi's Videos
    getChannelVideos(`UCw7lKb-XBW4ApE0puSbJLFQ`, `newest`).then(async response => {
        let idVideo = response?.items[0]?.videoId;

        if (!idVideo) return;

        client.channels.cache.get(config.idcanali.lastvideo).messages.fetch().then(async messages => {

            let sent = false;
            await messages.forEach(msg => {
                if (msg.content.includes(idVideo)) sent = true;
            })

            if (!sent) {

                let sentences = [`🎬 Hey <@&1028664506391466024>, **${response?.items[0].author}** ha finalmente pubblicato un nuovo video:\n**${response?.items[0].title}**!\nCorri a vederlo!\n\n`, `È uscito finalmente un nuovo video sul canale di **${response?.items[0].author}** 🤩\n<@&1028664506391466024> Correte a vedere "**${response?.items[0].title}**"!\n\n`, `**${response?.items[0].title}** è uscito sul canale di **${response?.items[0].author}** 👀.\n<@&1028664506391466024> cosa aspettate? Andate a vederlo!\n\n`, `<@&1028664506391466024> lo so che stavate aspettando un nuovo video di **${response?.items[0].author}** 😏, beh sappi che è appena uscito **${response?.items[0].title}**\n\n`];
                let random = Math.floor(Math.random() * sentences.length);

                client.channels.cache.get(config.idcanali.lastvideo).send({ content: `${sentences[random]} https://www.youtube.com/watch?v=${idVideo}`, allowedMentions: { users: [], roles: ['1028664506391466024'] } }).then(m => m.crosspost().catch(() => { }));
            }

        });
    })

    //? Xen's Video
    getChannelVideos(`UCIDmKXFhLEZby8F05TFN96Q`, `newest`).then(async response => {
        let idVideo = response?.items[0]?.videoId;

        if (!idVideo) return;

        client.channels.cache.get(config.idcanali.lastvideo).messages.fetch().then(async messages => {

            let sent = false;
            await messages.forEach(msg => {
                if (msg.content.includes(idVideo)) sent = true;
            })

            if (!sent) {

                let sentences = [`🎬 Hey <@&1028664506391466024>, **${response?.items[0].author}** ha finalmente pubblicato un nuovo video:\n**${response?.items[0].title}**!\nCorri a vederlo!\n\n`, `È uscito finalmente un nuovo video sul canale di **${response?.items[0].author}** 🤩\n<@&1028664506391466024> Correte a vedere "**${response?.items[0].title}**"!\n\n`, `**${response?.items[0].title}** è uscito sul canale di **${response?.items[0].author}** 👀.\n<@&1028664506391466024> cosa aspettate? Andate a vederlo!\n\n`, `<@&1028664506391466024> lo so che stavate aspettando un nuovo video di **${response?.items[0].author}** 😏, beh sappi che è appena uscito **${response?.items[0].title}**\n\n`];
                let random = Math.floor(Math.random() * sentences.length);

                client.channels.cache.get(config.idcanali.lastvideo).send({ content: `${sentences[random]} https://www.youtube.com/watch?v=${idVideo}`, allowedMentions: { users: [], roles: ['1028664506391466024'] } }).then(m => m.crosspost().catch(() => { }));
            }

        });
    })

    //? Gabvys's Video
    getChannelVideos(`UCOE36p_HdqyLMg9TzLZmPpw`, `newest`).then(async response => {
        let idVideo = response?.items[0]?.videoId;

        if (!idVideo) return;

        client.channels.cache.get(config.idcanali.lastvideo).messages.fetch().then(async messages => {

            let sent = false;
            await messages.forEach(msg => {
                if (msg.content.includes(idVideo)) sent = true;
            })

            if (!sent) {

                let sentences = [`🎬 Hey <@&1028664506391466024>, **${response?.items[0].author}** ha finalmente pubblicato un nuovo video:\n**${response?.items[0].title}**!\nCorri a vederlo!\n\n`, `È uscito finalmente un nuovo video sul canale di **${response?.items[0].author}** 🤩\n<@&1028664506391466024> Correte a vedere "**${response?.items[0].title}**"!\n\n`, `**${response?.items[0].title}** è uscito sul canale di **${response?.items[0].author}** 👀.\n<@&1028664506391466024> cosa aspettate? Andate a vederlo!\n\n`, `<@&1028664506391466024> lo so che stavate aspettando un nuovo video di **${response?.items[0].author}** 😏, beh sappi che è appena uscito **${response?.items[0].title}**\n\n`];
                let random = Math.floor(Math.random() * sentences.length);

                client.channels.cache.get(config.idcanali.lastvideo).send({ content: `${sentences[random]} https://www.youtube.com/watch?v=${idVideo}`, allowedMentions: { users: [], roles: ['1028664506391466024'] } }).then(m => m.crosspost().catch(() => { }));
            }

        });
    })

}