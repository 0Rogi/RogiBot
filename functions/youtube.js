const ytch = require(`yt-channel-info`)
const config = require(`${process.cwd()}/JSON/config.json`)

setInterval(() => {
    //* Subscribers Counter
    try {
        ytch.getChannelInfo(`UCw7lKb-XBW4ApE0puSbJLFQ`).then((response) => {
            let canaleyoutube = client.channels.cache.get(config.idcanali.iscritti)
            canaleyoutube.setName(`🎬│Subscribers: ${response?.subscriberCount}`)
        })
    } catch {

    }
    //* Youtube Notifier
    try {
        ytch.getChannelVideos(`UCw7lKb-XBW4ApE0puSbJLFQ`, `newest`).then(async response => {
            let idVideo = response?.items[0]?.videoId
            if (!idVideo) return
    
            client.channels.cache.get(config.idcanali.lastvideo).messages.fetch().then(messages => {
                let giaMandato = false 
                messages.forEach(msg => {
                    if (msg.content.includes(idVideo)) giaMandato = true 
                }) 
                if (!giaMandato) {
                    client.channels.cache.get(config.idcanali.lastvideo).send(`**${response?.items[0].author}** Ha pubblicato un nuovo video: **${response?.items[0].title}**!! Che aspetti? Corri a vederlo!!\nhttps://www.youtube.com/watch?v=${idVideo}`)
                }
            })
        })
    } catch {

    }
}, 1000 * 60)