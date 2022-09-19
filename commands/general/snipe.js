const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `snipe`,
    data: {
        name: `snipe`,
        description: `Mostra l'ultimo messaggio eliminato nel servere - Disponibile dal livello 30`,
    },
    permissionlevel: 0,
    allowedchannels: [config.idcanali.commands],
    requirement: `Level 30`,
    execute(interaction) {
        if (!interaction.member.roles.cache.has(config.idruoli.level30) && !interaction.member.roles.cache.has(config.idruoli.level40) && !interaction.member.roles.cache.has(config.idruoli.level50) && !interaction.member.roles.cache.has(config.idruoli.level60) && !interaction.member.roles.cache.has(config.idruoli.level70) && !interaction.member.roles.cache.has(config.idruoli.level80) && !interaction.member.roles.cache.has(config.idruoli.level90) && !interaction.member.roles.cache.has(config.idruoli.level100) && !interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Devi avere almeno il livello 30 per usare questo comando!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror)
            interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }
        interaction.deferReply().then(() => {
            if (serverstats.snipe.cleared) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Snipe`)
                    .setDescription(`<a:error:966371274853089280>L'ultimo messaggio eliminato, è stato **nascosto da un moderatore**!\n**Non è possibile vederlo**.`)
                    .setColor(`YELLOW`)
                interaction.editReply({ embeds: [embed] })
                return
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Snipe`)
                .setDescription(`Ecco l'**ultimo messaggio eliminato** nel server`)
                .addField(`Utente:`, ` <@${serverstats.snipe.author}>`, true)
                .addField(`Contenuto:`, `${serverstats.snipe.message}`, true)
                .addField(`Canale:`, `<#${serverstats.snipe.channel}>`, true)
                .setColor(`YELLOW`)
            interaction.editReply({ embeds: [embed] })
        })
    }
}