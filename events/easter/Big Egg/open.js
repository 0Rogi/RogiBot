const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId == `BigOpen`) {
            let button1 = new Discord.MessageButton()
                .setEmoji(`◀️`)
                .setCustomId(`EasterBack`)
                .setStyle(`PRIMARY`)
            let button2 = new Discord.MessageButton()
                .setEmoji(`▶️`)
                .setCustomId(`EasterForward`)
                .setStyle(`PRIMARY`)
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            database.collection(`Easter`).find({id: interaction.member.id}).toArray(function(err, result) {
                if(!result[0]) {
                    if(interaction.member.roles.cache.has(config.idruoli.serverbooster)) database.collection(`Easter`).insertOne({username: interaction.user.username, id: interaction.member.id, cooldown: 0, eggs: 5, points: 200, eggsopen: 0, opened: true})
                    if(!interaction.member.roles.cache.has(config.idruoli.serverbooster)) database.collection(`Easter`).insertOne({username: interaction.user.username, id: interaction.member.id, cooldown: 0, eggs: 3, points: 100, eggsopen: 0, opened: true})
                }
                if(result[0] && !result[0].opened) {
                    database.collection(`Easter`).updateOne({id: interaction.member.id}, {$set:{opened: true}})
                    if(interaction.member.roles.cache.has(config.idruoli.serverbooster)) {
                        let points = result[0].points + 200
                        let eggs = result[0].eggs + 5
                        database.collection(`Easter`).updateOne({id: interaction.member.id}, {$set:{points: points}})
                        database.collection(`Easter`).updateOne({id: interaction.member.id}, {$set:{eggs: eggs}})
                    }
                    if(!interaction.member.roles.cache.has(config.idruoli.serverbooster)) {
                        let points = result[0].points + 100
                        let eggs = result[0].eggs + 5
                        database.collection(`Easter`).updateOne({id: interaction.member.id}, {$set:{points: points}})
                        database.collection(`Easter`).updateOne({id: interaction.member.id}, {$set:{eggs: eggs}})
                    }
                }
                if(result[0] && result[0].opened) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Hai già aperto questo uovo!`)
                        .setDescription(`Hai **già aperto** questo uovo!\nUsa i **pulsanti qui sotto** per vedere cosa hai trovato!`)
                        .setColor(`RED`)
                        .setFooter({text: `Page 0/4`})
                    interaction.reply({embeds: [embed], components: [row], ephemeral: true})
                    return
                }
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<:EasterEgg:962650324022222909>Apertura **dell'uovo di Pasqua**<:EasterEgg:962650324022222909>`)
                    .setDescription(`Premi i pulsanti qui sotto per vedere le tue **ricompense**<:Prize:962650501160251482>`)
                    .setColor(`YELLOW`)
                    .setFooter({text: `Page 0/4`})
                let embedlogs = new Discord.MessageEmbed()
                    .setTitle(`🥚Uovo aperto🥚`)
                    .setColor(`RED`)
                    .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true, size: 512 }))
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤Utente:`, `Nome: **${interaction.member.user.username}**, ID: **${interaction.member.id}**\n||${interaction.member.toString()}||`)
                    .addField(`🚀Booster?`, interaction.member.roles.cache.has(config.idruoli.serverbooster) ? `Sì` : `No`)
                interaction.reply({embeds: [embed], components: [row], ephemeral: true})
                interaction.member.roles.add(config.idruoli.easter)
                client.channels.cache.get(`963473599149269084`).send({embeds: [embedlogs]})
                client.channels.cache.get(`960926896651128904`).send({embeds: [embedlogs]})
            })
        }
    }
}