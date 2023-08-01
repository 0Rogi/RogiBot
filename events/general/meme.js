const https = require(`https`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId.split(`,`)[0] == `NextMeme`) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416>Questo non è un tuo pulsante!`, ephemeral: true })
            let url = 'https://www.reddit.com/r/memesITA/hot/.json?limit=100';
            const res = await fetch(url);
            const data = await res.json();

            let index = data.data.children[Math.floor(Math.random() * 99) + 1].data;

            let embed = new Discord.MessageEmbed()
                .setTitle(index.title)
                .setImage(index.url_overridden_by_dest)
                .setFooter({ text: `👍🏻 ${index.ups} | 💭 ${index.num_comments}` })
                .setColor(`YELLOW`);
            let button = new Discord.MessageButton()
                .setEmoji(`➡️`)
                .setCustomId(`NextMeme,${interaction.user.id}`)
                .setStyle(`PRIMARY`);
            let row = new Discord.MessageActionRow().addComponents(button);
            interaction.update({ embeds: [embed], components: [row] });
        }
    }
}