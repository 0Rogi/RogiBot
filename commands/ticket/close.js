let embed = new Discord.MessageEmbed()
                .setTitle("Errore")
                .setColor("RED")
                .setDescription(":x: Questo canale **non è un ticket** o non hai il permesso per eliminarlo")
module.exports = {
    name: "tclose",
    execute(message) {
        var topic = message.channel.topic
        if(!topic) {
            message.reply({embeds: [embed]})
            return
        }
        if(topic.startsWith(`User ID:`)) {
        var ID = topic.slice(9)
        if(message.author.id == ID || message.member.permissions.has("MANAGE_MESSAGES")) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Tclose")
                .setDescription(":white_check_mark: Tra **5 secondi** il ticket si chiuderà")
                .setColor("GREEN")
          message.reply({embeds: [embed]})
          setTimeout(() => {
            message.channel.delete()
          }, 5000);
        }
        } else {
            message.reply({embeds: [embed]})
        }
    }
}