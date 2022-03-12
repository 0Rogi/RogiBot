module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if(!interaction.isButton() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `AccettaTicketMuted`) {
            if(!interaction.member.roles.cache.has(config.idruoli.moderator) && !interaction.member.roles.cache.has(config.idruoli.srmoderator) && !interaction.member.roles.cache.has(config.idruoli.owner)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Solo un moderatore puo' accettare il ticket*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.reply({embeds: [embed], ephemeral: true})
                return
            }
            let button1 = new Discord.MessageButton()
                .setLabel(`Accetta Ticket`)
                .setCustomId(`AccettaTicketMuted`)
                .setStyle(`SUCCESS`)
                .setDisabled()
            let button2 = new Discord.MessageButton()
                .setLabel(`Chiudi Ticket`)
                .setStyle(`DANGER`)
                .setCustomId(`ChiudiTicket`)
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            interaction.update({components: [row]})
            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket Aperto`)
                .setDescription(`Il tuo **ticket** per contestare il mute è stato accettato da ${interaction.user.toString()}\n\nOra puoi parlare con i **moderatori**`)
                .setColor(`GREEN`)
            let topic = interaction.channel.topic
            if(!topic) return
            let id = topic.slice(9)
            if(!id) return
            interaction.channel.permissionOverwrites.set([
                {
                    id: config.idServer.idServer,
                    deny: [`VIEW_CHANNEL`]
                },
                {
                    id: id,
                    allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                },
                {
                    id: config.idruoli.moderator,
                    allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                }
            ])
            let utente = client.users.cache.get(id)
            if(!utente) return
            let dm = true
            await utente.send({embeds: [embed]}).catch(() => {dm = false})
            let embedlog = new Discord.MessageEmbed()
                .setTitle(`✉️Ticket Accettato✉️`)
                .setDescription(`⚠️L'utente **è stato** avvisato nei dm⚠️`)
                .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`🗣️Accettato Da:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n${interaction.user.toString()}`)
                .addField(`👤Utente:`, `Nome: **${utente.username}**, ID: **${id}**\n${utente.toString()}`)
                .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                .setColor(`GREEN`)
            if(dm == false) embedlog.setDescription(`⚠️L'utente **non è stato** avvisato nei dm⚠️`)
            client.channels.cache.get(config.idcanali.logs.ticket).send({embeds: [embedlog]})
        }
    }
}