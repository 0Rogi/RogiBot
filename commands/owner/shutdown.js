module.exports = {
    name: `shutdown`,
    onlyOwner: true,
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Shutdown`)
            .setDescription(`Il bot è stato **spento** con successo!\nOra nessun comando funzionerà più`)
            .setColor(`RED`)
            .setThumbnail(config.images.rogishutdown)
        console.clear()
        console.error(`SPEGNIMENTO DEL BOT`)
        await message.reply({embeds: [embed]})
        client.destroy()
    }
}