module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `SecondoRegalo`) {
            let user = interaction.member
            if(user.roles.cache.has(ephiphany.alreadyclaimed.claimed2)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Regalo già riscattato`)
                    .setDescription(`Hai già riscattato il secondo regalo :/\nPer riscattare il **terzo regalo** premi il pulsante qui sotto`)
                    .setColor(`RED`)
                let row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Terzo Regalo`)
                            .setCustomId(`TerzoRegalo`)
                            .setStyle(`DANGER`)
                    )
                interaction.update({embeds: [embed], components: [row], ephemeral: true})
                return
            }
            let number = Math.floor(Math.random() * (5 - 1)) + 1
            let embed = new Discord.MessageEmbed()
                .setTitle(`Secondo Regalo`)
                .setColor(`GREEN`)
                .setDescription(`Il secondo regalo è una **freddura** a tema minecraft!!\nGoditela pure per quanto vuoi, dopo riscatta il terzo regalo :wink:\nPer riscattare il **terzo regalo** premi il pulsante qui sotto\nSe vuoi salvarti questa battuta, premi il pulsante verde per mandartela in dm!`)
            let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Terzo Regalo`)
                    .setStyle(`DANGER`)
                    .setCustomId(`TerzoRegalo`)    
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Salva la Freddura`)
                    .setStyle(`SUCCESS`)
                    .setCustomId(`DMSend`)    
            )
            if(number == 1) {
                embed.setImage(ephiphany.freddure.freddura1)
                user.roles.add(ephiphany.freddure.ruolo1)
            } else if(number == 2) {
                embed.setImage(ephiphany.freddure.freddura2)
                user.roles.add(ephiphany.freddure.ruolo2)
            } else if(number == 3) {
                embed.setImage(ephiphany.freddure.freddura3)
                user.roles.add(ephiphany.freddure.ruolo3)
            } else if(number == 4) {
                embed.setImage(ephiphany.freddure.freddura4)
                user.roles.add(ephiphany.freddure.ruolo4)
            }
            user.roles.add(ephiphany.alreadyclaimed.claimed2)
            interaction.update({embeds: [embed], components: [row], ephemeral: true})
        }
        if(interaction.customId == `DMSend`) {
            let user = interaction.member
            let embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
            if(user.roles.cache.has(ephiphany.freddure.ruolo1)) {
                embed.setImage(ephiphany.freddure.freddura1)
            } else if(user.roles.cache.has(ephiphany.freddure.ruolo2)) {
                embed.setImage(ephiphany.freddure.freddura2)
            } else if(user.roles.cache.has(ephiphany.freddure.ruolo3)) {
                embed.setImage(ephiphany.freddure.freddura3)
            } else if(user.roles.cache.has(ephiphany.freddure.ruolo4)) {
                embed.setImage(ephiphany.freddure.freddura4)
            }
            user.send({embeds: [embed]}).catch(() => { })
            interaction.deferUpdate()
        }
    }
}