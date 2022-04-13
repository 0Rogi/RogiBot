const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `open`,
    async execute(message) {
        let date = new Date()
        if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18) {
            let user = message.member
            database.collection(`Easter`).find({id: user.id}).toArray(function(err, result) {
                if(!result[0]) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Non hai mai raccolto uova!\nPer collezionare uova, attendi che il coniglio pasquale ne porti e riscattale prima degli altri!*`)
                        .setThumbnail(config.images.rogierror)
                        .setColor(`RED`)
                    message.reply({embeds: [embed]})
                    return
                }
                if(result[0]) {
                    let oldeggs = result[0].eggs
                    if(oldeggs <= 0) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Errore`)
                            .setDescription(`*Non hai più uova disponibili da aprire!\nPer collezionare uova, attendi che il coniglio pasquale ne porti e riscattale prima degli altri!*`)
                            .setThumbnail(config.images.rogierror)
                            .setColor(`RED`)
                        message.reply({embeds: [embed]})
                        if(oldeggs < 0) database.collection(`Easter`).updateOne({id: user.id}, {$set:{eggs: 0}})
                        return
                    }
                    let neweggs = oldeggs - 1
                    if(neweggs < 0) neweggs = 0
                    let oldpoints = result[0].points
                    let toadd = Math.floor(Math.random() * (60 - 35 + 1) + 35)
                    let newpoints = oldpoints + toadd
                    let oldopened = result[0].eggsopen
                    let newopened = oldopened + 1
                    database.collection(`Easter`).updateOne({id: user.id}, {$set:{points: newpoints, eggs: neweggs, eggsopen: newopened}})
                    let objects = [`una sciarpa fortunata`, `tanto cioccolato extra`, `dei giocattoli`, `uno schiaccianoci a forma di coccodrillo`, `un mazzo di carte`, `una collana`, `una rivista`, `dei colori`, `un libro`, `un cappello`, `un telefono`, `una bottiglia`, `una borsa`, `un biscotto della fortuna`]
                    let random = Math.floor(Math.random() * objects.length)
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:EasterEgg:962650324022222909> Apertura dell'uovo... <:EasterEgg:962650324022222909>`)
                        .setDescription(`Hai **aperto** il tuo uovo e hai trovato ${objects[random]} che vale **${toadd.toString()} punti** <:EasterPoints:963716087449526322>!\nPuoi verificare le tue statistiche con *\`!stats\`*`)
                        .setColor(`YELLOW`)
                    message.reply({embeds: [embed]})
                }
            })
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo comando è utilizzabile\nsolo durante la settimana di Pasqua!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
    }
}