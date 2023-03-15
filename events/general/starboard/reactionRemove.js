const config = require(`../../../JSON/config.json`);

module.exports = {
    name: `messageReactionRemove`,
    async execute(reaction, user) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(user.id)) return;

        const message = await client.channels.cache.get(reaction.message.channelId).messages.fetch(reaction.message.id);

        if (reaction._emoji.name != `⭐`) return;

        let reactionsNumber = (await message.reactions.cache.find(x => x._emoji.name == `⭐`)?.users.fetch())?.map(user => user.id);
        reactionsNumber = reactionsNumber?.length || 0;

        let found = false;
        let sentMessage;
        serverstats.starboard.forEach(e => {
            if (e.messageId == message.id) {
                found = true;
                sentMessage = e;
            }
        })

        if (found) {

            if (reactionsNumber < 3) {
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

            let embed = await client.channels.cache.get(config.channelsid.starboard).messages.fetch(sentMessage.botMessageId)
            embed = embed.embeds[0];

            embed.fields[1].value = reactionsNumber.toString();

            client.channels.cache.get(config.channelsid.starboard).messages.fetch(sentMessage.botMessageId).then(m => {
                m.edit({ embeds: [embed] });
            });
        }
    }
}