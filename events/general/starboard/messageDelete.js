const config = require(`../../../JSON/config.json`);

module.exports = {
    name: `messageDelete`,
    execute(message) {

        let found = false;
        let sentMessage;
        serverstats.starboard.forEach(e => {
            if (e.messageId == message.id) {
                found = true;
                sentMessage = e;
            }
        });

        if (found) {

            client.channels.cache.get(config.channelsid.starboard).messages.fetch(sentMessage.botMessageId).then(m => m.delete());
            database.collection(`ServerStats`).updateOne({}, {
                $pull: {
                    'starboard': {
                        messageId: message.id
                    }
                }
            });
            return;

        }

    }
}