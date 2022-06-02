const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `typingStart`,
    async execute(typing) {
        if (typing.guild != config.idServer.idServer) return
        let msg = await client.channels.cache.get(config.idcanali.logs.messages.typingstart).messages.fetch({ limit: 1 })
        msg = msg.first()
        if (msg?.embeds[0]?.footer?.text.slice(9) == typing.user.id && msg?.embeds[0]?.description.includes(typing.channel.name)) return
        let embed = new Discord.MessageEmbed()
            .setTitle(`⌨️ Qualcuno ha iniziato a scrivere ⌨️`)
            .setDescription(`**${typing.user.username}** ha iniziato a scrivere in **${typing.channel.name}**`)
            .setColor(`BLUE`)
            .setThumbnail(typing.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `User ID: ${typing.user.id}` })
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
        client.channels.cache.get(config.idcanali.logs.messages.typingstart).send({ embeds: [embed] })
    }
}