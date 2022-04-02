const https = require(`https`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId.split(`,`)[0] == `NextMeme`) {
            let date = new Date()
            if(date.getMonth() == 3 && date.getDate() == 1 || interaction.member.roles.cache.has(config.idruoli.srmoderator) || interaction.member.roles.cache.has(config.idruoli.owner)) {
                if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({content: `Non è un tuo pulsante!`, ephemeral: true})
                let url = 'https://www.reddit.com/r/memes/hot/.json?limit=100'
                https.get(url, (result) => {
                    let body = ''
                    result.on('data', (chunk) => {
                        body += chunk
                    })
                    result.on('end', () => {
                        let response = JSON.parse(body);
                        let index = response.data.children[Math.floor(Math.random() * 99) + 1].data
                        let embed = new Discord.MessageEmbed()
                            .setTitle(index.title)
                            .setImage(index.url_overridden_by_dest)
                            .setFooter({text: `👍🏻${index.ups}`})
                            .setColor(`YELLOW`)
                        interaction.update({embeds: [embed]})         
                    })
                })
            } else {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Questo comando è utilizzabile\nsolo durante il primo aprile!*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
        }
    }
}