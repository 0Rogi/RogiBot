module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isButton() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `Solved`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Problema risolto`)
                .setDescription(`Tra \`20 secondi\` il ticket verrà chiuso...`)
                .setColor(`RED`)
            let button = new Discord.MessageButton()
                .setStyle(`DANGER`)
                .setLabel(`Annulla`)
                .setCustomId(`Annulla`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            global.chiudi = true
            interaction.channel.send({embeds: [embed], components: [row]}).then(msg => {
                setTimeout(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Problema risolto`)
                    .setDescription(`Tra \`10 secondi\` il ticket verrà chiuso...`)
                    .setColor(`RED`)
                msg.edit({embeds: [embed]})
                }, 1000 * 10);
            })
            interaction.deferUpdate()
            setTimeout(async () => {
                if(global.chiudi == true) {
                    let attachment = await discordTranscripts.createTranscript(interaction.channel)
                    let embedlog = new Discord.MessageEmbed()
                        .setTitle(`🎫Ticket Chiuso🎫`)
                        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`👤Utente:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n${interaction.user.toString()}`)
                        .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                        .setColor(`RED`)
                    let logs = client.channels.cache.get(config.idcanali.logs.ticket)
                    logs.send({embeds: [embedlog], files: [attachment]})
                    interaction.channel.delete()
                }
            }, 1000 * 20);
        }
        if(interaction.customId == `ChiudiTicket`) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Ticket in chiusura...`)
                .setDescription(`Tra \`20 secondi\` il ticket verrà chiuso...`)
                .setColor(`RED`)
            let button = new Discord.MessageButton()
                .setStyle(`DANGER`)
                .setLabel(`Annulla`)
                .setCustomId(`Annulla`)
            let row = new Discord.MessageActionRow()
                .addComponents(button)
            global.chiudi = true
            interaction.channel.send({embeds: [embed], components: [row]}).then(msg => {
                setTimeout(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Ticket in chiusura...`)
                    .setDescription(`Tra \`10 secondi\` il ticket verrà chiuso...`)
                    .setColor(`RED`)
                msg.edit({embeds: [embed]})
                }, 1000 * 10);
            })
            interaction.deferUpdate()
            setTimeout(async () => {
                if(global.chiudi == true) {
                    let attachment = await discordTranscripts.createTranscript(interaction.channel)
                    let embedlog = new Discord.MessageEmbed()
                        .setTitle(`🎫Ticket Chiuso🎫`)
                        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🗣️Chiuso da:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n${interaction.user.toString()}`)
                        .addField(`👤Ticket di:`, `Nome: **${client.users.cache.get(interaction.channel.topic.slice(9)).username}**, ID: **${interaction.channel.topic.slice(9)}**\n${client.users.cache.get(interaction.channel.topic.slice(9)).toString()}`)
                        .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                        .setColor(`RED`)
                    let logs = client.channels.cache.get(config.idcanali.logs.ticket)
                    logs.send({embeds: [embedlog], files: [attachment]})
                    interaction.channel.delete()
                }
            }, 1000 * 20);
        }
        if(interaction.customId == `Annulla`) {
            global.chiudi = false
            interaction.message.delete()
        }
    }
}