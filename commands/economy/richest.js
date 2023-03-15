const config = require(`../../JSON/config.json`);

module.exports = {
    name: `richest`,
    description: `Mostra la top 10 degli utenti più ricchi`,
    data: {
        name: `richest`,
        description: `Mostra la top 10 degli utenti più ricchi`,
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        database.collection(`UserStats`).find().sort({ 'economy.money': -1 }).toArray(function (err, result) {
            if (err || !result[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🤑 Classifica dei RogiBucks 🤑`)
                    .setDescription(`_La Classifica è Vuota_`)
                    .setColor(`YELLOW`);
                interaction.editReply({ embeds: [embed] });
            } else {
                let text = ``;
                for (let i = 0; i <= 10; i++) {
                    if (!result[i].economy?.money) continue;

                    if (i == 0) {
                        text += `🥇 ${result[i].username} **${result[i].economy?.money} RogiBucks**\n`;
                        continue;
                    }
                    if (i == 1) {
                        text += `🥈 ${result[i].username} **${result[i].economy?.money} RogiBucks**\n`;
                        continue;
                    }
                    if (i == 2) {
                        text += `🥉 ${result[i].username} **${result[i].economy?.money} RogiBucks**\n`;
                        continue;
                    }

                    text += `**#${i + 1}** ${result[i].username} **${result[i].economy?.money} RogiBucks**\n`;
                }

                if (text == ``) text = `_La classifica è Vuota_`;

                const embed = new Discord.MessageEmbed()
                    .setTitle(`🤑 Classifica dei RogiBucks 🤑`)
                    .setDescription(text)
                    .setColor(`YELLOW`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
                interaction.editReply({ embeds: [embed] });
            }
        })
    }
}