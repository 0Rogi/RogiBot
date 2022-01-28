module.exports = {
    name: `ready`,
    execute() {
        console.clear()
        client.user.setActivity(`!help`)
        console.log(`Online`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`✅BOT ONLINE`)
            .setColor(`GREEN`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🟢Online`,`<:RogiBot:854792536694587434> Rogi Bot Online!`)
        client.channels.cache.get(config.idcanali.online).send({embeds: [embed]})
    }
}