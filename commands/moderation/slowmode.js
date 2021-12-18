module.exports = {
    name: `slowmode`,
    description: `Setta lo slowmode in un canale`,
    execute(message) {
        if(!message.member.permissions.has(`MANAGE_CHANNELS`)){
            message.reply({embeds: [noperm]});
            return;
        }
        const args = message.content.slice(10)
        function numbers(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }
        var array = numbers(0, 21600);
        if(!array.some(word => args.includes(word)) || args > 21600 || args < 0) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`ERRORE`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                .setColor(`RED`)
                .setDescription(`:x: Inserisci un numero che va da 0 a 21600`)
            message.reply({embeds: [embed]})
            return
        }
        var description = `Slowmode in ${message.channel} impostata a: **${args}** secondi`
        if(args == "0") description = `Slowmode in ${message.channel} disattivata`
        if(args == "1") description = `Slowmode in ${message.channel} impostata ad un secondo!`
        var embed = new Discord.MessageEmbed()
            .setColor(`#25a605`)
            .setTitle(`Riuscito!`)
            .setDescription(description)
            .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
            .setFooter(`Moderatore: ${message.author.tag}`)
        message.reply({embeds: [embed]})
        message.channel.setRateLimitPerUser(args)
    }
}