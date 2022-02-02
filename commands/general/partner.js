module.exports = {
    name: `partner`,
    onlyHelpers: true,
    execute(message) {
        let args1 = message.content.split(` `).slice(1)
        let args = args1.slice(0).join(` `)
        if(!args) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci il messaggio della partner\n\`!partner [messaggio]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
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