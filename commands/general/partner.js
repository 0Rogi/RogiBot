const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `partner`,
    FromHelpers: true,
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
            id: `944316479720026143`, 
            token: process.env.partnertoken
        })
        message.delete()
        wc.send({allowedMentions: { parse: [] }, content: args.toString()})
    }
}