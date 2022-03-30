module.exports = {
    name: `shutdown`,
    FromOwner: true,
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Shutdown`)
            .setDescription(`Il bot è stato **spento** con successo!\nOra nessun comando funzionerà più`)
            .setColor(`RED`)
            .setThumbnail(config.images.rogishutdown)
        let embedlogs = new Discord.MessageEmbed()
            .setTitle(`📵SHUTDOWN📵`)
            .setDescription(`**⚠️IL BOT È STATO SPENTO⚠️**\n[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨Moderatore:`, `Nome: ${message.author.username}, ID: ${message.author.id}\n||${message.author.toString()}||`)
            .setColor(`RED`)
            .setThumbnail(config.images.rogishutdown)
        console.clear()
        console.error(`SPEGNIMENTO DEL BOT`)
        await message.reply({embeds: [embed]})
        await client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
        client.destroy()
    }
}