module.exports = {
    name: `lyrics`,
    description: `Prende il testo di una canzone`,
    async execute(message, args) {
        if(!message.member.roles.cache.has(ephiphany.fourthgift.ruolo)) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`Il comando \`!lyrics\` non esiste`)
                .setTitle(`Comando non esistente`)
            message.reply({embeds: [embed]})
            return
        }
        let title = args.join(` `)
        let lyrics = await lyricsFinder(title) || `Error`
        if(lyrics.length > 4096) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`:x: La canzone è troppo lunga per essere visualizzata`)
                    .setColor(`RED`)
                message.reply({embeds: [embed]})
                return
        }
        if(lyrics == `Error`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci una canzone valida`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(title.toString())
            .setDescription(lyrics.toString())
            .setColor(`YELLOW`)
        message.reply({embeds: [embed]})
    }
}