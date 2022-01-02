module.exports = {
    name: `clear`,
    description: `Cancella dei messaggi`,
    onlyHelpers: true,
    execute(message) {
        var count = message.content.slice(7);
        count = parseInt(count);
        if (!count) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un numero valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(count>100){
            const embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Posso cancellare solo 100 messaggi per volta!`)
                .setColor(`RED`)
            message.reply({embeds: [embed]});
            return
        }
        message.delete()
        message.channel.bulkDelete(count, true)
        const embed = new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: ${count} messaggi eliminati`)
            .setAuthor(`Clear`)
            .setColor(`GREEN`)
        message.channel.send({embeds: [embed]}).then(msg => {
        setTimeout(() => {
                msg.delete()
            }, 2000);
        })
    }
}