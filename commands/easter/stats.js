const config = require(`${process.cwd()}/JSON/config.json`)
const ms = require(`ms`)

module.exports = {
    name: `stats`,
    execute(message, args) {
        let id = args[0]
        let server = client.guilds.cache.get(config.idServer.idServer)
        let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) || message.member
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
                database.collection(`Easter`).find().sort({points: -1}).toArray(function(err, result) {
                    let i = 1
                    result.forEach(async r => {
                        if(r.id == user.id) {
                            let cooldown = r.cooldown
                            if(cooldown < 1000) cooldown = `_Nessun Cooldown_`
                            if(cooldown > 1000) cooldown = ms(cooldown)                            
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Statistiche di ${user.user.username}`)
                                .setDescription(`<:EasterEgg:962650324022222909> Uova disponibili: **${result[0].eggs.toString()}**\n🥚Uova aperte: **${result[0].eggsopen}**\n<:EasterPoints:963716087449526322> Punti totali: **${result[0].points.toString()}**\n⌛Cooldown attuale: **${cooldown}**\n🥇Posizione: ${i}`)
                                .setColor(`YELLOW`)
                            message.reply({embeds: [embed]})      
                        }
                        i++
                    })
                })
            }
        })
    }
}