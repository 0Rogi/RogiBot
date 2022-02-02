module.exports = {
    name: `instagram`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`@rogi23yt`)
            .setURL(`https://www.instagram.com/rogi23yt/`)
            .setColor(`YELLOW`)
            .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/800px-Instagram_logo_2016.svg.png`)
            .setDescription(`:v: Questo è l'account **instagram** di Rogi\nse ti va, facci un salto!`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`INSTAGRAM`).setStyle(`LINK`).setURL(`https://www.instagram.com/rogi23yt/`).setEmoji(`📸`))
        message.reply({embeds: [embed], components: [row]})
    }
}