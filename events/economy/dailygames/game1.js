const config = require(`../../../JSON/config.json`);

module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return;

        if (message.channel != config.channelsid.generaltxt) return;

        const word = serverstats.economyGame1Word;

        if (!word) return;

        if (message.content.toLowerCase() == word.toLowerCase()) {

            database.collection(`ServerStats`).updateOne({}, {
                $unset: {
                    economyGame1Word: ""
                }
            });

            message.react(`<a:checkmark:1083310732285853766>`);

            database.collection(`UserStats`).updateOne({ id: message.author.id }, {
                $inc: {
                    'economy.money': 10
                }
            });

        }



    }
}