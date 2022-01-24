module.exports = {
    name: `clear`,
    description: `Cancella dei messaggi`,
    onlyHelpers: true,
    async execute(message) {
        let count = message.content.slice(7);
        count = parseInt(count);
        if (!count) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un numero valido`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        if(count>100){
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Posso cancellare solo 100 messaggi per volta!`)
                .setColor(`RED`)
            message.reply({embeds: [embed]});
            return
        }
        message.delete()
        setTimeout(() => {
            message.channel.bulkDelete(count, true)
        }, 500);
    }
}