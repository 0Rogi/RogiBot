const moment = require(`moment`);
const getUserPermissionLevel = require("../../../functions/helper/getUserPermissionLevel");

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;


        if (interaction.isButton() && interaction.customId.startsWith(`UserInfoOtherPage`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            await interaction.deferUpdate();

            const member = interaction.guild.members.cache.find(x => x.id == interaction.customId.split(`,`)[2]);
            if (!member) return;

            database.collection(`UserStats`).find({ id: interaction.customId.split(`,`)[2] }).toArray(function (err, result) {
                if (err || !result[0]) return;

                if (result[0]) {
                    const customprofile = result[0]?.customprofile;

                    // if (!customprofile) return;

                    let badgetext = ``;

                    if (customprofile?.badges?.includes(`1year`)) badgetext += `<:1YearBadge:1051099615803478106> È nel server da almeno un anno\n`;
                    if (customprofile?.badges?.includes(`5years`)) badgetext += `<:5YearsBadge:1051099613748277269> È nel server da almeno 5 anni\n`;
                    if (customprofile?.badges?.includes(`10years`)) badgetext += `<:10YearsBadge:1051099611764371506> È nel server da almeno 10 anni\n`;
                    if (customprofile?.badges?.includes(`level50`)) badgetext += `<:Level50Badge:1051100240373108796> Ha raggiunto il livello 50\n`;
                    if (customprofile?.badges?.includes(`level100`)) badgetext += `<:Level100Badge:1051100238934442024> Ha raggiunto il livello 100\n`;
                    if (customprofile?.badges?.includes(`counting500`)) badgetext += `<:CountingBadge:1051100554572595301> Ha scritto 500 numeri giusti in counting\n`;
                    if (customprofile?.badges?.includes(`suggests100`)) badgetext += `<:SuggestionsBadge:1051100552823590963> Ha fatto 100 suggerimenti\n`;
                    if (customprofile?.badges?.includes(`staff`)) badgetext += `<:StaffBadge:1051100916155162675> Fa parte dello staff\n`;
                    if (customprofile?.badges?.includes(`friend`)) badgetext += `<:FriendBadge:1051101076562137128> È un amico di Rogi\n`;
                    if (customprofile?.badges?.includes(`booster`)) badgetext += `<:BoostBadge:1051101313754210366> Boosta il server\n`;
                    if (customprofile?.badges?.includes(`earlyrich`)) badgetext += `<:EarlyRichBadge:1087809067927474227> Ha superato i 3000 RogiBucks nella prima settimana dal rilascio\n`;

                    if (badgetext == ``) badgetext = `_Nessun Badge_`;

                    let socialmediatext = ``;
                    if (customprofile?.socialmedia?.youtube) socialmediatext += `<:youtube:1086951837808197672> [Apri Canale](https://youtube.com/channel/${customprofile?.socialmedia?.youtube})\n`;
                    if (customprofile?.socialmedia?.tiktok) socialmediatext += `<:tiktok:1086951699282939964> [Apri Profilo](https://tiktok.com/@${customprofile?.socialmedia?.tiktok})\n`;
                    if (customprofile?.socialmedia?.github) socialmediatext += `<:github:1086952560755212330> [Apri Profilo](https://github.com/${customprofile?.socialmedia?.github})\n`;
                    if (customprofile?.socialmedia?.instagram) socialmediatext += `<:instagram:1086952178234699836> [Apri Profilo](https://instagram.com/${customprofile?.socialmedia?.instagram})\n`;
                    if (customprofile?.socialmedia?.twitch) socialmediatext += `<:twitch:1050834468400812062> [Apri Profilo](https://twitch.tv/${customprofile?.socialmedia?.twitch})\n`;
                    if (customprofile?.socialmedia?.twitter) socialmediatext += `<:x_:1135598841048088656> <:twitter:1087850003185274941> [Apri Profilo](https://twitter.com/${customprofile?.socialmedia?.twitter})\n`;
                    if (customprofile?.socialmedia?.reddit) socialmediatext += `<:reddit:1050834465322192978> [Apri Profilo](https://reddit.com/users/${customprofile?.socialmedia?.reddit})\n`;

                    if (socialmediatext == ``) socialmediatext = `_Nessun Social Media Impostato_`;
                    permissionlevel = getUserPermissionLevel(client.guilds.cache.get(`602019987279839274`).members.cache.find(x => x.id == interaction.customId.split(`,`)[2]));
                    if (!client.guilds.cache.get(`602019987279839274`).members.cache.find(x => x.id == interaction.customId.split(`,`)[2]).roles.cache.has(`853313137737596998`) && !permissionlevel >= 2) socialmediatext = `_Nessun Social Media Impostato_`;

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`@` + member.user.username)
                        .setDescription(customprofile?.bio || `_Nessuna Bio Impostata_`)
                        .addField(`🏷️ Nome:`, customprofile?.name || `_Nessun Nome Impostato_`, true)
                        .addField(`👱 Genere:`, customprofile?.gender || `_Nessun Genere Impostato_`, true)
                        .addField(`🥧 Compleanno:`, customprofile?.birthday || `_Nessun Compleanno Impostato_`, true)
                        .addField(`🌈 Colore Preferito:`, customprofile?.favoritecolor || `_Nessun Colore Preferito Impostato_`, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`❤ Like Al Profilo:`, customprofile?.likes?.toString() || `0`, true)
                        .addField(`🛡 Badges:`, badgetext, true)
                        .addField(`\u200b`, `\u200b`, true)
                        .addField(`📷 Social Media:`, socialmediatext, true)
                        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                        .setColor(member.displayHexColor || `YELLOW`);

                    const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle(`PRIMARY`)
                                .setCustomId(`UserInfoBack,${interaction.user.id},${interaction.customId.split(`,`)[2]}`)
                                .setLabel(`Pagina Precedente`)
                                .setEmoji(`⬅️`)
                        )
                        .addComponents(
                            new Discord.MessageButton()
                                .setStyle(`SUCCESS`)
                                .setCustomId(`UserInfoLike,${interaction.user.id},${interaction.customId.split(`,`)[2]}`)
                                .setEmoji(`❤`)
                                .setLabel(`Like`)
                        )
                    interaction.editReply({ embeds: [embed], components: [row] });
                }
            })

        }

        if (interaction.isButton() && interaction.customId.startsWith(`UserInfoBack`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });
            let user = interaction.guild.members.cache.find(x => x.id == interaction.customId.split(`,`)[2]);

            let embed = new Discord.MessageEmbed()
                .setTitle(user.user.username)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setColor(!user?.displayHexColor || user?.displayHexColor == "#000000" ? "#ffffff" : user?.displayHexColor);

            let status = user.presence?.activities;
            if (status?.[0]) {
                if (status[0]?.emoji?.name && status[0]?.state) {
                    embed.setDescription(`${status[0]?.emoji.id ? `<:${status[0]?.emoji?.name}:${status[0]?.emoji.id}>` : status[0]?.emoji?.name ? status[0]?.emoji?.name : ``} ${status[0]?.state}`);
                } else if (status[0].emoji?.name) {
                    embed.setDescription(`${status[0]?.emoji.id ? `<:${status[0]?.emoji?.name}:${status[0]?.emoji.id}>` : status[0]?.emoji?.name ? status[0]?.emoji?.name : ``}`);
                } else if (status[0]?.state) {
                    embed.setDescription(`${status[0]?.state}`);
                }
            }
            embed.addField(`🧾 ID Utente:`, user.id.toString(), true);
            embed.addField(`\u200b`, `\u200b`, true);
            switch (user.presence?.status) {
                case `online`: {
                    embed.addField(`👌🏻 Stato`, `<:online:1086951506021986345> Online`, true);
                } break;
                case `dnd`: {
                    embed.addField(`👌🏻 Stato`, `<:dnd:1086952965811732551> Non Disturbare`, true);
                } break;
                case `idle`: {
                    embed.addField(`👌🏻 Stato`, `<:idle:1086952329825243187> Inattivo`, true);
                } break;
                case `offline`: {
                    embed.addField(`👌🏻 Stato`, `<:offline:1086951239197143091> Offline`, true);
                } break;
                case undefined: {
                    embed.addField(`👌🏻 Stato`, `<:offline:1086951239197143091> Offline`, true);
                } break;
            }

            embed.addField(`📝 Creazione Account:`, `${moment(user.user.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(user.user.createdAt).fromNow()})`);
            embed.addField(`🚗 Entrato nel server:`, `${moment(user.joinedAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(user.joinedAt).fromNow()})`);

            let roles = ``;
            user._roles.forEach(r => {
                roles += `<@&${r}> - `;
            });

            if (roles != ``) roles = roles.slice(0, -3);

            if (roles == `` || !roles) roles = `_Nessun Ruolo_`;
            embed.addField(`🎯 Ruoli:`, roles);

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setLabel(`Altra Pagina`)
                        .setEmoji(`➡️`)
                        .setStyle(`PRIMARY`)
                        .setCustomId(`UserInfoOtherPage,${interaction.user.id},${user.user.id}`)
                )
            interaction.update({ embeds: [embed], components: [row] });
        }

        if (interaction.isButton() && interaction.customId.startsWith(`UserInfoLike`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            if (interaction.customId.split(`,`)[2] == interaction.member.user.id) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                    .setDescription(`_Non puoi mettere like al tuo stesso profilo_`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }

            database.collection(`UserStats`).find({ id: interaction.member.id }).toArray(function (err, result) {
                if (err || !result[0]) return;
                if (result[0]) {
                    if (result[0].customprofile?.likeduser?.includes(interaction.customId.split(`,`)[2])) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Like Rimosso`)
                            .setDescription(`Hai **rimosso il like** al profilo di <@${interaction.customId.split(`,`)[2]}>`)
                            .setColor(`RED`);
                        interaction.reply({ embeds: [embed], ephemeral: true });

                        database.collection(`UserStats`).updateOne({ id: interaction.customId.split(`,`)[2] }, {
                            $inc: {
                                'customprofile.likes': -1
                            }
                        });

                        let newarray = [];
                        result[0].customprofile?.likeduser?.forEach(user => {
                            if (user == interaction.customId.split(`,`)[2]) return
                            newarray.push(user);
                        })

                        if (!result[0].customprofile?.likeduser) newarray = [interaction.customId.split(`,`)[2]];

                        database.collection(`UserStats`).updateOne({ id: interaction.member.user.id }, {
                            $set: {
                                'customprofile.likeduser': newarray,
                            }
                        });
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Like Aggiunto`)
                            .setDescription(`Hai **aggiunto un like** al profilo di <@${interaction.customId.split(`,`)[2]}>`)
                            .setColor(`GREEN`);
                        interaction.reply({ embeds: [embed], ephemeral: true });

                        database.collection(`UserStats`).updateOne({ id: interaction.customId.split(`,`)[2] }, {
                            $inc: {
                                'customprofile.likes': 1
                            }
                        });

                        let newarray = result[0].likeduser || [];
                        newarray.push(interaction.customId.split(`,`)[2]);

                        database.collection(`UserStats`).updateOne({ id: interaction.member.user.id }, {
                            $set: {
                                'customprofile.likeduser': newarray,
                            }
                        });
                    }
                }
            })
        }

    }
}