module.exports = {
    name: `youtube`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Rogi`)
            .setURL(`https://youtube.com/c/RodariRogi23`)
            .setColor(`YELLOW`)
            .setThumbnail(`https://i.imgur.com/TzCcl4P.png`)
            .setDescription(`:v: Questo è il **canale** di Rogi, Speedrun, Bedwars, Minigiochi e molto altro\nse ti va, iscriviti :wink:`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`YOUTUBE`).setStyle(`LINK`).setURL(`https://youtube.com/c/RodariRogi23`).setEmoji(`<:youtube:959490799177977866>`))
        message.reply({embeds: [embed], components: [row]})
    }
}