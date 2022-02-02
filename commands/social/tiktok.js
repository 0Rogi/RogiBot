module.exports = {
    name: `tiktok`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`rogi23yt`)
            .setURL(`https://www.tiktok.com/@rogi23yt?`)
            .setColor(`YELLOW`)
            .setThumbnail(`https://www.addlance.com/blog/wp-content/uploads/2021/10/tiktok-logo.png`)
            .setDescription(`:v: Questo è il **profilo tik tok** di Rogi\nse ti va, facci un salto`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`TIK TOK`).setStyle(`LINK`).setURL(`https://www.tiktok.com/@rogi23yt?`).setEmoji(`<:Music:865539429641093130>`))
        message.reply({embeds: [embed], components: [row]})
    }
}