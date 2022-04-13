const config = require(`${process.cwd()}/JSON/config.json`)
const ms = require(`ms`)

module.exports = {
    name: `stats`,
    execute(message) {
        let user = message.mentions.members.first() || message.member
        database.collection(`Easter`).find({id: user.id}).toArray(function(err, result) {
            if(!result[0]) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non hai mai raccolto uova!\nPer collezionare uova, attendi che il coniglio pasquale ne porti e riscattale prima degli altri!*`)
                    .setThumbnail(config.images.rogierror)
                    .setColor(`RED`)
                if(user != message.member) embed.setDescription(`*${user.toString()} non ha mai raccolto uova!\nPer collezionare uova, attendi che il coniglio pasquale ne porti e riscattale prima degli altri!*`)
                message.reply({embeds: [embed]})
                return
            }
            if(result[0]) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Statistiche di ${user.user.username}`)
                    .setDescription(`<:EasterEgg:962650324022222909> Uova disponibili: **${result[0].eggs.toString()}**\n🥚Uova aperte: **${result[0].eggsopen}**\n<:EasterPoints:963716087449526322> Punti totali: **${result[0].points.toString()}**\n⌛Cooldown attuale: **${ms(result[0].cooldown)}**`)
                    .setColor(`YELLOW`)
                message.reply({embeds: [embed]})
            }
        })
    }
}