const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `question`,
    aliases: [`q`],
    execute(message, args) {
        let question = args.join(` `)
        if (!question) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore!`)
                .setDescription(`*Inserisci una domanda\n\`!question [domanda]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({ embeds: [embed] })
            return
        }
        let embed1 = new Discord.MessageEmbed()
            .setTitle(`📥Nuova Domanda📥`)
            .setColor(`YELLOW`)
            .setDescription(`Nuova domanda da ${message.author.toString()}`)
            .addField(`⁉️Domanda:`, question.toString())
        let embed2 = new Discord.MessageEmbed()
            .setTitle(`Domanda Inviata!`)
            .setColor(`YELLOW`)
            .setDescription(`<a:checkmark:970022827866611762>La tua domanda:\n \`\`\`\n${question}\n\`\`\`è stata inviata a **Rogi**!`)
        client.channels.cache.get(`974992886783438899`).send({ embeds: [embed1] })
        message.reply({ embeds: [embed2] })
    }
}