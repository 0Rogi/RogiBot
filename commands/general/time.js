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
                    let hours = date.getHours()
                    let min = date.getMinutes()
                    if(min < 10) min = `0${min}`
                    if(hours < 10) hours = `0${hours}`
                    let embed = new Discord.MessageEmbed()
                        .setColor(`YELLOW`)
                        .addField(`Orario`, `:alarm_clock: Sono le ore ${hours}:${min}`)
                    msg.edit({embeds: [embed]})
                }, 1000 * 5)
            })
            return
        }
        let hours = date.getHours()
        let min = date.getMinutes()
        if(min < 10) min = `0${min}`
        if(hours < 10) hours = `0${hours}`
        let embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .addField(`Orario`, `:alarm_clock: Sono le ore ${hours}:${min}`)
        message.channel.send({embeds: [embed]})
    }
}