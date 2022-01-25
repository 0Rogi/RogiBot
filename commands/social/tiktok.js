module.exports = {
    name: `tiktok`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`rogi23yt`)
            .setURL(`https://www.tiktok.com/@rogi23yt?`)
            .setColor(`YELLOW`)
            .setDescription(`:v: Questo è il **profilo tik tok** di Rogi!! Facci un salto se ti va!`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`TIK TOK`).setStyle(`LINK`).setURL(`https://www.tiktok.com/@rogi23yt?`).setEmoji(`<:Music:865539429641093130>`))
        message.reply({embeds: [embed], components: [row]})
    }
}