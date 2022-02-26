module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        if(interaction.guild != config.idServer.idServer || !interaction.isButton()) return
        if(interaction.customId == `AnnullaSlowmode`) {
            if(!interaction.member.roles.cache.has(config.idruoli.staff)) { 
                let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`Devi essere almeno **Helper** per annullare lo slowmode in questo canale`)
                .setTitle(`Non hai il permesso!`)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
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
            let embed = new Discord.MessageEmbed()
                .setTitle(`⛓️Slowmode Da Spam Annullato⛓️`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`💬Canale:`, `${interaction.channel}`)
                .addField(`🔨Moderatore:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n||${interaction.user.toString()}||`)
                .setColor(`GREEN`)
                .setThumbnail(interaction.user.avatarURL({dynamic: true}))
            client.channels.cache.get(config.idcanali.logs.moderation).send({embeds: [embed]})
            interaction.channel.setRateLimitPerUser(0)
            interaction.update({components: [row]})
        } 
    }
}