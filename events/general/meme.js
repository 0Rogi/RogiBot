const https = require(`https`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId.split(`,`)[0] == `NextMeme`) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280>Questo non รจ un tuo pulsante!`, ephemeral: true })
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
                        .setFooter({ text: `๐๐ป${index.ups}` })
                        .setColor(`YELLOW`)
                    interaction.update({ embeds: [embed] })
                })
            })
        }
    }
}