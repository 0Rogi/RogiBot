const mcutil = require(`minecraft-server-util`)

module.exports = {
    name: `coppercraft`,
    data: {
        name: `coppercraft`,
        description: `Mostra informazioni sulla coppercraft`,
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        try {
            mcutil.status(`mc.coppercraft.it`, 25572).then(async response => {

                if (response.version == `§4● Offline`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:coppercraft:1118964291824013312> CopperCraft <:coppercraft:1118964291824013312>`)
                        .setDescription(`Il server è attualmente **🔴 OFFLINE**`)
                        .setColor(`RED`)
                        .setThumbnail(`https://i.imgur.com/U4TvwrV.png`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                if (response.version == `§7◌ Loading...` || response.version == `§7◌ Starting...`) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<:coppercraft:1118964291824013312> CopperCraft <:coppercraft:1118964291824013312>`)
                        .setDescription(`Il server è attualmente **in ⚫ APERTURA**`)
                        .setColor(`GRAY`)
                        .setThumbnail(`https://i.imgur.com/U4TvwrV.png`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                let text = `\`\`\`\n`;

                if (response.players.sample) {
                    await response.players.sample.forEach(player => {
                        text += `${player.name}\n`
                    });
                }

                text += `\`\`\``;

                if (!response.players.sample || !text) text = `_Nessun Player Online_`;

                let embed = new Discord.MessageEmbed()
                    .setTitle(`<:coppercraft:1118964291824013312> CopperCraft <:coppercraft:1118964291824013312>`)
                    .addField(`🟢 Player Online: ${response.players.online}/${response.players.max}`, `${text}`)
                    .addField(`🎞️ Server IP:`, response.srvRecord.host)
                    .addField(`⌨️ Versione:`, `1.20.1`)
                    .setColor(`YELLOW`)
                    .setThumbnail(`https://i.imgur.com/U4TvwrV.png`);
                interaction.editReply({ embeds: [embed] });
            });
        } catch (err) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<:coppercraft:1118964291824013312> CopperCraft <:coppercraft:1118964291824013312>`)
                .setDescription(`Il server è attualmente **🔴 OFFLINE**`)
                .setColor(`RED`)
                .setThumbnail(`https://i.imgur.com/U4TvwrV.png`);
            interaction.editReply({ embeds: [embed] });
            return;
        }
    }
}