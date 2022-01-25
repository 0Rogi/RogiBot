module.exports = {
    name: `github`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Rogi`)
            .setURL(`https://github.com/RodariRogi23`)
            .setColor(`YELLOW`)
            .setDescription(`:v: Questo è l'account **github** di Rogi, se vuoi facci un salto!`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`GITHUB`).setStyle(`LINK`).setURL(`https://github.com/RodariRogi23`).setEmoji(`🖊️`))
        message.reply({embeds: [embed], components: [row]})
    }
}