module.exports = {
    name: `youtube`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Rogi`)
            .setURL(`https://youtube.com/c/RodariRogi23`)
            .setColor(`YELLOW`)
            .setThumbnail(`https://www.prolocoquartodaltino.it/wp-content/uploads/sites/22/2021/01/Logo-YouTube.jpg`)
            .setDescription(`:v: Questo è il **canale** di Rogi, Speedrun, Bedwars, Minigiochi e molto altro\nse ti va, iscriviti :wink:`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`YOUTUBE`).setStyle(`LINK`).setURL(`https://youtube.com/c/RodariRogi23`).setEmoji(`<:YoutubeTogether:894484116580470814>`))
        message.reply({embeds: [embed], components: [row]})
    }
}