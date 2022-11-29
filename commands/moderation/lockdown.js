const moment = require(`moment`);
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `lockdown`,
    description: `Attiva/Disattiva il sistema di lockdown del server`,
    data: {
        name: `lockdown`,
        description: `Attiva il sistema di lockdown del server`
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        if (serverstats.lockdown == false) {
            //? Enable Lockdown
            let everyone = interaction.guild.roles.cache.find(r => r.name === `@everyone`);
            everyone.setPermissions([`SEND_MESSAGES`, `EMBED_LINKS`, `READ_MESSAGE_HISTORY`, `CONNECT`, `USE_VAD`]);

            let fan = interaction.guild.roles.cache.find(r => r.id === config.idruoli.fan);
            let lockdownchannel = client.channels.cache.get(config.idcanali.lockdown)
            lockdownchannel.permissionOverwrites.edit(fan, {
                VIEW_CHANNEL: true,
            });

            let rogisfriends = interaction.guild.roles.cache.find(r => r.id == config.idruoli.friend);
            let rogisfriendschannel = client.channels.cache.get(config.idcanali.testualeyt);
            rogisfriendschannel.permissionOverwrites.edit(rogisfriends, {
                VIEW_CHANNEL: false,
            });

            let serverbooster = interaction.guild.roles.cache.find(r => r.id == config.idruoli.serverbooster);
            let serverboosterchannel = client.channels.cache.get(config.idcanali.serverbooster);
            serverboosterchannel.permissionOverwrites.edit(serverbooster, {
                VIEW_CHANNEL: false,
            });

            let nsfw = client.channels.cache.get(config.idcanali.nsfw);
            let level80 = interaction.guild.roles.cache.find(r => r.id == config.idruoli.level80);
            let level90 = interaction.guild.roles.cache.find(r => r.id == config.idruoli.level90);
            let level100 = interaction.guild.roles.cache.find(r => r.id == config.idruoli.level100);
            nsfw.permissionOverwrites.edit(level80, {
                VIEW_CHANNEL: false,
            });
            nsfw.permissionOverwrites.edit(level90, {
                VIEW_CHANNEL: false,
            });
            nsfw.permissionOverwrites.edit(level100, {
                VIEW_CHANNEL: false,
            });

            let unverified = interaction.guild.roles.cache.find(r => r.id == config.idruoli.unverified);
            let verifychannel = client.channels.cache.get(config.idcanali.verify);
            verifychannel.permissionOverwrites.edit(unverified, {
                VIEW_CHANNEL: false,
            });

            let embed = new Discord.MessageEmbed()
                .setTitle(`💀 LOCKDOW 💀`)
                .setDescription(`È appena stato **attivato** il sistema di lockdown!\n**NESSUN UTENTE**, eccetto lo staff, avrà accesso ai canali`)
                .setColor(`RED`)
                .setThumbnail(config.images.rogilockdownon);
            interaction.editReply({ embeds: [embed] });

            database.collection(`ServerStats`).updateOne({}, { $set: { lockdown: true } });
        } else if (serverstats.lockdown == true) {
            //? Disable Lockdown
            let everyone = interaction.guild.roles.cache.find(r => r.name === `@everyone`);
            everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`, `STREAM`, `USE_EXTERNAL_EMOJIS`]);

            let fan = interaction.guild.roles.cache.find(r => r.id === config.idruoli.fan);
            let lockdownchannel = client.channels.cache.get(config.idcanali.lockdown)
            lockdownchannel.permissionOverwrites.edit(fan, {
                VIEW_CHANNEL: false,
            });

            let rogisfriends = interaction.guild.roles.cache.find(r => r.id == config.idruoli.friend);
            let rogisfriendschannel = client.channels.cache.get(config.idcanali.testualeyt);
            rogisfriendschannel.permissionOverwrites.edit(rogisfriends, {
                VIEW_CHANNEL: true,
            });

            let serverbooster = interaction.guild.roles.cache.find(r => r.id == config.idruoli.serverbooster);
            let serverboosterchannel = client.channels.cache.get(config.idcanali.serverbooster);
            serverboosterchannel.permissionOverwrites.edit(serverbooster, {
                VIEW_CHANNEL: true,
            });

            let nsfw = client.channels.cache.get(config.idcanali.nsfw);
            let level80 = interaction.guild.roles.cache.find(r => r.id == config.idruoli.level80);
            let level90 = interaction.guild.roles.cache.find(r => r.id == config.idruoli.level90);
            let level100 = interaction.guild.roles.cache.find(r => r.id == config.idruoli.level100);
            nsfw.permissionOverwrites.edit(level80, {
                VIEW_CHANNEL: true,
            });
            nsfw.permissionOverwrites.edit(level90, {
                VIEW_CHANNEL: true,
            });
            nsfw.permissionOverwrites.edit(level100, {
                VIEW_CHANNEL: true,
            });

            let unverified = interaction.guild.roles.cache.find(r => r.id == config.idruoli.unverified);
            let verifychannel = client.channels.cache.get(config.idcanali.verify);
            verifychannel.permissionOverwrites.edit(unverified, {
                VIEW_CHANNEL: true,
            });

            let embed = new Discord.MessageEmbed()
                .setTitle(`💀 LOCKDOWN 💀`)
                .setDescription(`È appena stato **disattivato** il sistema di lockdown!\n**TUTTI GLI UTENTI**, avranno di nuovo accesso ai canali`)
                .setColor(`GREEN`)
                .setThumbnail(config.images.rogilockdownoff);
            interaction.editReply({ embeds: [embed] });
            database.collection(`ServerStats`).updateOne({}, { $set: { lockdown: false } });
        }
    }
}