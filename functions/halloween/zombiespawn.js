const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function zombiespawn() {
    //? When Zombie Can Spawn
    if (new Date().getHours() > 10 && new Date().getDate() != 26) {
        //? Choose the channel where the zombie will spawn
        let channels = [`813470597135728752`, `1011675545819435161`, `826014465186332682`, `974971851526770688`, `987725484064395365`];
        let channel = channels[Math.floor(Math.random() * channels.length)];
        channel = client.channels.cache.get(channel);

        //? Choose the zombie to send
        let zombies = [`https://i.imgur.com/ZXkUX19.png`, `https://i.imgur.com/MmrSxEr.png`, `https://i.imgur.com/M9CbyUL.png`, `https://i.imgur.com/42VmNDc.png`, `https://i.imgur.com/GMU6gZV.png`, `https://i.imgur.com/eHongPH.png`];
        let zombie = zombies[Math.floor(Math.random() * zombies.length)];

        //? Create the message
        let embed = new Discord.MessageEmbed()
            .setTitle(`Nuovo ZOMBIE`)
            .setImage(zombie)
            .setColor(`GREEN`)
            .setFooter({ text: `Zombie Ancora Vivo` });
        let button = new Discord.MessageButton()
            .setLabel(`Uccidi Zombie`)
            .setEmoji(`🔪`)
            .setStyle(`PRIMARY`)
            .setCustomId(`HalloweenZombieKill`);
        let row = new Discord.MessageActionRow()
            .addComponents(button);
        //? Send the message
        channel.send({ embeds: [embed], components: [row], content: `<@&1033320608060153997> un nuovo **zombie** è **comparso**! <:zombie1:1033321687959216208>`, allowedMentions: { users: [], roles: [`1033320608060153997`] } });
    }
}