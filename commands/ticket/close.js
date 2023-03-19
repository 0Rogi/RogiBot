const moment = require(`moment`)
const fs = require(`fs`)
const createTranscript = require(`${process.cwd()}/functions/transcripts/createtranscript.js`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `tclose`,
    description: `Chiude un ticket`,
    data: {
        name: `tclose`,
        description: `Chiude un ticket`,
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `none`,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
            if (!ticket) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setColor(`RED`)
                    .setDescription(`*Questo canale non è un ticket*`);
                interaction.editReply({ embeds: [embed] })
                return
            }
            if (ticket) {
                if (ticket.closing) {
                    interaction.editReply({ content: `<a:error:1086952752892092416> Questo ticket è già in chiusura` })
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
                    database.collection(`ServerStats`).updateOne({ "tickets.channelid": interaction.channel.id.toString() }, {
                        "$set": { "tickets.$.closing": true }
                    })
                    setTimeout(async () => {
                        ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
                        if (!ticket.closing || msg.embeds[0].title != `Ticket in chiusura`) return
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Ticket in chiusura`)
                            .setDescription(`Questo ticket si chiuderà in \`10 secondi\``)
                            .setColor(`RED`)
                        msg.edit({ embeds: [embed] }).then(msg2 => {
                            setTimeout(async () => {
                                ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id)
                                if (!ticket.closing || msg2.embeds[0].title != `Ticket in chiusura`) return
                                if (ticket.closing) {
                                    let user = await client.users.fetch(ticket.userid)
                                    let embedlog = new Discord.MessageEmbed()
                                        .setTitle(`✉️ Ticket Chiuso ✉️`)
                                        .setColor(`RED`)
                                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                                        .addField(`👑 Owner:`, `Nome: ${user.username}, ID: ${user.id}\n||${user.toString()}||`)
                                        .addField(`👤 Utente:`, `Nome: ${interaction.member.user.username}, ID: ${interaction.member.id}\n||${interaction.member.toString()}||`)
                                        .addField(`📘 Categoria:`, ticket.category, true)
                                        .addField(`\u200b`, `\u200b`, true)
                                        .addField(`📖 Sottocategoria:`, ticket.subcategory, true)

                                    let transcript = await createTranscript(interaction.channel.id)
                                    fs.writeFile(`transcript${ticket.userid}.txt`, transcript, async function (err) {
                                        await client.channels.cache.get(config.channelsid.logs.ticket).send({ embeds: [embedlog], files: [`${process.cwd()}/transcript${ticket.userid}.txt`] })
                                        database.collection(`ServerStats`).updateOne({}, { $pull: { "tickets": { channelid: interaction.channel.id.toString() } } })
                                        interaction.channel.delete()
                                    })
                                }
                            }, 1000 * 10)
                        })
                    }, 1000 * 10)
                })
            }
        })
    }
}