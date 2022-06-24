module.exports = async function fetchAllMessages(channelId) {
    const channel = client.channels.cache.get(channelId);
    let messages = [];

    let message = await channel.messages
        .fetch({ limit: 1 })
        .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

    while (message) {
        await channel.messages
            .fetch({ limit: 100, before: message.id })
            .then(messagePage => {
                messagePage.forEach(msg => messages.push(msg));

                message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            })
    }

    messages.reverse()

    return messages
}