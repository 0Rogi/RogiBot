const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.guild != config.idServer.idServer) return;

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.customId.startsWith(`serverinfoplus`)) {

            let id = interaction.customId.split(`,`)[1];
            if (interaction.member.id != id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            let server = interaction.guild;

            let emojis = ``;
            server.emojis.cache.forEach(e => {
                emojis += `<:${e.name}:${e.id}> `;
            })
            if (emojis == ``) emojis = `_Nessuna Emoji_`;

            let embed = new Discord.MessageEmbed()
                .setTitle(server.name.toString())
                .setThumbnail(server.iconURL({ dynamic: true }))
                .setColor(`YELLOW`)
                .setDescription(server.description?.toString() || `_Nessuna Descrizione_`)
                .addField(`👑 Owner:`, client.users.cache.get(server.ownerId).toString(), true)
                .addField(`🟢 Utenti:`, `<:online:1086951506021986345>**${server.members.cache.filter(member => member.presence?.status == `online`).size}**\n<:idle:1086952329825243187>**${server.members.cache.filter(member => member.presence?.status == `idle`).size}**\n<:dnd:1086952965811732551>**${server.members.cache.filter(member => member.presence?.status == `dnd`).size}**\n<:offline:1086951239197143091>**${server.members.cache.filter(member => !member.presence?.status).size}**`, true)
                .addField(`🚨 Server ID:`, server.id.toString(), true)
                .addField(`🧾 Canali:`, `Testuali: **${server.channels.cache.filter(c => c.type == `GUILD_TEXT`).size}**\nVocali: **${server.channels.cache.filter(c => c.type == `GUILD_VOICE`).size}**\nCategorie: **${server.channels.cache.filter(c => c.type == `GUILD_CATEGORY`).size}**\nNews: **${server.channels.cache.filter(c => c.type == `GUILD_NEWS`).size}**`, true)
                .addField(`🧑🏻‍🦱 Membri:`, `Totali: **${server.memberCount}**\nUtenti: **${server.memberCount - server.members.cache.filter(member => member.user.bot).size}**\nBot: **${server.members.cache.filter(member => member.user.bot).size}**`, true)
                .addField(`📆 Creazione del server:`, `${moment(server.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)}`, true)
                .addField(`😀 Emojis:`, emojis);
            let button1 = new Discord.MessageButton()
                .setLabel(`Meno Informazioni`)
                .setStyle(`PRIMARY`)
                .setEmoji(`⬆️`)
                .setCustomId(`serverinfoless,${interaction.member.id}`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1);
            interaction.update({ embeds: [embed], components: [row] });

        }
        if (interaction.customId.startsWith(`serverinfoless`)) {

            let id = interaction.customId.split(`,`)[1];
            if (interaction.member.id != id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            let server = interaction.guild;

            let embed = new Discord.MessageEmbed()
                .setTitle(server.name.toString())
                .setThumbnail(server.iconURL({ dynamic: true }))
                .setColor(`YELLOW`)
                .setDescription(server.description?.toString() || `_Nessuna Descrizione_`)
                .addField(`👑 Owner:`, client.users.cache.get(server.ownerId).toString(), true)
                .addField(`\u200b`, `\u200b`, true)
                .addField(`🚨 Server ID:`, server.id.toString(), true);
            let button1 = new Discord.MessageButton()
                .setLabel(`Più Informazioni`)
                .setStyle(`PRIMARY`)
                .setEmoji(`⬇️`)
                .setCustomId(`serverinfoplus,${interaction.member.id}`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1);
            interaction.update({ embeds: [embed], components: [row] });
        }
    }
}