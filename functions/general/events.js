
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

    //* April Fools
    if (date.getMonth() == 3 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        let role1 = server.roles.cache.get(config.idruoli.owner);
        let role2 = server.roles.cache.get(config.idruoli.srmoderator);
        let role3 = server.roles.cache.get(config.idruoli.moderator);
        let role4 = server.roles.cache.get(config.idruoli.helper);
        let role5 = server.roles.cache.get(config.idruoli.staff);
        let role6 = server.roles.cache.get(config.idruoli.fan);
        role6.setName(`Owner`);
        await role6.setColor(`#e4b400`);
        await role1.setHoist(false);
        await role2.setHoist(false);
        await role3.setHoist(false);
        await role4.setHoist(false);
        await role5.setHoist(true);
        await role5.setName(`Fan`);
        await role5.setColor(`#d6680e`);
        server.setIcon(`https://i.imgur.com/3rUN1t6.png`);
        server.setName(`RoGi DiScOrD`);
    }
    if (date.getMonth() == 3 && date.getDate() == 2 && date.getHours() == 0 && date.getMinutes() == 0) {
        let role1 = server.roles.cache.get(config.idruoli.owner);
        let role2 = server.roles.cache.get(config.idruoli.srmoderator);
        let role3 = server.roles.cache.get(config.idruoli.moderator);
        let role4 = server.roles.cache.get(config.idruoli.helper);
        let role5 = server.roles.cache.get(config.idruoli.staff);
        let role6 = server.roles.cache.get(config.idruoli.fan);
        await role6.setName(`Fan`);
        await role6.setColor(`#d6680e`);
        await role1.setHoist(true);
        await role2.setHoist(true);
        await role3.setHoist(true);
        await role4.setHoist(true);
        await role5.setHoist(false);
        await role5.setName(`Staff`);
        await role5.setColor(`DEFAULT`);
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
        client.channels.cache.get(config.idcanali.general.txt).send({ embeds: [embed] });
    }

    if (date.getMonth() == 0 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`🎉 BUON ${date.getFullYear.toString()} 🎊`)
            .setColor(`YELLOW`)
            .setDescription(`Un altro anno è passato... Buon **${date.getFullYear.toString()}** a tutti!`);
        client.channels.cache.get(config.idcanali.general.txt).send({ embeds: [embed] });
    }
}