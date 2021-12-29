module.exports = {
    name: `slowmode`,
    description: `Setta lo slowmode in un canale`,
    onlyMods: true,
    execute(message) {
        const args = message.content.slice(10)
        function numbers(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
        var array = numbers(0, 21600);
        if(!array.some(word => args.includes(word)) || args > 21600 || args < 0) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(`[Errore] ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
                .setDescription(`:x: Inserisci un numero che va da 0 a 21600`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        var description = `Slowmode in ${message.channel} impostata a: **${args}** secondi`
        if(args == "0") description = `Slowmode in ${message.channel} disattivata!`
        if(args == "1") description = `Slowmode in ${message.channel} impostata ad un secondo!`
        var embed = new Discord.MessageEmbed()
            .setAuthor(`[Slowmode] ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ dynamic: true }))
            .setDescription(description.toString())
            .setColor(`GREEN`)
        message.reply({embeds: [embed]})
        message.channel.setRateLimitPerUser(args)
    }
}