const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        const totalpage = 4
        let page0 = new Discord.MessageEmbed()
            .setTitle(`<:EasterEgg:962650324022222909>Apertura **dell'uovo di Pasqua**<:EasterEgg:962650324022222909>`)
            .setColor(`YELLOW`)
            .setDescription(`Premi i pulsanti qui sotto per vedere le tue **ricompense**<:Prize:962650501160251482>`)
            .setThumbnail(`https://i.imgur.com/mm0H0GK.png`)
            .setFooter({text: `Page 0/${totalpage}`})
        let page1 = new Discord.MessageEmbed()
            .setTitle(`<:Emoji:964923588916437012>Emoji<:Emoji:964923588916437012>`)
            .setColor(`YELLOW`)
            .setDescription(`Nell'uovo hai **questa emoji**: <:RogiEaster:964939132793131018>, che potrai usare fino a <t:1650319200:R>.`)
            .setThumbnail(`https://i.imgur.com/mm0H0GK.png`)
            .setFooter({text: `Page 1/${totalpage}`})
        let page2 = new Discord.MessageEmbed()
            .setTitle(`🚀Boost XP🚀`)
            .setColor(`YELLOW`)
            .setDescription(`Un boost🚀 del **20%** nel livellamento, fino a <t:1650319200:R>.`)
            .setThumbnail(`https://i.imgur.com/mm0H0GK.png`)
            .setFooter({text: `Page 2/${totalpage}`})
        let page3 = new Discord.MessageEmbed()
            .setTitle(`<:EasterPoints:963716087449526322>Punti<:EasterPoints:963716087449526322>`)
            .setColor(`YELLOW`)
            .setDescription(`${interaction.member.roles.cache.has(config.idruoli.serverbooster) ? `**200**` : `**100**`} punti<:EasterPoints:963716087449526322>.\nVerifica la tua **posizione attuale** con il comando *\`!stats\`*.`)
            .setThumbnail(`https://i.imgur.com/mm0H0GK.png`)
            .setFooter({text: `Page 3/${totalpage}`})
        let page4 = new Discord.MessageEmbed()
            .setTitle(`<:EasterEgg:962650324022222909>Uova Extra<:EasterEgg:962650324022222909>`)
            .setColor(`YELLOW`)
            .setDescription(`${interaction.member.roles.cache.has(config.idruoli.serverbooster) ? `**5**` : `**3**`} uova<:EasterEgg4:960930868375998484> da aprire.\nPuoi aprirle con il comando *\`!open\`*.`)
            .setThumbnail(`https://i.imgur.com/mm0H0GK.png`)
            .setFooter({text: `Page 4/${totalpage}`})
        if(interaction.customId == `EasterForward`) {
            let currentpage = parseInt(interaction.message.embeds[0].footer.text.slice(5, 6))
            let nextpage = currentpage + 1
            if(nextpage > totalpage) nextpage = 0
            if(nextpage < 0) nextpage = 4
            let embed;
            if(nextpage == 0) embed = page0
            if(nextpage == 1) embed = page1
            if(nextpage == 2) embed = page2
            if(nextpage == 3) embed = page3
            if(nextpage == 4) embed = page4
            interaction.update({embeds: [embed]})
        }
        if(interaction.customId == `EasterBack`) {
            let currentpage = parseInt(interaction.message.embeds[0].footer.text.slice(5, 6))
            let nextpage = currentpage - 1
            if(nextpage > totalpage) nextpage = 0
            if(nextpage < 0) nextpage = 4
            let embed;
            if(nextpage == 0) embed = page0
            if(nextpage == 1) embed = page1
            if(nextpage == 2) embed = page2
            if(nextpage == 3) embed = page3
            if(nextpage == 4) embed = page4
            interaction.update({embeds: [embed]})
        }
    }
}