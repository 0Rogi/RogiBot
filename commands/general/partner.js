module.exports = {
    name: `partner`,
    execute(message) {
        if(message.author != `601308178482855956` && message.author != `816218053112496188`) return message.reply({embeds: [noperm]})
        let args1 = message.content.split(` `).slice(1)
        let args = args1.slice(0).join(` `)
        if(!args) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`) 
                .setDescription(`:x: Inserisci il messaggio della partner`)
            message.reply({embeds: [embed]})
            return
        }
        let wc = new Discord.WebhookClient({
            id: config.webhook.id, 
            token: config.webhook.token
        })
        message.delete()
        wc.send({allowedMentions: { parse: [] }, content: args.toString()})
    }
}