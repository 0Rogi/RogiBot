const mcutil = require(`minecraft-server-util`)

module.exports = {
    name: `coppercraft`,
    execute(message) {
        message.channel.sendTyping()
        try {
            mcutil.status(`coppercraft.seekahostservers.com`, {port: 25565}).then(async response => {
                console.log(response.version)
                if(response.version == `§4● Offline`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                        .setDescription(`Il server è attualmente **🔴OFFLINE**`)
                        .setColor(`RED`)
                        .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                    message.reply({embeds: [embed]})
                    return
                }
                if(response.version == `§7◌ Loading...` || response.version == `§7◌ Starting...`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                        .setDescription(`Il server è attualmente **in ⚫APERTURA**`)
                        .setColor(`GRAY`)
                        .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                    message.reply({embeds: [embed]})
                    return
                }
                let text = `\`\`\`\n`
                if(response.samplePlayers) {
                    await response.samplePlayers.forEach(player => {
                        text += `${player.name}\n`
                    })
                }
                text += `\`\`\``
                if(!response.samplePlayers || !text) text = `_🔴Nessun Player Online🔴_`
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                    .addField(`Player Online: ${response.onlinePlayers}`, `${text}`)
                    .addField(`🎞️Server IP:`, response.host)
                    .setColor(`YELLOW`)
                    .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                message.reply({embeds: [embed]})
            }).catch(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                    .setDescription(`Il server è attualmente **🔴OFFLINE**`)
                    .setColor(`RED`)
                    .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                message.reply({embeds: [embed]})
                return
            })
        } catch {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                .setDescription(`Il server è attualmente **🔴OFFLINE**`)
                .setColor(`RED`)
                .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
            message.reply({embeds: [embed]})
            return
        }
    }
}