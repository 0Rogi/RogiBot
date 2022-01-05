module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `TerzoRegalo`) {
            let user = interaction.member
            if(user.roles.cache.has(ephiphany.alreadyclaimed.claimed3)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Regalo già riscattato`)
                    .setDescription(`Hai già riscattato il terzo regalo :/\nPer riscattare il **quarto regalo**, premi il pulsante qui sotto`)
                    .setColor(`RED`)
                let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setLabel(`Quarto Regalo`)
                        .setStyle(`DANGER`)
                        .setCustomId(`QuartoRegalo`)    
                    )
                interaction.update({embeds: [embed], components: [row], ephemeral: true})
                return
            }
            let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setLabel(`Quarto Regalo`)
                        .setStyle(`DANGER`)
                        .setCustomId(`QuartoRegalo`)    
                    )
            let embed = new Discord.MessageEmbed()
                .setTitle(`Terzo Regalo`)
                .setColor(`GREEN`)
                .setImage(ephiphany.thirdgift.image)
                .setDescription(`Il tuo terzo regalo è il comando: \`!rps\`, che ti permetterà di giocare a **🪨sasso 📰carta ✂️forbice** con il bot!\nCorri in <#826014465186332682> a provare il comando!`)
            user.roles.add(ephiphany.thirdgift.ruolo)
            user.roles.add(ephiphany.alreadyclaimed.claimed3)
            interaction.update({embeds: [embed], components: [row], ephemeral: true})
        }
    }
}