const config = require(`${process.cwd()}/JSON/config.json`);
const createTranscript = require(`${process.cwd()}/functions/transcripts/createtranscript.js`)
const ms = require(`ms`);
const fs = require(`fs`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return;

        //? Check if maintenance is enabled
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.customId == `pnsfw`) {
            //? Check if the user is the channel owner
            let owner = false;
            await serverstats.privaterooms.forEach(room => {
                if (interaction.channel.id == room.text) {
                    if (interaction.user.id == room.user) {
                        owner = true
                    }
                }
            })

            //? If the user is the owner or an admin
            if (owner || interaction.member.roles.cache.has(config.rolesid.admin)) {
                //? Check if the user is at least level 30
                if (!interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`❌ ERRORE ❌`)
                        .setDescription(`Hai bisogno almeno del livello 30 per rendere la tua chat NSFW :disappointed:`)
                        .setColor(`RED`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                    return;
                }
                //? Check if the channel is NSFW or not
                if (interaction.channel.nsfw) {
                    //? Unset the channel as NSFW
                    interaction.channel.setNSFW(false);

                    //? Reply to the interaction
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Chat NSFW`)
                        .setDescription(`La chat ora non è più **NSFW** 🔞`)
                        .setColor(`YELLOW`)
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } else if (!interaction.channel.nsfw) {
                    //? Set the channel as NSFW
                    interaction.channel.setNSFW(true);

                    //? Reply to the interaction
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Chat NSFW`)
                        .setDescription(`La chat ora è **NSFW** 🔞`)
                        .setColor(`YELLOW`)
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            //? Deny the user isn't the owner
            if (!owner && !interaction.member.roles.cache.has(config.rolesid.admin)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                    .setDescription(`<a:error:966371274853089280> Non sei l'owner di questo canale privato`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            }

        } else if (interaction.customId == `pslowmode`) {
            //? Check if the user is the channel owner
            let owner = false;
            await serverstats.privaterooms.forEach(room => {
                if (interaction.channel.id == room.text) {
                    if (interaction.user.id == room.user) {
                        owner = true
                    }
                }
            })

            //? If the user is the owner or an admin
            if (owner || interaction.member.roles.cache.has(config.rolesid.admin)) {
                //? Send a menu to choose the the slomode time
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🐌 SLOWMODE`)
                    .setDescription(`Scegli la **slowmode** da impostare al canale`)
                    .setColor(`YELLOW`);
                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`pslowmodemenu`)
                    .setPlaceholder('⏰ 5 minuti')
                    .addOptions([
                        {
                            label: '1 secondo',
                            emoji: '🚀',
                            value: '1s',
                        },
                        {
                            label: '5 secondi',
                            emoji: '🚗',
                            value: '5s',
                        },
                        {
                            label: '30 secondi',
                            emoji: '⏲',
                            value: '30s',
                        },
                        {
                            label: '1 minuto',
                            emoji: '🙄',
                            value: '1m',
                        },
                        {
                            label: '2 minuti',
                            emoji: '⌚',
                            value: '2m',
                        },
                        {
                            label: '5 minuti',
                            emoji: '⏰',
                            value: '5m',
                        },
                        {
                            label: '30 minuti',
                            emoji: '🐌',
                            value: '30m',
                        },
                        {
                            label: '1 ora',
                            emoji: '🐢',
                            value: '1h',
                        },
                        {
                            label: '3 ore',
                            emoji: '🚿',
                            value: '3h',
                        },
                        {
                            label: '6 ore',
                            emoji: '☕',
                            value: '6h',
                        },
                    ]);
                let row = new Discord.MessageActionRow()
                    .addComponents(menu);
                interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
            }

            //? Deny the user isn't the owner or an admin
            if (!owner && !interaction.member.roles.cache.has(config.rolesid.admin)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                    .setDescription(`<a:error:966371274853089280> Non sei l'owner di questo canale privato`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (interaction.customId == `plimit`) {
            //? Check if the user is the channel owner
            let owner = false;
            await serverstats.privaterooms.forEach(room => {
                if (interaction.channel.id == room.text) {
                    if (interaction.user.id == room.user) {
                        owner = true
                    }
                }
            })

            //? If the user is the owner or an admin
            if (owner || interaction.member.roles.cache.has(config.rolesid.admin)) {
                //? Send a menu to choose the limit
                let embed = new Discord.MessageEmbed()
                    .setTitle(`👥 LIMITE DI UTENTI`)
                    .setDescription(`Scegli il **limite d'utenti** da impostare al canale vocale`)
                    .setColor(`YELLOW`)
                let menu = new Discord.MessageSelectMenu()
                    .setCustomId(`plimitmenu`)
                    .setPlaceholder(`🚗 5 utenti`)
                    .addOptions([
                        {
                            label: '2 utenti',
                            emoji: '🎨',
                            value: '2',
                        },
                        {
                            label: '5 utenti',
                            emoji: '🚗',
                            value: '5',
                        },
                        {
                            label: '30 utenti',
                            emoji: '🚌',
                            value: '30',
                        },
                        {
                            label: '40 utenti',
                            emoji: '🥵',
                            value: '40',
                        },
                        {
                            label: '50 utenti',
                            emoji: '🚑',
                            value: '50',
                        },
                        {
                            label: '60 utenti',
                            emoji: '👮',
                            value: '60',
                        },
                        {
                            label: '99 utenti',
                            emoji: '🎅',
                            value: '99',
                        },
                        {
                            label: 'Nessun Limite',
                            emoji: '❌',
                            value: '0',
                        }
                    ])
                let row = new Discord.MessageActionRow()
                    .addComponents(menu);
                interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
            }

            //? Deny the user isn't the owner or an admin
            if (!owner && !interaction.member.roles.cache.has(config.rolesid.admin)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                    .setDescription(`<a:error:966371274853089280> Non sei l'owner di questo canale privato`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (interaction.customId == `ptranscript`) {
            //? Check if the user is the channel owner
            let owner = false;
            await serverstats.privaterooms.forEach(room => {
                if (interaction.channel.id == room.text) {
                    if (interaction.user.id == room.user) {
                        owner = true
                    }
                }
            })

            //? If the user is the owner or an admin
            if (owner || interaction.member.roles.cache.has(config.rolesid.admin)) {
                //? Reply to interaction
                let embed = new Discord.MessageEmbed()
                    .setTitle(`📃 CREAZIONE TRANSCRIPT`)
                    .setDescription(`<a:loading:998616752781008986> **Creazione** del **transcript** in corso <a:loading:998616752781008986>`)
                    .setColor(`YELLOW`);
                await interaction.reply({ embeds: [embed] });
                //? Create and send the transcript
                let transcript = await createTranscript(interaction.channel.id);
                fs.writeFile(`transcript${interaction.user.id}.txt`, transcript, async function (err) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`📃 Transcript Canale`)
                        .setDescription(`Ecco il **transcript** di questo **canale privato**`)
                        .setColor(`YELLOW`);
                    await interaction.editReply({ embeds: [embed], files: [`${process.cwd()}/transcript${interaction.user.id}.txt`] });
                })
            }

            //? Deny the user isn't the owner or an admin
            if (!owner && !interaction.member.roles.cache.has(config.rolesid.admin)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                    .setDescription(`<a:error:966371274853089280> Non sei l'owner di questo canale privato`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }

        //? Slowmode menù
        if (interaction.customId == `pslowmodemenu`) {
            //? Get the choosen time
            let time = interaction.values[0];
            interaction.reply({ content: `<a:checkmark:1083310732285853766> Slowmode cambiata in **${time}**`, ephemeral: true });

            //? Edit the slowmode
            time = ms(time) / 1000;
            interaction.channel.setRateLimitPerUser(time);
        }

        //? User limit menù
        if (interaction.customId == `plimitmenu`) {
            //? Get the user limit
            let limit = interaction.values[0];
            interaction.reply({ content: `<a:checkmark:1083310732285853766> Limite di utenti cambiato in **${limit}**`, ephemeral: true });

            //? Edit the user limit
            serverstats.privaterooms.forEach(room => {
                if (room.text == interaction.channel.id) {
                    client.channels.cache.get(room.vc).setUserLimit(limit);
                }
            })
        }
    }
}