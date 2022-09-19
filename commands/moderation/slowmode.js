const ms = require(`ms`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `slowmode`,
    data: {
        name: `slowmode`,
        description: `Imposta la slowmode di un canale`,
        options: [
            {
                name: `tempo`,
                description: `Slowmode da settare`,
                type: `STRING`,
                required: true
            }
        ]
    },
    permissionlevel: 2,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        interaction.deferReply().then(() => {
            let time = interaction.options.getString(`tempo`)
            if (time != `off` && time != 0) {
                time = ms(time)
                if (!time) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Inserisci un tempo valido*`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (time > 21600000) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Puoi impostare un massimo di 6 ore di slowmode*`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
                if (time < 1 * 1000) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Errore`)
                        .setDescription(`*Puoi impostare un minimo di 1 secondo di slowmode*`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.rogierror)
                    interaction.editReply({ embeds: [embed] })
                    return
                }
            }
            if (time == `off` || time == `no` || time == 0)
                time = 0
            interaction.channel.setRateLimitPerUser(parseInt(time) / 1000)
            let timeembed = ms(time, { long: true });
            timeembed = timeembed + ` `
            timeembed = timeembed.replace(`second `, `secondo`)
            timeembed = timeembed.replace(`seconds`, `secondi`)
            timeembed = timeembed.replace(`minute `, `minuto `)
            timeembed = timeembed.replace(`minutes`, `minuti`)
            timeembed = timeembed.replace(`hour `, `ora `)
            timeembed = timeembed.replace(`hours`, `ore`)
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: `[SLOWMODE] ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(config.images.rogislowmode)
                .setColor(`PURPLE`)
                .addField(`Canale:`, `Nome: ${interaction.channel.name}, ID: ${interaction.channel.id}\n||${interaction.channel.toString()}||`)
            if (time == 0) embed.addField(`Nuova Slowmode:`, `_Slowmode disattivata_`)
            else {
                embed.addField(`Nuova Slowmode:`, `${timeembed}`)
            }
            interaction.editReply({ embeds: [embed] })
        })
    }
}