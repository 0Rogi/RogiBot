module.exports = {
    name: `partner`,
    description: `Fare partnership`,
    execute(message) {
        if(message.author != `601308178482855956` && message.author != `816218053112496188`) return message.reply({embeds: [noperm]})
        const args1 = message.content.split(` `).slice(1)
        let args = args1.slice(0).join(` `)
        if(!args) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`) 
                .setDescription(`:x: Inserisci il messaggio della partner`)
            message.reply({embeds: [embed]})
            return
        }
        const wc = new Discord.WebhookClient({
            id: config.webhook.id, 
            token: config.webhook.token
        })
        message.delete()
        wc.send({allowedMentions: { parse: [] }, content: args.toString()})
    }
}