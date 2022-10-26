const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `messageReactionAdd`,
    async execute(reaction, user) {
        //? Check if maintenance is enabled or not
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(user.id)) return;

        //? Check if the user is a bot
        if (user.bot) return;

        //? Check if the emoji is a skeleton
        let emojiname = reaction._emoji.name
        let emojiid = reaction._emoji.id
        if (emojiname == `skeleton1` || emojiname == `skeleton2` || emojiname == `skeleton3`) {
            if (emojiid == `1033385939491373177` || emojiid == `1033385937125773433` || emojiid == `1033385935674552400`) {

                //? Find userstats
                let userstats;
                serverstats.halloweenevent.forEach(user => {
                    if (user.id == user.id) {
                        userstats = user;
                    }
                })

                //? Store in the database
                if (!userstats) {
                    userstats = {
                        username: user.username,
                        id: user.id,
                        missioncompleted: 0,
                        points: 0,
                        skeletons: {
                            found: 1,
                            messages: [reaction.message.id],
                        },
                        batkilled: false,
                        ghostfound: false,
                        pumpkins: 0,
                        potions: 0,
                        inventory: {
                            object1: 0,
                            object2: 0,
                        },
                        killedzombies6: 0,
                        candies: 0,
                    }
                    database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                    return;
                }

                if (userstats) {
                    if (userstats.skeletons.messages.includes(reaction.message.id)) return;

                    userstats.skeletons = {
                        found: userstats.skeletons.found + 1,
                        messages: userstats.skeletons.messages.concat(reaction.message.id)
                    }

                    await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: user.id } } })
                    database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                }
            }
        }
    }
}