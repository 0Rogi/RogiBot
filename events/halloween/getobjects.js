module.exports = {
    name: `voiceStateUpdate`,
    async execute(oldState, newState) {
        if (newState.channelId && newState.channelId != oldState.channelId) {
            if (new Date().getDate() == 31) {
                let random = [true, false, false];
                random = random[Math.floor(Math.random() * random.length)];

                if (random) {

                    let member = client.guilds.cache.get(`602019987279839274`).members.cache.find(x => x.id == newState.id);

                    //? Find userstats
                    let userstats;
                    serverstats.halloweenevent.forEach(user => {
                        if (user.id == member.user.id) {
                            userstats = user;
                        }
                    })

                    if (!userstats) {
                        if (!userstats) {
                            userstats = {
                                username: member.user.username,
                                id: member.user.id,
                                missioncompleted: 0,
                                points: points,
                                skeletons: {
                                    found: 0,
                                    messages: [],
                                },
                                batkilled: false,
                                ghostfound: false,
                                pumpkins: 0,
                                potions: 0,
                                inventory: {
                                    object1: 1,
                                    object2: 1,
                                },
                                killedzombies6: 0,
                                candies: 0,
                            }
                            database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                            return;
                        }
                    }

                    if (userstats) {
                        userstats.inventory = {
                            object1: userstats.inventory.object1 + 1,
                            object2: userstats.inventory.object2 + 1
                        }

                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Oggetti Trovati!`)
                            .setDescription(`Hai ottenuto:\n<:pumpkin:1034526318294994954> 1x **Polpa di Zucca**\n🦴 1x **Ossa di Scheletro**.\n\n*Puoi craftare una pozione con \`/halloween potion\`*`)
                            .setColor(`ORANGE`);
                        member.send({ embeds: [embed] }).catch(() => { });

                        await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: member.user.id } } })
                        database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                        return;
                    }
                } else if (!random) return;
            }
        }
    }
}