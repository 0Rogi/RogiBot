module.exports = {
    name: `slowmode`,
    onlyHelpers: true,
    async execute(message) {
        var time = message.content.split(/\s+/)[1];
        if (!time) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci un tempo`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }

        if (time != `off` && time != 0) {
            time = ms(time)

            if (!time) {    
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`:x: Inserisci un tempo valido`)
                    .setColor(`RED`)
                message.reply({embeds: [embed]})
                return
            }

            if (time > 21600000) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`:x: Puoi impostare un massimo di 6 ore di slowmode`)
                    .setColor(`RED`)
                message.reply({embeds: [embed]})
                return
            }

            var tempo = ms(time, { long: true });
            tempo = tempo + ` `
            tempo = tempo.replace(`second `, `secondo`)
            tempo = tempo.replace(`seconds`, `secondi`)
            tempo = tempo.replace(`minute `, `minuto `)
            tempo = tempo.replace(`minutes`, `minuti`)
            tempo = tempo.replace(`hour `, `ora `)
            tempo = tempo.replace(`hours`, `ore`)
        }

        if (time == `off` || time == `no` || time == 0)
            time = 0

        message.channel.setRateLimitPerUser(parseInt(time) / 1000)

        var embed = new Discord.MessageEmbed()
            .setTitle(`Slowmode`)
            .setColor(`GREEN`)
        if (time == 0) {
            embed.setDescription(`:white_check_mark: Slowmode disattivata`)
        }
        else {
            embed.setDescription(`:white_check_mark: Slowmode impostata a ${tempo}`)
        }
        message.reply({embeds: [embed]})
    },
};