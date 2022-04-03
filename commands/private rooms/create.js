const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `pcreate`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Errore`)
            .setDescription(`*Questo comando non esiste!\nPer creare una stanza privata\nentra in <#${config.idcanali.proomschannel}>\n\nUsa il comando \`!help\` per vedere\ntutti i comandi delle stanze private!*`)
            .setThumbnail(config.images.roginotfound)
            .setColor(`RED`)
        message.reply({embeds: [embed]})
    }
}