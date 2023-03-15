const config = require(`${process.cwd()}/JSON/config.json`);
const items = require(`../../JSON/items.json`);
const translate = require(`translate-google`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isSelectMenu() && interaction.customId.startsWith(`Shop`)) {
            if (!interaction.customId.includes(interaction.user.id)) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo menù`, ephemeral: true });

            let category = interaction.values[0]

            switch (category) {
                case `food`: {
                    category = items.food;
                } break;
                case `games`: {
                    category = items.games;
                } break;
                case `house`: {
                    category = items.house;
                } break;
                case `others`: {
                    category = items.others;
                } break;
                case `technology`: {
                    category = items.technology;
                } break;
            }

            let itemsText = ``;

            await category.forEach(async e => {
                itemsText += `${e.emoji} ${e.object.charAt(0).toUpperCase() + e.object.slice(1)}\nPrezzo: \`${e.buyprice}\`\nPrezzo di Vendita: \`${e.sellprice}\`\n`;
            });

            setTimeout(() => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${interaction.values[0].charAt(0).toUpperCase() + interaction.values[0].slice(1)}`)
                    .setDescription(itemsText)
                    .setColor(`YELLOW`);
                interaction.update({ embeds: [embed] });
            }, 1500);

        }
    }
}