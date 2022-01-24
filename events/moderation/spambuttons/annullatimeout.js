module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if(interaction.customId == "AnnullaTimeout") {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`Devi essere almeno **Helper** per annullare il timeout a quest'utente`)
                .setTitle(`Non hai il permesso!`)
            if(!interaction.member.roles.cache.has(config.idruoli.staff)) return interaction.reply({embeds: [embed], ephemeral: true})
            let message = await interaction.channel.messages.cache.get(interaction.message.id)
            let id = message.embeds[0].footer.text.slice(9)
            let server = client.guilds.cache.get(config.idServer.idServer)
            let user = server.members.cache.find(x => x.id == id)
            if(!user) return interaction.reply({content: "Non riesco a trovare l'utente", ephemeral: true})
            user.timeout(0, "Timeout Annullato")
            let button = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setLabel(`Annulla Slowmode`)
                .setCustomId(`AnnullaSlowmode`)
                .setDisabled()
            let button2 = new Discord.MessageButton()
                .setStyle(`SECONDARY`)
                .setLabel(`Annulla Timeout`)
                .setCustomId(`AnnullaTimeout`)
                .setDisabled()
            let row = new Discord.MessageActionRow()
                .addComponents(button)
                .addComponents(button2)
            interaction.update({components: [row]})
        }
    }
}