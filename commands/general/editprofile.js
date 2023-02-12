const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `editprofile`,
    description: `Imposta le proprie informazioni sul proprio profilo visibili nella seconda pagina di /userinfo`,
    data: {
        name: `editprofile`,
        description: `Imposta le informazioni sul tuo profilo`,
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {
        await interaction.deferReply();

        let embed = new Discord.MessageEmbed()
            .setTitle(`CUSTOMIZZAZIONE DEL PROFILO`)
            .setDescription(`Utilizza i pulsanti qui sotto per customizzare il tuo profilo`)
            .setColor(`YELLOW`);
        let row1 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Nome`)
                    .setStyle(`PRIMARY`)
                    .setCustomId(`ProfileName,${interaction.user.id}`)
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Genere`)
                    .setStyle(`PRIMARY`)
                    .setCustomId(`ProfileGender,${interaction.user.id}`)
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Compleanno`)
                    .setStyle(`PRIMARY`)
                    .setCustomId(`ProfileBirthday,${interaction.user.id}`)
            );
        let row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Bio`)
                    .setStyle(`PRIMARY`)
                    .setCustomId(`ProfileBio,${interaction.user.id}`)
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Colore Preferito`)
                    .setStyle(`PRIMARY`)
                    .setCustomId(`ProfileColor,${interaction.user.id}`)
            )
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Social Media`)
                    .setStyle(`PRIMARY`)
                    .setCustomId(`ProfileSocial,${interaction.user.id}`)
            );
        interaction.editReply({ embeds: [embed], components: [row1, row2] });
    }
}