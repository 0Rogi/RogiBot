module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `Thingstodo`) {
            if(interaction.values[0] == `Todo` || interaction.values[1] == `Todo`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`WHITE`)
                    .addField(`Stato:`, `🔲Da fare...`)
                    .addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
                interaction.update({embeds: [embed]})
            }
            if(interaction.values[0] == `Completed` || interaction.values[1] == `Completed`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`WHITE`)
                    .addField(`Stato:`, `🟩Completato`)
                    .addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
                interaction.update({embeds: [embed]})
            }
            if(interaction.values[0] == `Delete` || interaction.values[1] == `Delete`) {
                let message = interaction.message
                message.delete()
            }
        }
    }
}