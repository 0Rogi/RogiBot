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
        if (new Date().getDate() == 29 && new Date().getHours() >= 10) {
            //? Check if the channel is the correct one
            if (message.channel.parent == `1031223455015776347`) {
                //? Generate a chance to spawn
                let spawned = [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
                spawned = spawned[Math.floor(Math.random() * spawned.length)];
                //? If the ghost is spawned
                if (spawned) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Fantasma Spawnato`)
                        .setDescription(`È **spawnato** un **fantasma**!\n\nPremi il pulsante prima degli altri per parlarci e completare la missione di oggi!`)
                        .setFooter({ text: `Il Fantasma non ha ancora parlato con nessuno` })
                        .setImage(`https://i.imgur.com/7bz4Opr.jpg`)
                        .setColor(`YELLOW`);
                    let button = new Discord.MessageButton()
                        .setLabel(`Parla con il Fantasma`)
                        .setStyle(`PRIMARY`)
                        .setEmoji(`<:speak:1033680659572592710>`)
                        .setCustomId(`HalloweenGhostSpeak`);
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    message.channel.send({ embeds: [embed], components: [row] });
                } else if (!spawned) return;
            }
        }
    }
}