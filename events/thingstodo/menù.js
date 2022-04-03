const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if(!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return
        if(interaction.customId == `Thingstodo`) {
            if(interaction.values[0] == `Todo` || interaction.values[1] == `Todo`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`WHITE`)
                    .addField(`Stato:`, `🔲Da fare...`)
                    .addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
                await interaction.update({embeds: [embed]})
                if(interaction.message.pinned) interaction.message.unpin()
                let embedlogs = new Discord.MessageEmbed()
                    .setTitle(`📋Things To Do📋`)
                    .setDescription(`[Message link](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.message.id})`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨Moderatore:`, `Nome: ${interaction.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                    .addField(`🖊️Stato Modificato in:`, `🔲Da fare...`)
                    .setColor(`GREEN`)
                    .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
                client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
            }
            if(interaction.values[0] == `Completed` || interaction.values[1] == `Completed`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`GREEN`)
                    .addField(`Stato:`, `🟩Completato`)
                    .addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
                    await interaction.update({embeds: [embed]})
                if(interaction.message.pinned) interaction.message.unpin()
                let embedlogs = new Discord.MessageEmbed()
                    .setTitle(`📋Things To Do📋`)
                    .setDescription(`[Message link](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.message.id})`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨Moderatore:`, `Nome: ${interaction.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                    .addField(`🖊️Stato Modificato in:`, `🟩Completato`)
                    .setColor(`GREEN`)
                    .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
                client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
            }
            if(interaction.values[0] == `Important` || interaction.values[1] == `Important`) {
                let embed = new Discord.MessageEmbed()
                    .setColor(`RED`)
                    .addField(`Stato:`, `🟥Importante`)
                    .addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
                interaction.update({embeds: [embed]}).then(async () => {
                    if(!interaction.message.pinned) {                         
                        await interaction.message.pin()
                        interaction.channel.bulkDelete(1)
                    }
                })
                let embedlogs = new Discord.MessageEmbed()
                    .setTitle(`📋Things To Do📋`)
                    .setDescription(`[Message link](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.message.id})`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨Moderatore:`, `Nome: ${interaction.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                    .addField(`🖊️Stato Modificato in:`, `🟥Importante`)
                    .setColor(`GREEN`)
                    .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
                client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
            }
            if(interaction.values[0] == `Delete` || interaction.values[1] == `Delete`) {
                let message = interaction.message
                message.delete()
                let embedlogs = new Discord.MessageEmbed()
                    .setTitle(`📋Things To Do📋`)
                    .addField(`⏰Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨Moderatore:`, `Nome: ${interaction.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                    .addField(`🖊️Stato Modificato in:`, `❌Things To Do Eliminato`)
                    .addField(`💬Contenuto:`, interaction.message.embeds[0].fields[1].value.toString())
                    .setColor(`GREEN`)
                    .setThumbnail(interaction.member.displayAvatarURL({dynamic: true}))
                client.channels.cache.get(config.idcanali.logs.other).send({embeds: [embedlogs]})
            }
        }
    }
}