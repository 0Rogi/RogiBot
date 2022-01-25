module.exports = {
    name: `plimit`,
    execute(message) {
        let channel = message.member.voice.channel
        if(!channel) return message.reply({embeds: [nochannel]})
        if(channel.parent.id != config.idcanali.proomsparent) return message.reply({embeds: [nopvt]})
        if(message.author.username != channel.name) return message.reply({embeds: [noperm]})
        let args = message.content.slice(8)
        function numbers(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
        let array = numbers(0, 99);
        if(!array.some(word => args.includes(word)) || args > 99) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setColor(`RED`)
                .setDescription(`:x: Inserisci un numero che va da 0 a 99`)
            message.reply({embeds: [embed]})
            return
        }
        channel.setUserLimit(args)
        let embed = new Discord.MessageEmbed()
            .setDescription(`Il tuo canale ha adesso un limite di ${args} utenti`)
            .setColor(`GREEN`)
        if(args == `0`) embed.setDescription(`:white_check_mark: Il tuo canale adesso non ha più un limite di utenti`)
        if(args == `1`) embed.setDescription(`:white_check_mark: Il tuo canale adesso ha un limite di 1 utente`)
        message.reply({embeds: [embed]})
    }
}