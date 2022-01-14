/*module.exports = {
    name: `ready`,
    execute() {
        let embed = new Discord.MessageEmbed()
            .setTitle(`🔇MUTATO🔇`)
            .setDescription(`Sei stato mutato! Se non lo ritieni corretto clicca il pulsante qui sotto per parlare con i moderatori!`)
            .setColor(`RED`)
        let row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setLabel(`Parla con i moderatori`)
                .setStyle(`DANGER`)
                .setCustomId(`Ticket`))
        client.channels.cache.get(config.idcanali.muted).send({embeds: [embed], components: [row]}).then(msg => {
            msg.pin()
        })
    }
}*/
module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `Ticket`) {
            var server = client.guilds.cache.get(config.idServer.idServer)
            var user = interaction.user
    if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
        interaction.reply({content: `Hai già un ticket aperto. Chiudi quello aperto per aprire uno nuovo`, ephemeral: true})
        return
    }
    server.channels.create(user.username, {
        type:`GUILD_TEXT`,
    }).then(canale => {
        canale.setTopic(`User ID: ${user.id}`)
        canale.setParent(config.idcanali.helpparent)
        canale.permissionOverwrites.set([
            {
                id:server.id,
                deny: [`VIEW_CHANNEL`]
            },
            {
                id:user.id,
                allow: [`VIEW_CHANNEL`]
            },
            {
                id: config.idruoli.staff,
                allow: [`VIEW_CHANNEL`]
            }
        ])
        canale.send(`${user} grazie per aver aperto un ticket. Esponi il tuo problema ed attendi che uno staffer ti risponda. Se hai aperto il ticket per errore usa !tclose.\n⚠️**RICORDA**⚠️\nNon creare ticket inutili altrimenti riceverai un warn.`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`🎫Nuovo Ticket🎫`)
            .setColor(`YELLOW`)
            .setDescription(`${user} ha aperto un ticket: <#${canale.id}>`)
        client.channels.cache.get(config.idcanali.logs).send({embeds: [embed]})
        interaction.deferUpdate()
        })
    }
}}