const { getChannelVideos } = require(`yt-channel-info`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function ytnotifier() {
    getChannelVideos(`UCw7lKb-XBW4ApE0puSbJLFQ`, `newest`).then(async response => {
        let idVideo = response?.items[0]?.videoId
        if (!idVideo) return
        client.channels.cache.get(config.idcanali.lastvideo).messages.fetch().then(async messages => {
            let sent = false
            await messages.forEach(msg => {
                if (msg.content.includes(idVideo)) sent = true
            })
            if (!sent) {
                client.channels.cache.get(config.idcanali.lastvideo).send(`**${response?.items[0].author}** Ha pubblicato un nuovo video: **${response?.items[0].title}**!! Che aspetti? Corri a vederlo!!\nhttps://www.youtube.com/watch?v=${idVideo}`)
            }
        })
    })
}