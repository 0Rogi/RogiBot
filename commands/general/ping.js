const ms = require(`ms`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `ping`,
    description: `Mostra alcune informazioni sul bot`,
    data: {
        name: `ping`,
        description: `Comando per vedere informazioni sul bot`,
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {
        if (!interaction.guild) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`❌ NON IN DM ❌`)
                .setDescription(`So che è un comando molto stupido... ma non puoi eseguirlo in dm, così ha scelto **Rogi** :)\n\n*Entra nel server e poi potrai eseguirlo*`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }
        interaction.deferReply().then(() => {
            let embed = new Discord.MessageEmbed()
                .setTitle(`🟢 BOT ONLINE 🟢`)
                .addField(`⌚ Uptime`, ms(client.uptime, { long: true }), true)
                .addField(`🐢 Ping`, `**${client.ws.ping}**ms`, true)
                .addField(`💾 Ram Usata`, `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}**MB`, true)
                .setColor(`YELLOW`)
                .setThumbnail(client.user.displayAvatarURL())
            interaction.editReply({ embeds: [embed] })
        })
    }
}