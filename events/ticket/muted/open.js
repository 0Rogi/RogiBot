const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isButton() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `TicketMuted`) {
            let server = client.guilds.cache.get(config.idServer.idServer)
            let user = interaction.user
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Hai già un ticket aperto*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror)
                interaction.reply({embeds: [embed], ephemeral: true})
                let canale = server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)
                canale.send(interaction.user.toString()).then(msg => {msg.delete()})
                return
            }
            server.channels.create(`⛔│${user.username}`, { type:`GUILD_TEXT` }).then(async canale => {
                canale.setTopic(`User ID: ${user.id}`)
                canale.setParent(config.idcanali.helpparent)
                await canale.permissionOverwrites.set([
                    {
                        id:server.id,
                        deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`]
                    },
                    {
                        id:user.id,
                        allow: [`VIEW_CHANNEL`]
                    },
                    {
                        id: config.idruoli.moderator,
                        allow: [`VIEW_CHANNEL`]
                    }
                ])
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Utente Mutato`)
                    .setDescription(`${user.toString()} è stato mutato e vuole ricevere supporto!\n\nPremi il pulsante qui sotto per **accettare il suo ticket** e parlare con lui`)
                    .setColor(`RED`)
                let button = new Discord.MessageButton()
                    .setLabel(`Accetta Ticket`)
                    .setCustomId(`AccettaTicketMuted`)
                    .setStyle(`SUCCESS`)
                let row = new Discord.MessageActionRow()
                    .addComponents(button)
                let embedlog = new Discord.MessageEmbed()
                    .setTitle(`✉️Ticket in attesa di essere accettato✉️`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤Utente:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n${interaction.user.toString()}`)
                    .addField(`📖Categoria:`, `Richiesta Unmute`)
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    .setColor(`YELLOW`)
                canale.send({embeds: [embed], components: [row]})
                canale.send(interaction.user.toString()).then(msg => {msg.delete()})
                client.channels.cache.get(config.idcanali.logs.ticket).send({embeds: [embedlog]})
            })
            interaction.deferUpdate()
        }
    }
}