const moment = require(`moment`)

module.exports = {
    name: `guildMemberAdd`,
    execute(member) {
        if(member.guild != config.idServer.idServer) return
        let channel = client.channels.cache.get(config.idcanali.logs.joinleave)
        database.collection(`CollectionTest`).find({id: member.id}).toArray(async function(err, result) {
            if(!result[0]) {
                database.collection(`CollectionTest`).insertOne({id: member.id, roles: member._roles})
                let embed = new Discord.MessageEmbed()
                    .setTitle(`📥Nuovo membro!📥`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
                    .addField(`👁️Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
                    .setThumbnail(member.displayAvatarURL({
                        dynamic: true,
                        format: `png`,
                        size: 512
                    }))
                    .setColor(`GREEN`)
                channel.send({embeds: [embed]})
            }
            if(result[0]) {
                let testo = ``
                await result[0].roles.forEach(role => {
                    testo += `<@&${role}>\n`
                    member.roles.add(role)
                })
                let embed = new Discord.MessageEmbed()
                    .setTitle(`📥Membro Ritornato📥`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤Utente:`, `Nome: **${member.user.username}**, ID: **${member.id}**\n||${member.toString()}||`)
                    .addField(`👁️Account creato il:`, `${moment(member.user.createdAt).format(`ddd DD MMM YYYY`)}`)
                    .addField(`👔Ruoli:`, testo)
                    .setThumbnail(member.displayAvatarURL({
                        dynamic: true,
                        format: `png`,
                        size: 512
                    }))
                    .setColor(`GREEN`)
                channel.send({embeds: [embed]})
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`👋Bentornato in ${member.guild.name}`)
                    .setDescription(`${member.toString()} bentornato👋 in ${member.guild.name}!\n\n👔Hai ricevuto indietro tutti i tuoi ruoli!`)
                    .setColor(`YELLOW`)
                member.send({embeds: [embed2]}).catch(() => {})
            }
        })
    }
}