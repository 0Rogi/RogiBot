const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `rps`,
    execute(message) {
        if(!message.member.roles.cache.has(config.idruoli.level15) && !message.member.roles.cache.has(config.idruoli.level20) && !message.member.roles.cache.has(config.idruoli.level25) && !message.member.roles.cache.has(config.idruoli.level30) && !message.member.roles.cache.has(config.idruoli.serverbooster) && !message.member.roles.cache.has(config.idruoli.srmoderator) && !message.member.roles.cache.has(config.idruoli.owner)) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`_Hai bisogno almeno del **livello 15**\nper eseguire questo comando_`)
                .setTitle(`Non hai il livello`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let args = message.content.toLowerCase().slice(5)
        if(!args || args != `rock` && args != `paper` && args != `scissor`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci rock, paper, scissor\n\`!rps [rock/paper/scissor]\`*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
        let rps = [`rock`, `paper`, `scissor`]
        let answer = Math.floor(Math.random() * rps.length)
        let title = ``
        if(args == `rock` && rps[answer] == `rock`) title = `Pareggio`
        if(args == `rock` && rps[answer] == `paper`) title = `Hai perso`
        if(args == `paper` && rps[answer] == `rock`) title = `Hai vinto`
        if(args == `paper` && rps[answer] == `paper`) title = `Pareggio`
        if(args == `paper` && rps[answer] == `scissor`) title = `Hai perso`
        if(args == `scissor` && rps[answer] == `paper`) title = `Hai vinto`
        if(args == `scissor` && rps[answer] == `scissor`) title = `Pareggio`
        if(args == `scissor` && rps[answer] == `rock`) title = `Hai perso`
        if(args == `rock` && rps[answer] == `scissor`) title = `Hai vinto`
        let descriptionuser = ``
        if(args == `rock`) descriptionuser = `🪨Pietra`
        if(args == `scissor`) descriptionuser = `✂️Forbici`
        if(args == `paper`) descriptionuser = `📰Carta`
        let descriptionbot = ``
        if(rps[answer] == `rock`) descriptionbot = `🪨Pietra`
        if(rps[answer] == `scissor`) descriptionbot = `✂️Forbici`
        if(rps[answer] == `paper`) descriptionbot = `📰Carta`
        let embed = new Discord.MessageEmbed()
            .setTitle(title.toString())
            .setDescription(`Risposta di ${message.member}:\n**${descriptionuser.toString()}**\nRisposta BOT:\n**${descriptionbot}**`)
            .setColor(`YELLOW`)
            .setThumbnail(`https://i.imgur.com/FydhJ7f.png`)
        message.reply({embeds: [embed]})
    }
}