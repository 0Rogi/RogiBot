module.exports = {
    name: `restart`,
    onlyOwner: true,
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Restart`)
            .setDescription(`Il bot è in fase di **restart**!!\nA breve tornerà online!`)
            .setColor(`RED`)
            .setThumbnail(config.images.rogirestart)
        let embedlogs = new Discord.MessageEmbed()
            .setTitle(`🔂RESTART🔂`)
            .setDescription(`**⚠️IL BOT È IN FASE DI RIAVVIO⚠️**\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨Moderatore:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.author.toString()}||`)
            .setColor(`RED`)
            .setThumbnail(config.images.rogirestart)
        console.clear()
        console.error(`Restart del bot...`)
        await message.reply({embeds: [embed]})
        await client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
        process.exit()
    }
}