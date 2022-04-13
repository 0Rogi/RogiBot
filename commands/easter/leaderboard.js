module.exports = {
    name: `lb`,
    execute(message) {        
        database.collection(`Easter`).find().sort({points: -1}).toArray(function(err, result) {
            let text = ``
            let i = 0
            result.forEach(async r => {
                if(i > 10 - 1) return
                let id = r.id
                let user = client.users.cache.get(id)
                if(user) user = user.username
                if(!user) user = r.username
                text += `**#${i + 1}** ${user} - **${r.points}** - **${r.eggsopen}**\n`
                i++
            })
            if(!text) text = `_Nessun utente in classifica_`
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:EasterEgg:962650324022222909> Classifica Pasquale <:EasterEgg:962650324022222909>`)
                .setDescription(`🕊️Classifica dei primi **10 utenti** nella classifica Pasquale🕊️\n​`)
                .addField(`<:EasterPoints:963716087449526322>PUNTI<:EasterPoints:963716087449526322> - 🥚UOVA APERTE🥚`, `​\n${text}`)
                .setColor(`YELLOW`)
            message.reply({embeds: [embed]})
        })
    }
}