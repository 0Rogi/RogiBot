const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `messageCreate`,
    execute(message) {
        //? Check if maintenance is enabled or not
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return;

        //? Check if the server is the correct server
        if (message.guild != config.idServer.idServer) return;

        //? Check if the day is the correct one
        if (new Date().getDate() == 27 && new Date().getHours() >= 10) {
            //? Check if the channel is the correct one
            if (message.channel == config.idcanali.generaltxt) {
                //? Generate a chance to spawn
                let spawned = [false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false];
                spawned = spawned[Math.floor(Math.random() * spawned.length)];
                //? If the ghost is spawned
                if (spawned) {
                    //? Choose a random emoji to react
                    let emojis = [`<:skeleton1:1033385939491373177>`, `<:skeleton2:1033385937125773433>`, `<:skeleton3:1033385935674552400>`];
                    let emoji = emojis[Math.floor(Math.random() * emojis.length)];
                    //? React to the emoji
                    message.react(emoji);
                } else if (!spawned) return;

            }
        }
    }
}