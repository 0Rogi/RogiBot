const moment = require(`moment`);
const config = require(`../../../JSON/config.json`);
const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `warn`,
    description: `Avvisa un utente`,
    data: {
        name: `warn`,
        description: `Avvisa un utente`,
        options: [
            {
                name: `add`,
                description: `Avverti un utente`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente da avvertire`,
                        type: `USER`,
                        required: true
                    },
                    {
                        name: `motivo`,
                        description: `Motivo dell'avvertimento`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
            {
                name: `edit`,
                description: `Modifica un avvertimento ad un utente`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui modificare l'avvertimento`,
                        type: `USER`,
                        required: true
                    },
                    {
                        name: `codice`,
                        description: `Codice dell'avvertimento da modificare`,
                        type: `NUMBER`,
                        required: true
                    },
                    {
                        name: `motivo`,
                        description: `Nuovo motivo dell'avvertimento`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
            {
                name: `remove`,
                description: `Rimuovi un avvertimento ad un utente`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente a cui rimuovere l'avvertimento`,
                        type: `USER`,
                        required: true
                    },
                    {
                        name: `codice`,
                        description: `Codice dell'avvertimento da rimuovere`,
                        type: `NUMBER`,
                        required: false
                    }
                ]
            }
        ]
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    async execute(interaction) {

        const command = interaction.options.getSubcommand();

        await interaction.deferReply();

        switch (command) {
            case `add`: {
                let user = interaction.options.getUser(`utente`);
                user = interaction.guild.members.cache.find(x => x.id == user.id);

                if (!user) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                        .setDescription(`*Non riesco a trovare quest'utente.\nInserisci un utente valido*`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                const userpermission = await getUserPermissionLevel(user);
                const staffpermission = await getUserPermissionLevel(interaction.member);

                if (userpermission >= staffpermission) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                        .setDescription(`*Non hai il permesso per avvisare quest'utente*`)
                        .setColor(`RED`);
                    interaction.editReply({ embeds: [embed] });
                    return;
                }

                const reason = interaction.options.getString(`motivo`);

                database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {
                    if (err || !result) {
                        database.collection(`UserStats`).insertOne({
                            username: user.username, id: user.id, moderation: {}, leavedAt: 0
                        });
                    }

                    let warnid = result[0]?.warns?.length + 1 || 1;
                    database.collection(`UserStats`).updateOne({ id: user.id }, {
                        $push: {
                            "warns": {
                                id: warnid,
                                moderator: `${interaction.user.id}`,
                                time: new Date().getTime(),
                                warn: reason,
                            }
                        }
                    });

                });

                let dm = true;

                let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: `[WARN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`⚠️ **HO AVVISATO** QUEST'UTENTE IN DM ⚠️`)
                    .setColor(`PURPLE`)
                    .addField(`👤 Utente:`, `Nome: ${user.user.username} - ID: ${user.id}\n||${user.toString()}||`)
                    .addField(`📖 Motivo:`, reason, true);

                let embedLogs = new Discord.MessageEmbed()
                    .setTitle(`🔪 WARN 🔪`)
                    .setColor(`RED`)
                    .setDescription(`⚠️ L'utente **è stato** avvisato nei dm ⚠️`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${user.user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
                    .addField(`📖 Motivo:`, reason);

                let embeddm = new Discord.MessageEmbed()
                    .setTitle(`⚠️ SEI STATO AVVERTITO ⚠️`)
                    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                    .setColor(`RED`)
                    .addField(`🔨 Avvertito da:`, interaction.member.toString(), true)
                    .addField(`🏠 Avvertito in:`, interaction.guild.name, true)
                    .addField(`📖 Per il motivo:`, reason.toString(), true);

                await user.send({ embeds: [embeddm] }).catch(() => { dm = false });

                if (!dm) embed.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`);
                if (!dm) embedLogs.setDescription(`⚠️ **NON POSSO AVVISARE** QUESTO UTENTE IN DM ⚠️`);

                interaction.editReply({ embeds: [embed] });
                client.channels.cache.get(config.channelsid.logs.moderation.warn).send({ embeds: [embedLogs] });
            } break;

            case `edit`: {

                const user = interaction.options.getUser(`utente`);
                const code = interaction.options.getNumber(`codice`);
                const newReason = interaction.options.getString(`motivo`);

                database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {
                    if (err || !result[0]) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                            .setDescription(`_Quest'utente non è nel database, quindi non ha mai ricevuto avvertimenti..._`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    let found = false;
                    let oldReason;
                    result[0]?.warns?.forEach(e => {
                        if (e.id == code) {
                            found = true;
                            oldReason = e.warn;
                        };
                    });

                    if (found) {

                        database.collection(`UserStats`).updateOne({ id: user.id, 'warns.id': code }, {
                            $set: {
                                'warns.$.warn': newReason,
                            }
                        });

                        const embed = new Discord.MessageEmbed()
                            .setAuthor({ name: `[EDITWARN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                            .setColor(`PURPLE`)
                            .addField(`👤 Utente:`, `Nome: ${user.username} - ID: ${user.id}\n||${user.toString()}||`)
                            .addField(`📕 Vecchio Motivo:`, oldReason, true)
                            .addField(`📖 Nuovo Motivo:`, newReason, true);
                        interaction.editReply({ embeds: [embed] });

                        let embedLogs = new Discord.MessageEmbed()
                            .setTitle(`🔪 EDIT WARN 🔪`)
                            .setColor(`YELLOW`)
                            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                            .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                            .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
                            .addField(`📕 Vecchio Motivo:`, oldReason, true)
                            .addField(`📖 Nuovo Motivo:`, newReason, true);
                        client.channels.cache.get(config.channelsid.logs.moderation.warn).send({ embeds: [embedLogs] });
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                            .setDescription(`_Non ho trovato l'avvertimento con il codice \`${code}\` fra gli avvertimenti di ${user.toString()}!_\n_Inserisci un codice di un avvertimento valido!_`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }
                });
            } break;

            case `remove`: {
                const user = interaction.options.getUser(`utente`);
                const code = interaction.options.getNumber(`codice`) || -1;

                database.collection(`UserStats`).find({ id: user.id }).toArray(function (err, result) {
                    if (err || !result[0]) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                            .setDescription(`_Quest'utente non è nel database, quindi non ha mai ricevuto avvertimenti..._`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    if (code == -1) {
                        database.collection(`UserStats`).updateOne({ id: user.id }, {
                            $set: {
                                'warns': []
                            }
                        });

                        const embed = new Discord.MessageEmbed()
                            .setAuthor({ name: `[CLEARWARNS] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                            .setColor(`PURPLE`)
                            .setDescription(`Tutti gli avvertimenti di ${user.toString()} sono **stati cancellati**!`)
                        interaction.editReply({ embeds: [embed] });

                        let embedLogs = new Discord.MessageEmbed()
                            .setTitle(`🔪 CLEAR WARNS 🔪`)
                            .setColor(`GREEN`)
                            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                            .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                            .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
                        client.channels.cache.get(config.channelsid.logs.moderation.warn).send({ embeds: [embedLogs] });
                        return;
                    }

                    let found = false;
                    let reason;
                    result[0]?.warns?.forEach(e => {
                        if (e.id == code) {
                            found = true;
                            reason = e.warn;
                        };
                    });

                    if (found) {
                        database.collection(`UserStats`).updateOne({ id: user.id }, {
                            $pull: {
                                'warns': {
                                    id: code
                                },
                            }
                        });

                        const embed = new Discord.MessageEmbed()
                            .setAuthor({ name: `[REMOVEWARN] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                            .setColor(`PURPLE`)
                            .addField(`👤 Utente:`, `Nome: ${user.username} - ID: ${user.id}\n||${user.toString()}||`)
                            .addField(`📕 Warn:`, reason, true);
                        interaction.editReply({ embeds: [embed] });
                        let embedLogs = new Discord.MessageEmbed()
                            .setTitle(`🔪 REMOVE WARN 🔪`)
                            .setColor(`GREEN`)
                            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                            .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                            .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
                            .addField(`📖 Motivo:`, reason, true);
                        client.channels.cache.get(config.channelsid.logs.moderation.warn).send({ embeds: [embedLogs] });
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                            .setDescription(`_Non ho trovato l'avvertimento con il codice \`${code}\`!_\n_Inserisci un codice di un avvertimento valido!_`)
                            .setColor(`RED`);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }
                });
            } break;
        }
    }
}