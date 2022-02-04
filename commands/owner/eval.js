module.exports = {
    name: `eval`,
    onlyOwner: true,
    execute(message, args) {
        let command = args.join(` `)
        if(!command) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un codice da eseguire\n\`!eval [codice]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        } 
        try {
            let evaled = eval(command)
            let embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`📦RISULTATO`)
                .addField(`Tipo:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
                .addField(`Entrata:`, `\`\`\`js\n${command}\`\`\``)
                .addField(`Uscita:`, `\`\`\`js\n${evaled} \`\`\``)
            let button = new Discord.MessageButton()
                .setCustomId(`Elimina`)
                .setEmoji(`🗑️`)
                .setStyle(`DANGER`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            message.reply({embeds: [embed], components: [row]})
        } catch (err) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .addField(`Entrata:`, `\`\`\`js\n${command}\`\`\``)
                .addField(`Errore:`, `\`\`\`js\n${err}\`\`\``)
                .setColor(`RED`)
            let button = new Discord.MessageButton()
                .setCustomId(`Elimina`)
                .setEmoji(`🗑️`)
                .setStyle(`DANGER`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            message.reply({embeds: [embed], components: [row]})
        }
    }
}