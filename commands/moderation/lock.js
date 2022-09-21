module.exports = {
    name: `lock`,
    data: {
        name: `lock`,
        description: `Blocca un canale per non far scrivere nessuno`,
        options: [
            {
                name: `lock`,
                description: `Blocca o sblocca il canale`,
                type: `BOOLEAN`,
                required: true
            },
            {
                name: `channel`,
                description: `Canale da bloccare`,
                type: `CHANNEL`,
                channelTypes: [`GUILD_TEXT`],
                required: false
            }
        ]
    },
    permissionlevel: 3,
    allowedchannels: [`ALL`],
    async execute(interaction) {

        await interaction.deferReply();

        let channel = interaction.options.getChannel(`channel`);
        if (!channel) channel = interaction.channel;

        let state = interaction.options.getBoolean(`lock`);

        if (state) {
            channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });

            let embed = new Discord.MessageEmbed()
                .setTitle(`🔒 CANALE BLOCCATO 🔒`)
                .setDescription(`Il canale ${channel.toString()} è stato **bloccato**, nessuno potrà ora scriverci`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });

            if (channel != interaction.channel) {
                channel.send(`${interaction.user.toString()} ha bloccato questo canale, attendete che venga sbloccato prima di poterci scrivere di nuovo`).then(msg => {
                    msg.react(`😢`);
                })
            }

        } else if (!state) {
            channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true });

            let embed = new Discord.MessageEmbed()
                .setTitle(`🔓 CANALE SBLOCCATO 🔓`)
                .setDescription(`Il canale ${channel.toString()} è stato **sbloccato**, ora tutti potranno scriverci`)
                .setColor(`GREEN`);
            interaction.editReply({ embeds: [embed] });

            if (channel != interaction.channel) {
                channel.send(`${interaction.user.toString()} ha sbloccato questo canale, ora potete di nuovo scrivere qui!`).then(msg => {
                    msg.react(`🥳`);
                })
            }

        }
    }
}