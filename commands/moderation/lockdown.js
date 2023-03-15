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

        database.collection(`Staff`).find({ id: interaction.user.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`Staff`).insertOne({ username: interaction.user.username, id: interaction.user.id, rank: ``, messages: 0, vctime: 0, actions: 1 });
            } else if (result[0]) {
                database.collection(`Staff`).updateOne({ id: interaction.user.id }, {
                    $inc: {
                        actions: 1,
                    }
                })
            }
        })

        if (serverstats.lockdown == false) {
            //? Enable Lockdown
            let everyone = interaction.guild.roles.cache.find(r => r.name === `@everyone`);
            everyone.setPermissions([`SEND_MESSAGES`, `EMBED_LINKS`, `READ_MESSAGE_HISTORY`, `CONNECT`, `USE_VAD`]);

            let fan = interaction.guild.roles.cache.find(r => r.id === config.rolesid.fan);
            let lockdownchannel = client.channels.cache.get(config.channelsid.lockdown)
            lockdownchannel.permissionOverwrites.edit(fan, {
                VIEW_CHANNEL: true,
            });

            let rogisfriends = interaction.guild.roles.cache.find(r => r.id == config.rolesid.friend);
            let rogisfriendschannel = client.channels.cache.get(config.channelsid.rogisfriends);
            rogisfriendschannel.permissionOverwrites.edit(rogisfriends, {
                VIEW_CHANNEL: false,
            });

            let serverbooster = interaction.guild.roles.cache.find(r => r.id == config.rolesid.serverbooster);
            let serverboosterchannel = client.channels.cache.get(config.channelsid.serverbooster);
            serverboosterchannel.permissionOverwrites.edit(serverbooster, {
                VIEW_CHANNEL: false,
            });

            let nsfw = client.channels.cache.get(config.channelsid.nsfw);
            let level80 = interaction.guild.roles.cache.find(r => r.id == config.rolesid.level80);
            let level90 = interaction.guild.roles.cache.find(r => r.id == config.rolesid.level90);
            let level100 = interaction.guild.roles.cache.find(r => r.id == config.rolesid.level100);
            nsfw.permissionOverwrites.edit(level80, {
                VIEW_CHANNEL: false,
            });
            nsfw.permissionOverwrites.edit(level90, {
                VIEW_CHANNEL: false,
            });
            nsfw.permissionOverwrites.edit(level100, {
                VIEW_CHANNEL: false,
            });

            let unverified = interaction.guild.roles.cache.find(r => r.id == config.rolesid.unverified);
            let verifychannel = client.channels.cache.get(config.channelsid.verify);
            verifychannel.permissionOverwrites.edit(unverified, {
                VIEW_CHANNEL: false,
            });

            let embed = new Discord.MessageEmbed()
                .setTitle(`💀 LOCKDOW 💀`)
                .setDescription(`È appena stato **attivato** il sistema di lockdown!\n**NESSUN UTENTE**, eccetto lo staff, avrà accesso ai canali`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });

            database.collection(`ServerStats`).updateOne({}, { $set: { lockdown: true } });
        } else if (serverstats.lockdown == true) {
            //? Disable Lockdown
            let everyone = interaction.guild.roles.cache.find(r => r.name === `@everyone`);
            everyone.setPermissions([`SEND_MESSAGES`, `VIEW_CHANNEL`, `READ_MESSAGE_HISTORY`, `CONNECT`, `SPEAK`, `USE_VAD`, `STREAM`, `USE_EXTERNAL_EMOJIS`]);

            let fan = interaction.guild.roles.cache.find(r => r.id === config.rolesid.fan);
            let lockdownchannel = client.channels.cache.get(config.channelsid.lockdown)
            lockdownchannel.permissionOverwrites.edit(fan, {
                VIEW_CHANNEL: false,
            });

            let rogisfriends = interaction.guild.roles.cache.find(r => r.id == config.rolesid.friend);
            let rogisfriendschannel = client.channels.cache.get(config.channelsid.rogisfriends);
            rogisfriendschannel.permissionOverwrites.edit(rogisfriends, {
                VIEW_CHANNEL: true,
            });

            let serverbooster = interaction.guild.roles.cache.find(r => r.id == config.rolesid.serverbooster);
            let serverboosterchannel = client.channels.cache.get(config.channelsid.serverbooster);
            serverboosterchannel.permissionOverwrites.edit(serverbooster, {
                VIEW_CHANNEL: true,
            });

            let nsfw = client.channels.cache.get(config.channelsid.nsfw);
            let level80 = interaction.guild.roles.cache.find(r => r.id == config.rolesid.level80);
            let level90 = interaction.guild.roles.cache.find(r => r.id == config.rolesid.level90);
            let level100 = interaction.guild.roles.cache.find(r => r.id == config.rolesid.level100);
            nsfw.permissionOverwrites.edit(level80, {
                VIEW_CHANNEL: true,
            });
            nsfw.permissionOverwrites.edit(level90, {
                VIEW_CHANNEL: true,
            });
            nsfw.permissionOverwrites.edit(level100, {
                VIEW_CHANNEL: true,
            });

            let unverified = interaction.guild.roles.cache.find(r => r.id == config.rolesid.unverified);
            let verifychannel = client.channels.cache.get(config.channelsid.verify);
            verifychannel.permissionOverwrites.edit(unverified, {
                VIEW_CHANNEL: true,
            });

            let embed = new Discord.MessageEmbed()
                .setTitle(`💀 LOCKDOWN 💀`)
                .setDescription(`È appena stato **disattivato** il sistema di lockdown!\n**TUTTI GLI UTENTI**, avranno di nuovo accesso ai canali`)
                .setColor(`GREEN`);
            interaction.editReply({ embeds: [embed] });
            database.collection(`ServerStats`).updateOne({}, { $set: { lockdown: false } });
        }
    }
}