const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `removecooldown`,
    FromHelpers: true,
    execute(message, args) {
        let date = new Date()
        if(date.getMonth() == 3 && date.getDate() >= 14 && date.getDate() <= 18) {
            let id = args[0]
            let server = client.guilds.cache.get(config.idServer.idServer)
            let user = message.mentions.members.first() || server.members.cache.find(x => x.id == id) 
            if(!user) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Non riesco a trovare l'utente\n\`!removecooldown [utente]\`*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.roginotfound)
                message.reply({embeds: [embed]})
                return
            }
            database.collection(`Easter`).find({id: user.id}).toArray(function(err, result) {
                if(!result[0]) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Questo utente non ha un cooldown!*`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.roginotfound)
                    message.reply({embeds: [embed]})
                    return
                }
                if(result[0].cooldown <= 0) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Questo utente non ha un cooldown!*`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.roginotfound)
                    message.reply({embeds: [embed]})
                    return
                }
                database.collection(`Easter`).updateOne({id: user.id}, {$set:{cooldown: 0}}).then(() => {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor({name: `[REMOVECOOLDOWN] ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                        .setThumbnail(config.images.rogitimeout)
                        .setColor(`PURPLE`)
                        .addField(`Utente:`, `Nome: ${user.user.username}, ID: ${user.id}\n||${user.toString()}||`)
                    let embedlog = new Discord.MessageEmbed()
                        .setTitle(`⛔REMOVE COOLDOWN⛔`)
                        .setColor(`RED`)
                        .setDescription(`[Message link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
                        .setThumbnail(user.displayAvatarURL({
                            dynamic: true,
                            format: `png`,
                            size: 512
                        }))
                        .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🔨Moderatore:`, `Nome: **${message.member.user.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`)
                        .addField(`👤Utente:`, `Nome: **${user.user.username}**, ID: **${user.id}**\n||${user.toString()}||`)
                    message.reply({embeds: [embed]})
                    client.channels.cache.get(`960926896651128904`).send({embeds: [embedlog]})
                    client.channels.cache.get(`963473599149269084`).send({embeds: [embedlog]})
                })
            })
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Questo comando è utilizzabile\nsolo durante la settimana di Pasqua!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            message.reply({embeds: [embed]})
            return
        }
    }
}