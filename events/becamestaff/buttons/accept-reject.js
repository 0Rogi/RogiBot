module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if(!interaction.isButton() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `CandidatiAccept`) {
            if(!interaction.member.roles.cache.has(config.idruoli.owner) && !interaction.member.roles.cache.has(config.idruoli.srmoderator)) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`Devi essere almeno **SR Moderator** per accettare questa candidatura!`)
                    .setTitle(`Non hai il permesso!`)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
            let id = interaction.message.embeds[0]?.footer.text.slice(9)
            if(!id) return
            let utente = client.users.cache.get(id)
            if(!utente) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`*Non riesco a trovare quest'utente\npotrebbe essere uscito dal server*`)
                    .setTitle(`Errore`)
                    .setThumbnail(config.images.rogierror)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
            let embed = interaction.message.embeds[0]
            embed.setDescription(`Candidatura accetata da ${interaction.member.toString()}\n⚠️L'utente **è stato** avvisato nei dm⚠️`)
            embed.setColor(`GREEN`)
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`La tua candidatura è stata accettata!`)
                .setColor(`GREEN`)
                .setDescription(`Lo staff ha visionato la tua candidatura e... **è stata accettata**!! A breve scoprirai quale ruolo potrai interpretare!`)
            let dm = true
            await utente.send({embeds: [embed2]}).catch(() => {dm = false})
            if(dm == false) embed.setDescription(`Candidatura accetata da ${interaction.member.toString()}\n⚠️L'utente **non è stato** avvisato nei dm⚠️`)
            let button1 = new Discord.MessageButton()
                .setLabel(`Rifiuta Candidatura`)
                .setStyle(`DANGER`)
                .setCustomId(`CandidatiRefuse`)
                .setDisabled()
            let button2 = new Discord.MessageButton()
                .setLabel(`Accetta Candidatura`)
                .setStyle(`SUCCESS`)
                .setCustomId(`CandidatiAccept`)
                .setDisabled()
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            interaction.message.unpin()
            if(interaction.message.embeds[1]) {
                interaction.message.embeds[1].setColor(`GREEN`)
                interaction.update({embeds: [embed, interaction.message?.embeds[1]], components: [row]})
                return
            }
            if(!interaction.message.embeds[1]) {
                interaction.update({embeds: [embed], components: [row]})
                return
            }
        }
        if(interaction.customId == `CandidatiRefuse`) {
            if(!interaction.member.roles.cache.has(config.idruoli.owner) && !interaction.member.roles.cache.has(config.idruoli.srmoderator)) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`Devi essere almeno **SR Moderator** per rifiutare questa candidatura!`)
                    .setTitle(`Non hai il permesso!`)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
            let id = interaction.message.embeds[0]?.footer.text.slice(9)
            if(!id) return
            let utente = client.users.cache.get(id)
            if(!utente) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`*Non riesco a trovare quest'utente\npotrebbe essere uscito dal server*`)
                    .setTitle(`Errore`)
                    .setThumbnail(config.images.rogierror)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
            let embed = interaction.message.embeds[0]
            embed.setDescription(`Candidatura rifiutata da ${interaction.member.toString()}\n⚠️L'utente **è stato** avvisato nei dm⚠️`)
            embed.setColor(`RED`)
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`La tua candidatura è stata rifiutata!`)
                .setColor(`GREEN`)
                .setDescription(`Lo staff ha visionato la tua candidatura e purtroppo **è stata rifiutata**!! Potrai ricandidarti una prossima volta 😉`)
            let dm = true
            await utente.send({embeds: [embed2]}).catch(() => {dm = false})
            if(dm == false) embed.setDescription(`Candidatura rifiutata da ${interaction.member.toString()}\n⚠️L'utente **non è stato** avvisato nei dm⚠️`)
            let button1 = new Discord.MessageButton()
                .setLabel(`Rifiuta Candidatura`)
                .setStyle(`DANGER`)
                .setCustomId(`CandidatiRefuse`)
                .setDisabled()
            let button2 = new Discord.MessageButton()
                .setLabel(`Accetta Candidatura`)
                .setStyle(`SUCCESS`)
                .setCustomId(`CandidatiAccept`)
                .setDisabled()
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            interaction.message.unpin()
            if(interaction.message.embeds[1]) {
                interaction.message.embeds[1].setColor(`RED`)
                interaction.update({embeds: [embed, interaction.message?.embeds[1]], components: [row]})
                return
            }
            if(!interaction.message.embeds[1]) {
                interaction.update({embeds: [embed], components: [row]})
                return
            }
        }
    }
}