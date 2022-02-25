module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        if(interaction.guild != config.idServer.idServer || !interaction.isButton()) return
        if(interaction.customId == `AnnullaSlowmode`) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`Devi essere almeno **Helper** per annullare lo slowmode in questo canale`)
                .setTitle(`Non hai il permesso!`)
            if(!interaction.member.roles.cache.has(config.idruoli.staff)) return interaction.reply({embeds: [embed], ephemeral: true})
            let button = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setLabel(`Annulla Slowmode`)
                .setCustomId(`AnnullaSlowmode`)
                .setDisabled()
            let button2 = new Discord.MessageButton()
                .setStyle(`PRIMARY`)
                .setLabel(`Annulla Timeout`)
                .setCustomId(`AnnullaTimeout`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
                .addComponents(button2)
            interaction.channel.setRateLimitPerUser(0)
            interaction.update({components: [row]})
        } 
    }
}