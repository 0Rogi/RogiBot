module.exports = {
    name: `suggest`,
    execute(message, args) {
        let suggestion = args.join(` `)
        if(!suggestion) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un suggerimento\n\`!suggest [suggerimento]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let embed1 = new Discord.MessageEmbed()
            .setTitle(`⁉️Nuovo Suggerimento⁉️`)
            .setDescription(`Suggerimento da ${message.member.toString()}`)
            .setThumbnail(message.member.displayAvatarURL({dynamic: true}))
            .addField(`📉Stato:`, `⚪In attesa...`)
            .addField(`💡Suggerimento:`, suggestion.toString())
            .setColor(`#2f3136`)
            .setFooter({text: `User ID: ${message.author.id}`})
        let embed2 = new Discord.MessageEmbed()
            .setTitle(`💡Suggerimento`)
            .setDescription(`Il tuo suggerimento è stato mandato allo **staff**.\nAttendi che venga **approvato/rifiutato**.`)
            .addField(`Suggerimento:`, suggestion.toString())
            .setThumbnail(message.member.displayAvatarURL({dynamic: true}))
            .setColor(`YELLOW`)
        let button1 = new Discord.MessageButton()
            .setLabel(`Accetta`)
            .setCustomId(`SuggestAccept`)
            .setStyle(`SUCCESS`)
            .setEmoji(`✨`)
        let button2 = new Discord.MessageButton()
            .setLabel(`Rifiuta`)
            .setCustomId(`SuggestRefuse`)
            .setStyle(`DANGER`)
            .setEmoji(`🗑️`)
        let row = new Discord.MessageActionRow()
            .addComponents(button1, button2)
        client.channels.cache.get(config.idcanali.suggests).send({embeds: [embed1], components: [row]})
        message.reply({embeds: [embed2]})
    }
}