module.exports = {
    name: `github`,
    description: `Per avere il github di Rogi`,
    execute(message) {
        var embed = new Discord.MessageEmbed()
            .setTitle(`RodariRogi23`)
            .setURL(`https://github.com/RodariRogi23`)
            .setColor(`YELLOW`)
            .setDescription(`:v: Questo è l'account **github** di Rogi, se vuoi facci un salto!`)
        const row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`GITHUB`).setStyle(`LINK`).setURL(`https://github.com/RodariRogi23`).setEmoji(`🖊️`))
        message.reply({embeds: [embed], components: [row]})
    }
}