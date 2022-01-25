module.exports = {
    name: `instagram`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`rodarirogi23_official`)
            .setURL(`https://tinyurl.com/Rogi-IG`)
            .setColor(`YELLOW`)
            .setDescription(`:v: Questo è l'account **instagram** di Rogi, se vuoi facci un salto!`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`INSTAGRAM`).setStyle(`LINK`).setURL(`https://tinyurl.com/Rogi-IG`).setEmoji(`📸`))
        message.reply({embeds: [embed], components: [row]})
    }
}