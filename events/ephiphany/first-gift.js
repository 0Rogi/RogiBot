module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `PrimoRegalo`) {
            let number = Math.floor(Math.random() * (3 - 1)) + 1
            let user = interaction.member
            if(user.roles.cache.has(ephiphany.alreadyclaimed.claimed1)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Regalo già riscattato`)
                    .setDescription(`Hai già riscattato il primo regalo :/\nPer riscattare il **secondo regalo** premi il pulsante qui sotto`)
                    .setColor(`RED`)
                let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Secondo Regalo`)
                            .setCustomId(`SecondoRegalo`)
                            .setStyle(`DANGER`)
                    )
                interaction.update({embeds: [embed], components: [row], ephemeral: true})
                return
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Primo Regalo`)
                .setColor(`GREEN`)
            let row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`Secondo Regalo`)
                    .setStyle(`DANGER`)
                    .setCustomId(`SecondoRegalo`)    
                )
            if(number == 1) {
                user.roles.add(ephiphany.emojisrole.emoji1)
                user.roles.add(ephiphany.alreadyclaimed.claimed1)
                embed.setImage(ephiphany.emojisimage.emoji1)
                embed.setDescription(`Il tuo primo regalo è quest'emoji: <:Hag:927493702199414824> da poter usare in **tutto il server** fino alla fine di Gennaio! (Se non puoi usare ancora l'emoji, riavvia discord)\nPer riscattare il **secondo regalo** premi il pulsante qui sotto`)
                interaction.update({embeds: [embed], components: [row], ephemeral: true})
            } else if(number == 2) {
                user.roles.add(ephiphany.emojisrole.emoji2)
                user.roles.add(ephiphany.alreadyclaimed.claimed1)
                embed.setImage(ephiphany.emojisimage.emoji2)
                embed.setDescription(`Il tuo primo regalo è quest'emoji: <:KaiBroom:927504130682024016> da poter usare in **tutto il server** fino alla fine di Gennaio! (Se non puoi usare ancora l'emoji, riavvia discord)\nPer riscattare il **secondo regalo** premi il pulsante qui sotto`)
                interaction.update({embeds: [embed], components: [row], ephemeral: true})
            }
            user.roles.add(ephiphany.generalrole)
        }
    }
}