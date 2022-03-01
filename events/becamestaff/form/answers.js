module.exports = {
    name: `modalSubmit`,
    async execute(modal) {
        if(modal.customId == `CandidatiPage1`) {
            let button1 = new Discord.MessageButton()
                .setLabel(`Rifiuta Candidatura`)
                .setStyle(`DANGER`)
                .setCustomId(`CandidatiRefuse`)
            let button2 = new Discord.MessageButton()
                .setLabel(`Accetta Candidatura`)
                .setStyle(`SUCCESS`)
                .setCustomId(`CandidatiAccept`)
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            let question1 = modal.getTextInputValue(`Question1`)
            let question2 = modal.getTextInputValue(`Question2`)
            let question3 = modal.getTextInputValue(`Question3`)
            let question4 = modal.getTextInputValue(`Question4`)
            let embed1 = new Discord.MessageEmbed()
                .setAuthor({name: modal.user.tag, iconURL: modal.user.displayAvatarURL({dynamic: true})})
                .setTitle(`Candidatura Staff (Pagina1)`)
                .addField(`Che ruolo vorresti interpretare?`, question1.toString())
                .addField(`Perchè vorresti diventare uno staffer?`, question2.toString())
                .addField(`Quanto tempo saresti disposto a dedicare?`, question3.toString())
                .addField(`Parlaci di te (se vuoi)`, question4 ? question4.toString() : `_Nessuna Risposta_`)
                .setFooter({text: `User ID: ${modal.user.id}`})
                .setThumbnail(modal.user.displayAvatarURL({dynamic: true}))
                .setColor(`YELLOW`)
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`Prima Pagina Completata!`)
                .setDescription(`Hai risposto a tutte le domande della prima pagina della candidatura!\n\nRipremi il bottone per completare la candidatura`)
                .setColor(`GREEN`)
            modal.member.roles.add(config.idruoli.page1)
            client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embed1], components: [row]}).then(msg => {msg.pin()})
            await modal.deferReply({ ephemeral: true })
            modal.followUp({embeds: [embed2], ephemeral: true})
        }
        if(modal.customId == `CandidatiPage2`) {
            let question1 = modal.getTextInputValue(`Question1`)
            let question2 = modal.getTextInputValue(`Question2`)
            let question3 = modal.getTextInputValue(`Question3`)
            let question4 = modal.getTextInputValue(`Question4`)
            let embed = new Discord.MessageEmbed()
                .setTitle(`Candidatura Staff (Pagina2)`)
                .addField(`In caso ci fosse un raid, cosa faresti?`, question1.toString())
                .addField(`Due utenti stanno litigando, cosa faresti?`, question2.toString())
                .addField(`"Voglio fare partnership" Cosa risponderesti`, question3.toString())
                .addField(`Sei mai stato staffer in altri server?`, question4.toString())
                .setFooter({text: `User ID: ${modal.user.id}`})
                .setThumbnail(modal.user.displayAvatarURL({dynamic: true}))
                .setColor(`YELLOW`)
            modal.member.roles.add(config.idruoli.page2)
            client.channels.cache.get(config.idcanali.logs.other).messages.fetch().then(messages => {
                messages.forEach(async msg => {
                    if(msg.embeds[0]?.title == `Candidatura Staff (Pagina1)`) {
                        if(msg.embeds[0]?.footer.text == `User ID: ${modal.user.id}`) {
                            msg.edit({embeds: [msg.embeds[0], embed]})
                            let embed2 = new Discord.MessageEmbed()
                                .setTitle(`Candidatura Completata!`)
                                .setDescription(`Hai risposto a tutte le domande della candidatura!\n\nLo staff visionerà la tua candidatura a breve!`)
                                .setColor(`GREEN`)
                            await modal.deferReply({ ephemeral: true })
                            modal.followUp({embeds: [embed2], ephemeral: true})
                        }
                    }
                })
            })
        }
    }
}