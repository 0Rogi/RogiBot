const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `plimit`,
    execute(message) {
        let channel = message.member.voice.channel
        if(!channel){
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non sei connesso in un canale vocale!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(channel.parent.id != config.idcanali.proomsparent) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non sei connesso in una stanza privata!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(message.author.username != channel.name) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Non hai il permesso per impostare il limite di utenti\nin questa stanza privata!*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let args = message.content.slice(8)
        function numbers(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
        let array = numbers(0, 99);
        if(!array.some(word => args.includes(word)) || args > 99) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un numero che va da 0 a 99\n\`!plimit [numero]\`*`)
                .setThumbnail(config.images.rogierror)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        channel.setUserLimit(args)
        let embed = new Discord.MessageEmbed()
            .setTitle(`Limite Impostato`)
            .setColor(`GREEN`)
            .setDescription(`Il tuo canale ha ora un limite di ${args} utenti!`)
            .setThumbnail(config.images.rogislowmode)
        if(args == `0`) {
            embed.setDescription(`Il tuo canale adesso non ha più un limite di utenti`)
            embed.setTitle(`Limite Rimosso`)
        }
        if(args == `1`) embed.setDescription(`Il tuo canale ha ora un limite di 1 utente!`)
        message.reply({embeds: [embed]})
    }
}