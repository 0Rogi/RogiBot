module.exports = {
    name: `time`,
    execute(message) {
        let data = new Date();
        let ora = data.getHours() + 1;
        let min = data.getMinutes();
        if(min < `10`) {     
            let embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .addField(`Orario`, `:alarm_clock: Sono le ore ${ora}:${min}`)
            message.reply({embeds: [embed]})
        }
        let embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .addField(`Orario`, `:alarm_clock: Sono le ore ${ora}:${min}`)
        message.reply({embeds: [embed]})
    }
}