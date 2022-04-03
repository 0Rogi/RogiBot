const https = require(`https`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: 'meme',
    execute(message) {
        let date = new Date()
        if(date.getMonth() == 3 && date.getDate() == 1 || message.member.roles.cache.has(config.idruoli.srmoderator) || message.member.roles.cache.has(config.idruoli.owner)) {
            message.channel.sendTyping()
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
                    let button = new Discord.MessageButton()
                        .setEmoji(`➡️`)
                        .setCustomId(`NextMeme,${message.author.id}`)
                        .setStyle(`PRIMARY`)
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    message.channel.send({embeds: [embed], components: [row]})         
                })

            })
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo comando è utilizzabile\nsolo durante il primo aprile!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
    }
}