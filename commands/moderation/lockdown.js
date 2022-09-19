const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `lockdown`,
    data: {
        name: `lockdown`,
        description: `Attiva il sistema di lockdown del server`
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    execute(interaction) {
        interaction.deferReply().then(() => {
            if (serverstats.lockdown == false) {
                let everyone = interaction.guild.roles.cache.find(r => r.name === `@everyone`);
                let fan = interaction.guild.roles.cache.find(r => r.id === config.idruoli.fan);
                everyone.setPermissions([`SEND_MESSAGES`, `EMBED_LINKS`, `READ_MESSAGE_HISTORY`, `CONNECT`, `USE_VAD`]);
                let lockdown = client.channels.cache.get(config.idcanali.lockdown)
                lockdown.permissionOverwrites.edit(fan, {
                    VIEW_CHANNEL: true,
                })
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Lockdown`)
                    .setDescription(`È appena stato attivato il sistema di lockdown!\n**NESSUN UTENTE** tranne gli staffer potranno vedere i canali`)
                    .setColor(`GREEN`)
                    .setThumbnail(config.images.rogilockdownon)
                interaction.editReply({ embeds: [embed] })
                database.collection(`ServerStats`).updateOne({}, { $set: { lockdown: true } })
            } else if (serverstats.lockdown == true) {
                let everyone = interaction.guild.roles.cache.find(r => r.name === `@everyone`);
                let fan = interaction.guild.roles.cache.find(r => r.id === config.idruoli.fan);
                everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`, `STREAM`, `USE_EXTERNAL_EMOJIS`]);
                let lockdown = client.channels.cache.get(config.idcanali.lockdown)
                lockdown.permissionOverwrites.edit(fan, {
                    VIEW_CHANNEL: false,
                })
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Lockdown`)
                    .setDescription(`È appena stato disattivato il sistema di lockdown!\n**TUTTI GLI UTENTI** potranno rivedere i canali`)
                    .setColor(`GREEN`)
                    .setThumbnail(config.images.rogilockdownoff)
                interaction.editReply({ embeds: [embed] })
                database.collection(`ServerStats`).updateOne({}, { $set: { lockdown: false } })
            }
        })
    }
}