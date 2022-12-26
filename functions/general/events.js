
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function events() {
    const date = new Date()
    const server = client.guilds.cache.get(config.idServer.idServer)

    //* San Valentine
    if (date.getMonth() == 1 && date.getDate() == 14 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/8KLWK5k.png`);
        server.setName(`💘 Rogi Discord ❤`);
    }
    if (date.getMonth() == 1 && date.getDate() == 15 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
        server.setName(`Rogi Discord`);
    }

    //* 25 April e 2 giugno
    if (date.getMonth() == 3 && date.getDate() == 25 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/Iz0sFFi.png`);
    }
    if (date.getMonth() == 3 && date.getDate() == 26 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
    }

    if (date.getMonth() == 5 && date.getDate() == 2 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/Iz0sFFi.png`);
    }
    if (date.getMonth() == 5 && date.getDate() == 3 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
    }

    //* Summer
    if (date.getMonth() == 6 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/rt6v0aX.png`);
    }
    if (date.getMonth() == 8 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
    }

    //* Halloween
    if (date.getMonth() == 9 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/Nv4ZXtG.png`);
        server.setName(`🎃 Rogi Discord 👻`);
    }
    if (date.getMonth() == 10 && date.getDate() == 3 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
        server.setName(`Rogi Discord`);
    }

    //* Christmas
    if (date.getMonth() == 11 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/kl0AZYE.png`);
        server.setName(`🎅 Rogi Discord 🎄`);
    }
    if (date.getMonth() == 0 && date.getDate() == 7 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/7raQOYl.gif`);
        server.setName(`Rogi Discord`);
    }

    if (date.getMonth() == 11 && date.getDate() == 25 && date.getHours() == 0 && date.getMinutes() == 0) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`🎄 BUON NATALE 🎅`)
            .setColor(`RED`)
            .setDescription(`Finalmente è arrivato il **Natale**, buon **Natale** a tutti!`);
        client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
    }

    if (date.getMonth() == 0 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`🎉 BUON ${date.getFullYear.toString()} 🎊`)
            .setColor(`YELLOW`)
            .setDescription(`Un altro anno è passato... Buon **${date.getFullYear.toString()}** a tutti!`);
        client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
    }
}