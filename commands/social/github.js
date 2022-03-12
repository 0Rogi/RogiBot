module.exports = {
    name: `github`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Rogi`)
            .setURL(`https://github.com/0Rogi`)
            .setColor(`YELLOW`)
            .setThumbnail(`https://i.imgur.com/SllkUVy.png`)
            .setDescription(`:v: Questo è l'account **github** di Rogi\nse ti va, facci un salto!`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`GITHUB`).setStyle(`LINK`).setURL(`https://github.com/0Rogi`).setEmoji(`🖊️`))
        message.reply({embeds: [embed], components: [row]})
    }
}