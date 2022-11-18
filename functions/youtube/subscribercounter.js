const { getChannelInfo } = require(`yt-channel-info`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = function subscribercounter() {
    const payload = { channelId: `UCw7lKb-XBW4ApE0puSbJLFQ`, channelIdType: 0 };
    getChannelInfo(payload).then((response) => {
        let canaleyoutube = client.channels.cache.get(config.idcanali.iscritti)
        canaleyoutube.setName(`—͟͞͞🎬】Subscribers: ${response?.subscriberCount}`)
    })
}