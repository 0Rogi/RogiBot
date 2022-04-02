const moment = require(`moment`)

module.exports = {
    name: `eval`,
    FromOwner: true,
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
            let embedlogs = new Discord.MessageEmbed()
                .setTitle(`📦EVAL📦`)
                .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.author.toString()}||`)
                .addField(`⌨️Codice Eseguito:`, command.toString())
                .setColor(`YELLOW`)
                .setThumbnail(message.member.displayAvatarURL({dynamic: true}))
            message.reply({embeds: [embed], components: [row]})
            client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
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