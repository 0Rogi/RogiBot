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
        if (!interaction.member.roles.cache.has(config.idruoli.level10) && !interaction.member.roles.cache.has(config.idruoli.level15) && !interaction.member.roles.cache.has(config.idruoli.level20) && !interaction.member.roles.cache.has(config.idruoli.level25) && !interaction.member.roles.cache.has(config.idruoli.level30) && !interaction.member.roles.cache.has(config.idruoli.level40) && !interaction.member.roles.cache.has(config.idruoli.level50) && !interaction.member.roles.cache.has(config.idruoli.level60) && !interaction.member.roles.cache.has(config.idruoli.level70) && !interaction.member.roles.cache.has(config.idruoli.level80) && !interaction.member.roles.cache.has(config.idruoli.level90) && !interaction.member.roles.cache.has(config.idruoli.level100) && !interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.idruoli.allrewards)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Devi avere almeno il livello 10 per usare questo comando!*`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogierror);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        interaction.deferReply().then(() => {
            let text = interaction.options.getString(`testo`);

            if (text.length > 1024) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setDescription(`*Testo troppo lungo!\npuoi usare massimo 1024 caratteri!*`)
                    .setColor(`RED`)
                    .setThumbnail(config.images.rogierror);
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