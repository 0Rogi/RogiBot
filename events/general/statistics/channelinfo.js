const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)
const ms = require(`ms`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.guild != config.idServer.idServer) return;

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.customId.startsWith(`channelinfoplus`)) {

            let id = interaction.customId.split(`,`)[1];
            if (interaction.member.id != id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            let channel = interaction.guild.channels.cache.find(c => c.id == interaction.message.embeds[0].fields[2].value);

            let embed = new Discord.MessageEmbed()
                .setTitle(channel.name)
                .setColor(`YELLOW`);

            switch (channel.type) {
                case `GUILD_TEXT`: {
                    let m;
                    if (channel.lastMessageId) {
                        m = await client.channels.cache.get(channel.id).messages.fetch(channel.lastMessageId);
                    } else {
                        m = `_Nessun Messaggio_`;
                    }
                    embed
                        .setDescription(channel.topic ? channel.topic : ``)
                        .addField(`📡 Tipo:`, `Testuale`, true)
                        .addField(`🐌 Slowmode:`, ms(channel.rateLimitPerUser * 1000), true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Categoria:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).name, true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`)
                        .addField(`💬 Ultimo Messaggio:`, `${m == `_Nessun Messaggio_` ? m : m.content ? m.content.slice(0, 1024) : `_Nessun Contenuto_`}`);
                } break;
                case `GUILD_VOICE`: {
                    embed
                        .addField(`📡 Tipo:`, `Vocale`, true)
                        .addField(`⛓️ Limite di utenti:`, channel.userLimit == `0` ? `_Nessun Limite_` : channel.userLimit.toString(), true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Categoria:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).name, true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`);
                } break;
                case `GUILD_CATEGORY`: {
                    embed
                        .addField(`📡 Tipo:`, `Categoria`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`);
                } break;
                case `GUILD_NEWS`: {
                    let m;
                    if (channel.lastMessageId) {
                        m = await client.channels.cache.get(channel.id).messages.fetch(channel.lastMessageId);
                    } else {
                        m = `_Nessun Messaggio_`;
                    }
                    embed
                        .setDescription(channel.topic ? channel.topic : ``)
                        .addField(`📡 Tipo:`, `News`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Categoria:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).name, true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`)
                        .addField(`💬 Ultimo Messaggio:`, `${m == `_Nessun Messaggio_` ? m : m.content ? m.content.slice(0, 1024) : `_Nessun Contenuto_`}`);
                } break;
                case `GUILD_NEWS_THREAD`: {
                    let m;
                    if (channel.lastMessageId) {
                        m = await client.channels.cache.get(channel.id).messages.fetch(channel.lastMessageId);
                    } else {
                        m = `_Nessun Messaggio_`;
                    }
                    embed
                        .setDescription(channel.topic ? channel.topic : ``)
                        .addField(`📡 Tipo:`, `Thread in un canale notizie`, true)
                        .addField(`👤 Utenti nel Thread:`, channel.memberCount.toString(), true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Canale del Thread:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).toString(), true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`)
                        .addField(`💬 Ultimo Messaggio:`, `${m == `_Nessun Messaggio_` ? m : m.content ? m.content.slice(0, 1024) : `_Nessun Contenuto_`}`);
                } break;
                case `GUILD_PUBLIC_THREAD`: {
                    let m;
                    if (channel.lastMessageId) {
                        m = await client.channels.cache.get(channel.id).messages.fetch(channel.lastMessageId);
                    } else {
                        m = `_Nessun Messaggio_`;
                    }
                    embed
                        .setDescription(channel.topic ? channel.topic : ``)
                        .addField(`📡 Tipo:`, `Thread Pubblico`, true)
                        .addField(`👤 Utenti nel Thread:`, channel.memberCount.toString(), true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Canale del Thread:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).toString(), true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`)
                        .addField(`💬 Ultimo Messaggio:`, `${m == `_Nessun Messaggio_` ? m : m.content ? m.content.slice(0, 1024) : `_Nessun Contenuto_`}`);
                } break;
                case `GUILD_PRIVATE_THREAD`: {
                    let m;
                    if (channel.lastMessageId) {
                        m = await client.channels.cache.get(channel.id).messages.fetch(channel.lastMessageId);
                    } else {
                        m = `_Nessun Messaggio_`;
                    }
                    embed
                        .setDescription(channel.topic ? channel.topic : ``)
                        .addField(`📡 Tipo:`, `Thread Privato`, true)
                        .addField(`👤 Utenti nel Thread:`, channel.memberCount.toString(), true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Canale del Thread:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).toString(), true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`)
                        .addField(`💬 Ultimo Messaggio:`, `${m == `_Nessun Messaggio_` ? m : m.content ? m.content.slice(0, 1024) : `_Nessun Contenuto_`}`);
                } break;
                case `GUILD_STAGE_VOICE`: {
                    embed
                        .setDescription(channel.topic ? channel.topic : ``)
                        .addField(`📡Tipo:`, `Stage`, true)
                        .addField(`⛓️ Limite di utenti:`, channel.userLimit.toString(), true)
                        .addField(`🚨 ID:`, channel.id.toString(), true)
                        .addField(`📁 Categoria:`, interaction.guild.channels.cache.find(c => c.id == channel.parentId).name, true)
                        .addField(`🗓️ Date Creazione:`, `${moment(channel.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(channel.createdAt).fromNow()})`);
                } break;
            }
            let button1 = new Discord.MessageButton()
                .setLabel(`Meno Informazioni`)
                .setStyle(`PRIMARY`)
                .setEmoji(`⬆️`)
                .setCustomId(`channelinfoless,${interaction.member.id}`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1);
            interaction.update({ embeds: [embed], components: [row] });
        }
        if (interaction.customId.startsWith(`channelinfoless`)) {

            let id = interaction.customId.split(`,`)[1];
            if (interaction.member.id != id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            let channel = interaction.guild.channels.cache.find(c => c.id == interaction.message.embeds[0].fields[2].value)

            let embed = new Discord.MessageEmbed()
                .setTitle(channel.name)
                .setColor(`YELLOW`)
                .setDescription(channel.topic ? channel.topic : ``);

            switch (channel.type) {
                case `GUILD_TEXT`: {
                    embed.addField(`📡Tipo:`, `Testuale`, true);
                } break;
                case `GUILD_VOICE`: {
                    embed.addField(`📡Tipo:`, `Vocale`, true);
                } break;
                case `GUILD_CATEGORY`: {
                    embed.addField(`📡Tipo:`, `Categoria`, true);
                } break;
                case `GUILD_NEWS`: {
                    embed.addField(`📡Tipo:`, `Notizie`, true);
                } break;
                case `GUILD_NEWS_THREAD`: {
                    embed.addField(`📡Tipo:`, `Thread in un canale notizie`, true);
                } break;
                case `GUILD_PUBLIC_THREAD`: {
                    embed.addField(`📡Tipo:`, `Thread Pubblico`, true);
                } break;
                case `GUILD_PRIVATE_THREAD`: {
                    embed.addField(`📡Tipo:`, `Thread Privato`, true);
                } break;
                case `GUILD_STAGE_VOICE`: {
                    embed.addField(`📡Tipo:`, `Stage`, true);
                } break;
            }

            embed
                .addField(`\u200b`, `\u200b`, true)
                .addField(`ID:`, channel.id.toString(), true);
            let button1 = new Discord.MessageButton()
                .setLabel(`Più Informazioni`)
                .setStyle(`PRIMARY`)
                .setEmoji(`⬇️`)
                .setCustomId(`channelinfoplus,${interaction.member.id}`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1);
            interaction.update({ embeds: [embed], components: [row] });
        }
    }
}