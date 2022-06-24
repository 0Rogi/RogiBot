const moment = require(`moment`)
const fs = require(`fs`)
const config = require(`${process.cwd()}/JSON/config.json`)
const fetchAllMessages = require(`${process.cwd()}/functions/moderation/fetchmessages.js`)

module.exports = {
    name: `tclose`,
    data: {
        name: `tclose`,
        description: `Chiude un ticket`,
    },
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(() => {
            database.collection(`Tickets`).find({ channel: interaction.channel.id }).toArray(function (err, result) {
                if (!result[0]) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setColor(`RED`)
                        .setDescription(`*Questo canale non è un ticket*`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (result[0]) {
                    if (result[0].closing == true) {
                        interaction.editReply({ content: `<a:error:966371274853089280> Questo ticket è già in chiusura` })
                        return
                    }
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Ticket in chiusura`)
                        .setDescription(`Questo ticket si chiuderà in \`20 secondi\``)
                        .setColor(`RED`)
                    let button = new Discord.MessageButton()
                        .setLabel(`Annulla`)
                        .setCustomId(`TicketNoClose`)
                        .setStyle(`DANGER`)
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    interaction.editReply({ embeds: [embed], components: [row] }).then(msg => {
                        setTimeout(() => {
                            if (msg.embeds[0]?.title == `Chiusura Annullata`) return
                            let embed = new Discord.MessageEmbed()
                                .setTitle(`Ticket in chiusura`)
                                .setDescription(`Questo ticket si chiuderà in \`10 secondi\``)
                                .setColor(`RED`)
                            msg.edit({ embeds: [embed] }).then(() => {
                                setTimeout(() => {
                                    database.collection(`Tickets`).find({ channel: interaction.channel.id }).toArray(function (err, result) {
                                        if (!result[0]) return
                                        if (result[0]) {
                                            if (result[0].closing == true) {
                                                database.collection(`Tickets`).find({ channel: interaction.channel.id }).toArray(async function (err, result) {
                                                    if (!result[0]) return
                                                    if (result[0]) {

                                                        let embedlog = new Discord.MessageEmbed()
                                                            .setTitle(`✉️ Ticket Chiuso ✉️`)
                                                            .setColor(`RED`)
                                                            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                                                            .addField(`👑 Owner:`, `Nome: ${interaction.guild.members.cache.find(x => x.id == result[0].id) ? interaction.guild.members.cache.find(x => x.id == result[0].id).user.username : result[0].username}, ID: ${interaction.guild.members.cache.find(x => x.id == result[0].id) ? interaction.guild.members.cache.find(x => x.id == result[0].id).id : result[0].id}`)
                                                            .addField(`👤 Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                                                            .addField(`📘 Categoria:`, result[0].category, true)
                                                            .addField(`\u200b`, `\u200b`, true)
                                                            .addField(`📖 Sottocategoria:`, result[0].subcategory, true)

                                                        fetchAllMessages(interaction.channel.id).then(async messages => {
                                                            let transcript = ``
                                                            await messages.forEach(msg => {
                                                                message = `@${msg.author.username} - ${moment(msg.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)}:\n`
                                                                if (msg.content) message += `${msg.content}`
                                                                if (msg.embeds[0] && !msg.content) message += `Embed: ${msg.embeds[0].title}`
                                                                transcript += message + `\n\n`
                                                            })
                                                            fs.writeFile(`transcript.txt`, transcript, function (err) {
                                                                client.channels.cache.get(config.idcanali.logs.ticket).send({ embeds: [embedlog], files: [`${process.cwd()}/transcript.txt`] })
                                                                database.collection(`Tickets`).deleteOne({ channel: interaction.channel.id }).then(() => {
                                                                    interaction.channel.delete().catch(() => { })
                                                                })
                                                            })
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }, 1000 * 10)
                            })
                        }, 1000 * 10)
                    })
                    database.collection(`Tickets`).updateOne({ channel: interaction.channel.id }, { $set: { closing: true } })
                }
            })
        })
    }
}