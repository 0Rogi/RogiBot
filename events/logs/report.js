const config = require(`../../JSON/config.json`);
const moment = require(`moment`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (!interaction.isMessageContextMenu()) return;

        await interaction.deferReply({ ephemeral: true });

        const message = interaction.targetMessage;

        const embed = new Discord.MessageEmbed()
            .setTitle(`📢 Nuova Segnalazione 📢`)
            .addField(`👤 Utente: `, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n||${interaction.user.toString()}||`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`\u200b`, `\u200b`, true)
            .addField(`💬 Messaggio:`, message.content ? message.content.slice(0, 1024) : `_Nessun Contenuto_`, true)
            .addField(`⏰ Messaggio mandato il:`, `${moment(message.createdTimestamp).format(`DD/MM/YYYY - hh:mm A`)}`, true)
            .addField(`🖊️ Autore del Messaggio:`, `Nome: **${message.author.username}**, ID: **${message.author.id}**\n||${message.author.toString()}||`, true)
            .setColor(`RED`);

        if (message.attachments.size > 0) {

            let attachment;
            let i = 0;
            message.attachments.forEach(e => {
                if (i > 0) return;

                if (!e.contentType.includes(`image`)) return;
                attachment = e.url;

                i++;
            });


            if (attachment) {
                embed.setImage(attachment);
            }
        }

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setStyle(`LINK`)
                    .setLabel(`Vai al Messaggio`)
                    .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
            );

        const embed2 = new Discord.MessageEmbed()
            .setTitle(`<a:checkmark:1083310732285853766> Messaggio Segnalato <a:checkmark:1083310732285853766>`)
            .setDescription(`Il messaggio **è stato segnalato** allo staff`)
            .setColor(`GREEN`);
        interaction.editReply({ embeds: [embed2] });

        client.channels.cache.get(config.channelsid.logs.messagereport).send({ embeds: [embed], components: [row] });
    }
}