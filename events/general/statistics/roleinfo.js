const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.guild != config.idServer.idServer) return;

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.customId.startsWith(`roleinfoplus`)) {

            let id = interaction.customId.split(`,`)[1];
            if (interaction.member.id != id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true });

            let role = interaction.guild.roles.cache.find(c => c.id == interaction.message.embeds[0].fields[2].value);

            let i = 0;
            await interaction.guild.members.cache.forEach(m => {
                if (m.roles.cache.has(role.id)) i++;
            });

            let embed = new Discord.MessageEmbed()
                .setTitle(role.name)
                .setColor(role.hexColor ? role.hexColor : `YELLOW`)
                .addField(`📛 Nome:`, role.name, true)
                .addField(`\u200b`, `\u200b`, true)
                .addField(`🚨 ID:`, role.id.toString(), true)
                .addField(`🖲️ Menzionabile?`, role.mentionable ? `Sì` : `No`, true)
                .addField(`🧬 Colore:`, role.hexColor, true)
                .addField(`👥 Utenti:`, i.toString(), true)
                .addField(`🗓️ Date Creazione:`, `${moment(role.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(role.createdAt).fromNow()})`);
            let button1 = new Discord.MessageButton()
                .setLabel(`Meno Informazioni`)
                .setStyle(`PRIMARY`)
                .setEmoji(`⬆️`)
                .setCustomId(`roleinfoless,${interaction.member.id}`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1);
            interaction.update({ embeds: [embed], components: [row] });
        }
        if (interaction.customId.startsWith(`roleinfoless`)) {

            let id = interaction.customId.split(`,`)[1];
            if (interaction.member.id != id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true });

            let role = interaction.guild.roles.cache.find(c => c.id == interaction.message.embeds[0].fields[2].value);

            let embed = new Discord.MessageEmbed()
                .setTitle(role.name)
                .setColor(role.hexColor ? role.hexColor : `YELLOW`)
                .addField(`📛 Nome:`, role.name, true)
                .addField(`\u200b`, `\u200b`, true)
                .addField(`🚨 ID:`, role.id.toString(), true);
            let button1 = new Discord.MessageButton()
                .setLabel(`Più Informazioni`)
                .setStyle(`PRIMARY`)
                .setEmoji(`⬇️`)
                .setCustomId(`roleinfoplus,${interaction.member.id}`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1);
            interaction.update({ embeds: [embed], components: [row] });
        }
    }
}