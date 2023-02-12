const translate = require(`translate-google`);
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `translate`,
    description: `Traduce un testo in italiano, da una qualsiasi lingua`,
    data: {
        name: `translate`,
        description: `Traduce un qualunque testo, in italiano - Disponibile dal livello 10`,
        options: [
            {
                name: `testo`,
                description: `Il testo da tradurre`,
                type: `STRING`,
                required: true
            }
        ],
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `Level 10`,
    execute(interaction) {
        if (!interaction.member.roles.cache.has(config.rolesid.level10) && !interaction.member.roles.cache.has(config.rolesid.level15) && !interaction.member.roles.cache.has(config.rolesid.level20) && !interaction.member.roles.cache.has(config.rolesid.level25) && !interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setDescription(`*Devi avere almeno il livello 10 per usare questo comando!*`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        interaction.deferReply().then(() => {
            let text = interaction.options.getString(`testo`);

            if (text.length > 1024) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                    .setDescription(`*Testo troppo lungo!\npuoi usare massimo 1024 caratteri!*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            translate(text, { to: `it` }).then(response => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Traduzione in italiano`)
                    .setDescription(response.toString())
                    .setColor(`YELLOW`)
                    .setThumbnail(`https://i.imgur.com/Zl3EQQv.png`);
                interaction.editReply({ embeds: [embed] });
            })

        })
    }
}