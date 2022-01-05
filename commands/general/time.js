module.exports = {
    name: `time`,
    description: `Tempo attuale`,
    execute(message) {
        var data = new Date();
        var ora = data.getHours() + 1;
        var min = data.getMinutes();
        if(min < `10`) {     
            var embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .addField(`Orario`, `:alarm_clock: Sono le ore ${ora}:${min}`)
            message.reply({embeds: [embed]})
        }
        var embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .addField(`Orario`, `:alarm_clock: Sono le ore ${ora}:${min}`)
        message.reply({embeds: [embed]})
    }
}