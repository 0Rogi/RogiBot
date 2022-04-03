const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `say`,
    execute(message, args) {
        if(!message.member.roles.cache.has(config.idruoli.serverbooster) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.owner) && message.author != config.rogialt) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`_Puoi usare questo comando solo\n boostando il server!_`)
                .setTitle(`Non puoi usare questo comando!`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let testo = args.join(` `)
        if(!testo) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`*Inserisci un messaggio\n\`!say [messaggio]\`*`)
                .setTitle(`Non puoi usare questo comando!`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        message.delete()
        message.channel.send(testo)
    }
}