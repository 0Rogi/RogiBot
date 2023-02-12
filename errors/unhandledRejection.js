const moment = require("moment")
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `unhandledRejection`,
    async execute(err) {
        if (err.stack.toLowerCase().includes(`yt-channel-info`)) return;
        let embed = new Discord.MessageEmbed()
            .setTitle(`⚠️ ERRORE ⚠️`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`📛 Errore:`, err.stack ? `${err.stack.slice(0, 900)}` : `${err.slice(0, 900)}`)
            .setThumbnail(`https://i.imgur.com/ULYfVp2.png`)
            .setColor(`RED`)
        let button = new Discord.MessageButton()
            .setLabel(`Elimina`)
            .setCustomId(`Elimina`)
            .setStyle(`DANGER`)
            .setEmoji(`🗑️`)
        let button2 = new Discord.MessageButton()
            .setLabel(`Elimina Tutti`)
            .setCustomId(`EliminaTutti`)
            .setStyle(`DANGER`)
            .setEmoji(`🗑️`)
        let row = new Discord.MessageActionRow()
            .addComponents(button, button2)
        await client.channels.cache.get(config.channelsid.logs.errors).send({ embeds: [embed], components: [row] })
        console.log(err)
    }
}