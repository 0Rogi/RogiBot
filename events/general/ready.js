module.exports = {
    name: `ready`,
    execute() {
        console.clear()
        client.user.setActivity(`!help`)
        console.log(`Online`)
        const embed = new Discord.MessageEmbed()
            .setTitle(`ONLINE`)
            .setColor(`GREEN`)
            .setDescription(`<:RogiBot:854792536694587434>Sono online!<:RogiBot:854792536694587434>`)
            .setTimestamp()
        client.channels.cache.get(config.idcanali.online).send({embeds: [embed]})
    }
}