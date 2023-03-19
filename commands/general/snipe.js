const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `snipe`,
    description: `Mostra l'ultimo messaggio eliminato all'interno del server`,
    data: {
        name: `snipe`,
        description: `Mostra l'ultimo messaggio eliminato nel servere - Disponibile dal livello 30`,
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `Level 30`,
    execute(interaction) {
        if (!interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Devi avere almeno il livello 30 per usare questo comando!*`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true })
            return
        }
        interaction.deferReply().then(() => {
            if (serverstats.snipe.cleared) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Snipe`)
                    .setDescription(`<a:error:1086952752892092416>L'ultimo messaggio eliminato, è stato **nascosto da un moderatore**!\n**Non è possibile vederlo**.`)
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