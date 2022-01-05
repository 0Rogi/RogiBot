module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `Epifania`) {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Primo Regalo`)
                .setDescription(`Come promesso in questa calza ci sono ben **4 regali**! Premi il pulsante **qui sotto** per prendere il tuo primo regalo`)
                .setImage(ephiphany.firstgift)
            let row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel(`Primo Regalo`)
                        .setStyle(`DANGER`)
                        .setCustomId(`PrimoRegalo`)
                )
            interaction.reply({embeds: [embed], components: [row], ephemeral: true})
        }
    }
}