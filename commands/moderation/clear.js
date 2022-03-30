module.exports = {
    name: `clear`,
    FromHelpers: true,
    async execute(message) {
        let count = message.content.slice(7);
        count = parseInt(count);
        if (!count) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci un numero valido\n\`!clear [numero di messaggi]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        if(count>100){
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Posso cancellare solo 100 messaggi per volta!\n\`!clear [numero messaggi]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]});
            return
        }
        message.delete()
        setTimeout(() => {
            message.channel.bulkDelete(count, true)
        }, 500);
        let embedlog = new Discord.MessageEmbed()
                .setTitle(`🧹CLEAR🧹`)
                .setColor(`YELLOW`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 512
                }))
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                .addField(`Stanza:`, message.channel.toString())
                .addField(`Messaggi Eliminati:`, count.toString())
        let channel = client.channels.cache.get(config.idcanali.logs.moderation)
        channel.send({embeds: [embedlog]})
    }
}