module.exports = {
    name: `restart`,
    onlyOwner: true,
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Restart`)
            .setDescription(`Il bot è in fase di **restart**!!\nA breve tornerà online!`)
            .setColor(`RED`)
            .setThumbnail(config.images.rogirestart)
        console.clear()
        console.error(`Restart del bot...`)
        await message.reply({embeds: [embed]})
        process.exit()
    }
}