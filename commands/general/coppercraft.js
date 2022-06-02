const mcutil = require(`minecraft-server-util`)

module.exports = {
    name: `coppercraft`,
    data: {
        name: `coppercraft`,
        description: `Mostra informazioni sulla coppercraft`,
    },
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(() => {
            try {
                mcutil.status(`coppercraft.seekahostservers.com`, { port: 25565 }).then(async response => {
                    if (response.version == `§4● Offline`) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                            .setDescription(`Il server è attualmente **🔴OFFLINE**`)
                            .setColor(`RED`)
                            .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                        interaction.editReply({ embeds: [embed] })
                        return
                    }
                    if (response.version == `§7◌ Loading...` || response.version == `§7◌ Starting...`) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                            .setDescription(`Il server è attualmente **in ⚫APERTURA**`)
                            .setColor(`GRAY`)
                            .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                        interaction.editReply({ embeds: [embed] })
                        return
                    }
                    let text = `\`\`\`\n`
                    if (response.samplePlayers) {
                        await response.samplePlayers.forEach(player => {
                            text += `${player.name}\n`
                        })
                    }
                    text += `\`\`\``
                    if (!response.samplePlayers || !text) text = `_Nessun Player Online_`
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                        .addField(`Player Online: ${response.onlinePlayers}`, `${text}`)
                        .addField(`🎞️Server IP:`, response.host)
                        .addField(`⌨️Versione:`, `1.18.2`)
                        .setColor(`YELLOW`)
                        .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                    interaction.editReply({ embeds: [embed] })
                }).catch((err) => {
                    console.log(err)
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                        .setDescription(`Il server è attualmente **🔴OFFLINE**`)
                        .setColor(`RED`)
                        .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                    interaction.editReply({ embeds: [embed] })
                    return
                })
            } catch (err) {
                console.log(err)
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<:CopperCraft:965902219067138069>CopperCraft<:CopperCraft:965902219067138069>`)
                    .setDescription(`Il server è attualmente **🔴OFFLINE**`)
                    .setColor(`RED`)
                    .setThumbnail(`https://i.imgur.com/U4TvwrV.png`)
                interaction.editReply({ embeds: [embed] })
                return
            }
        })
    }
}