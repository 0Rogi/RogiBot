module.exports = {
    name: `time`,
    execute(message) {
        let date = new Date()
        if(date.getMonth() == 3 && date.getDate() == 1) {
            let embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .addField(`Orario`, `:alarm_clock: Sono le ore **__104:69__** :smirk:`)
            message.reply({embeds: [embed]}).then(msg => {
                setTimeout(() => {
                    let data = new Date();
                    let ora = data.getHours() +2
                    let min = data.getMinutes()
                    if(min < 10) min = `0${min}`
                    if(ora < 10) ora = `0${ora}`
                    let embed = new Discord.MessageEmbed()
                        .setColor(`YELLOW`)
                        .addField(`Orario`, `:alarm_clock: Sono le ore ${ora}:${min}`)
                    msg.edit({embeds: [embed]})
                }, 1000 * 5);
            })
            return
        }
        let data = new Date();
        let ora = data.getHours() +2
        let min = data.getMinutes()
        if(min < 10) min = `0${min}`
        if(ora < 10) ora = `0${ora}`
        let embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .addField(`Orario`, `:alarm_clock: Sono le ore ${ora}:${min}`)
        message.reply({embeds: [embed]})
    }
}