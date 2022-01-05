module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `QuartoRegalo`) {
            let user = interaction.member
            if(user.roles.cache.has(ephiphany.alreadyclaimed.claimed4)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Regalo già riscattato`)
                    .setDescription(`Hai già riscattato il qurto regalo :/\nMi dispiace, sei arrivato al **fondo** della calza!`)
                    .setColor(`RED`)
                interaction.update({embeds: [embed], components: [], ephemeral: true})
                return
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Quarto Regalo`)
                .setColor(`GREEN`)
                .setImage(ephiphany.fourthgift.image)
                .setDescription(`Il quarto regalo è poter usare il comando \`!lyrics\` che ti permetterà di trovare il testo di una determinata canzone!\nCorri in <#826014465186332682> a provare il comando!`)
            interaction.update({embeds: [embed], components: [], ephemeral: true})
            user.roles.add(ephiphany.alreadyclaimed.claimed4)
            user.roles.add(ephiphany.fourthgift.ruolo)
        }
    }
}