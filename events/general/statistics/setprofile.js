const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.isButton() && interaction.customId.startsWith(`Profile`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true });

            switch (interaction.customId.split(`,`)[0]) {
                case `ProfileName`: {
                    // Modal con input nome
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileName,${interaction.user.id}`)
                        .setTitle(`Nome`)
                    const name = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileNameInput`)
                        .setLabel(`Inserisci il tuo nome`)
                        .setPlaceholder(`Roberto`)
                        .setStyle(`SHORT`)
                        .setRequired(true)
                        .setMaxLength(1024)
                        .setMinLength(1);
                    const row = new Discord.MessageActionRow()
                        .addComponents(name);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `ProfileGender`: {
                    // Menù (Maschio, Femmina, Altro) + pulsante torna indietro
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`SCEGLI IL TUO GENERE`)
                        .setDescription(`Utilizza il **menù qui sotto** per scegliere il **tuo genere**`)
                        .setColor(`YELLOW`);
                    const row1 = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageSelectMenu()
                                .setCustomId(`MenuProfileGender,${interaction.user.id}`)
                                .setPlaceholder(`Maschio`)
                                .addOptions(
                                    [
                                        {
                                            label: `Maschio`,
                                            value: `male`,
                                        },
                                        {
                                            label: `Femmina`,
                                            value: `Female`
                                        },
                                        {
                                            label: `Altro`,
                                            value: `Other`
                                        }
                                    ]
                                )
                        );
                    const row2 = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId(`ProfileBack,${interaction.user.id}`)
                                .setLabel(`Torna Indietro`)
                                .setStyle(`PRIMARY`)
                        );
                    interaction.update({ embeds: [embed], components: [row1, row2] });
                } break;
                case `ProfileBirthday`: {
                    // Modal con input compleanno(?)
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileBirthDay,${interaction.user.id}`)
                        .setTitle(`Compleanno`)
                    const birthday = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileBirthdayInput`)
                        .setLabel(`Inserisci il tuo compleanno`)
                        .setPlaceholder(`GG/MM`)
                        .setStyle(`SHORT`)
                        .setRequired(true)
                        .setMinLength(5)
                        .setMaxLength(5);
                    const row = new Discord.MessageActionRow()
                        .addComponents(birthday);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `ProfileBio`: {
                    // Modal con input bio
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileBio,${interaction.user.id}`)
                        .setTitle(`Bio`)
                    const bio = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileBioInput`)
                        .setLabel(`Inserisci la tua bio`)
                        .setPlaceholder(`Ciao sono Rogi, faccio video su youtube e mi diverto a programmare!`)
                        .setRequired(true)
                        .setMinLength(1)
                        .setMaxLength(1024)
                        .setStyle(`PARAGRAPH`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(bio);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `ProfileColor`: {
                    // Modal con input colore preferito
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileColor,${interaction.user.id}`)
                        .setTitle(`Colore Preferito`)
                    const bio = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileColorInput`)
                        .setLabel(`Inserisci il tuo colore preferito`)
                        .setPlaceholder(`Giallo`)
                        .setRequired(true)
                        .setMinLength(1)
                        .setMaxLength(1024)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(bio);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `ProfileSocial`: {

                    const permissionlevel = await getUserPermissionLevel(interaction.member);

                    if (!interaction.member.roles.cache.has(config.rolesid.serverbooster) && permissionlevel < 3) {

                        const embed = new Discord.MessageEmbed()
                            .setTitle(`❌ ERRORE ❌`)
                            .setDescription(`_Devi **boostare il server** per impostare i tuoi social nel tuo profilo_`)
                            .setColor(`YELLOW`);
                        interaction.reply({ embeds: [embed], ephemeral: true })
                        return;
                    }

                    // Menù con social da scegliere + pulsante torna indietro
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`SETTA I TUOI SOCIAL`)
                        .setDescription(`Utilizza il **menù qui sotto** per settare i tuoi social`)
                        .setColor(`YELLOW`);
                    const row1 = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageSelectMenu()
                                .setCustomId(`MenuProfileSocial,${interaction.user.id}`)
                                .setPlaceholder(`Youtube`)
                                .addOptions(
                                    [
                                        {
                                            label: `Youtube`,
                                            value: `youtube`,
                                            emoji: `<:youtube:1050834469868806295>`
                                        },
                                        {
                                            label: `TikTok`,
                                            value: `tiktok`,
                                            emoji: `<:tiktok:1050834466811162634>`
                                        },
                                        {
                                            label: `Github`,
                                            value: `github`,
                                            emoji: `<:github:1050834755349921843>`
                                        },
                                        {
                                            label: `Instagram`,
                                            value: `instagram`,
                                            emoji: `<:instagram:1050834472301494403>`
                                        },
                                        {
                                            label: `Twitch`,
                                            value: `twitch`,
                                            emoji: `<:twitch:1050834468400812062>`
                                        },
                                        {
                                            label: `Twitter`,
                                            value: `twitter`,
                                            emoji: `<:twitter:1050834473895346298>`
                                        },
                                        {
                                            label: `Reddit`,
                                            value: `reddit`,
                                            emoji: `<:reddit:1050834465322192978>`
                                        },
                                    ]
                                )
                        );
                    const row2 = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId(`ProfileBack,${interaction.user.id}`)
                                .setLabel(`Torna Indietro`)
                                .setStyle(`PRIMARY`)
                        );
                    interaction.update({ embeds: [embed], components: [row1, row2] });
                } break;
            }
        }

        if (interaction.isModalSubmit() && interaction.customId.startsWith(`ModalProfileName`)) {
            database.collection(`UserStats`).find({ id: interaction.customId.split(`,`)[1] }).toArray(function (err, result) {
                if (err) return console.error(err);
                if (!result) return;
                if (result) {
                    database.collection(`UserStats`).updateOne({ id: interaction.customId.split(`,`)[1] }, {
                        $set: {
                            'customprofile.name': interaction.fields.getTextInputValue(`ModalProfileNameInput`)
                        }
                    });
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Nome Impostato`)
                        .setDescription(`Il nome **${interaction.fields.getTextInputValue(`ModalProfileNameInput`)}** è stato impostato sul tuo profilo!`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            })
        }

        if (interaction.isSelectMenu() && interaction.customId.startsWith(`MenuProfileGender`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo menù!`, ephemeral: true });
            database.collection(`UserStats`).find({ id: interaction.customId.split(`,`)[1] }).toArray(function (err, result) {
                if (err) return console.error(err);
                if (!result) return;
                if (result) {
                    database.collection(`UserStats`).updateOne({ id: interaction.customId.split(`,`)[1] }, {
                        $set: {
                            'customprofile.gender': interaction.values[0]
                        }
                    });
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Genere Impostato`)
                        .setDescription(`Il tuo genere è stato impostato a **${interaction.values[0]}**`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            })
        }

        if (interaction.isModalSubmit() && interaction.customId.startsWith(`ModalProfileBirthDay`)) {
            let birthday = interaction.fields.getTextInputValue(`ModalProfileBirthdayInput`);

            const embederr = new Discord.MessageEmbed()
                .setTitle(`❌ ERRORE ❌`)
                .setDescription(`*Inserisci una data valida!\n\n\`Esempio: 21/02\`*`)
                .setColor(`RED`);

            if (!parseInt(birthday.split(`/`)[0]) || !parseInt(birthday.split(`/`)[1])) {
                interaction.reply({ embeds: [embederr], ephemeral: true });
                return;
            }

            if (parseInt(birthday.split(`/`)[1]) > 12) {
                interaction.reply({ embeds: [embederr], ephemeral: true });
                return;
            }

            let days30 = [11, 4, 6, 9];
            let days31 = [1, 3, 5, 7, 8, 10, 12]

            if (days30.includes(parseInt(birthday.split(`/`)[1])) && parseInt(birthday.split(`/`)[0]) > 30) {
                interaction.reply({ embeds: [embederr], ephemeral: true });
                return;
            }
            if (days31.includes(parseInt(birthday.split(`/`)[1])) && parseInt(birthday.split(`/`)[0]) > 31) {
                interaction.reply({ embeds: [embederr], ephemeral: true });
                return;
            }
            if (parseInt(birthday.split(`/`)[1]) == 2 && parseInt(birthday.split(`/`)[0]) > 29) {
                interaction.reply({ embeds: [embederr], ephemeral: true });
                return;
            }

            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                $set: {
                    'customprofile.birthday': birthday,
                }
            })

            const embed = new Discord.MessageEmbed()
                .setTitle(`Compleanno Impostato`)
                .setDescription(`Il tuo compleanno è stato impostato a **${birthday}**`)
                .setColor(`YELLOW`);
            interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.isModalSubmit() && interaction.customId.startsWith(`ModalProfileBio`)) {

            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                $set: {
                    'customprofile.bio': interaction.fields.getTextInputValue(`ModalProfileBioInput`)
                }
            })

            const embed = new Discord.MessageEmbed()
                .setTitle(`Biografia Impostata`)
                .setDescription(`La tua bio è stata impostata a:\n\n **${interaction.fields.getTextInputValue(`ModalProfileBioInput`)}**`)
                .setColor(`YELLOW`);
            interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.isModalSubmit() && interaction.customId.startsWith(`ModalProfileColor`)) {

            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                $set: {
                    'customprofile.favoritecolor': interaction.fields.getTextInputValue(`ModalProfileColorInput`)
                }
            })

            const embed = new Discord.MessageEmbed()
                .setTitle(`Colore Preferito Impostato`)
                .setDescription(`Il tuo colore preferito è stato impostato a **${interaction.fields.getTextInputValue(`ModalProfileColorInput`)}**`)
                .setColor(`YELLOW`);
            interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.isSelectMenu() && interaction.customId.startsWith(`MenuProfileSocial`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo menù!`, ephemeral: true });

            switch (interaction.values[0]) {
                case `youtube`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileYoutube,${interaction.user.id}`)
                        .setTitle(`Canale Youtube`)
                    const youtube = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileYoutubeInput`)
                        .setLabel(`Inserisci l'id del tuo canale youtube`)
                        .setPlaceholder(`UCw7lKb-XBW4ApE0puSbJLFQ`)
                        .setMinLength(1)
                        .setMaxLength(30)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(youtube);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `tiktok`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileTikTok,${interaction.user.id}`)
                        .setTitle(`Profilo TikTOk`)
                    const tiktok = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileTikTokInput`)
                        .setLabel(`Username del tuo profilo tiktok`)
                        .setPlaceholder(`rogi23yt`)
                        .setMinLength(1)
                        .setMaxLength(24)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(tiktok);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `github`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileGithub,${interaction.user.id}`)
                        .setTitle(`Profilo Github`)
                    const github = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileGithubInput`)
                        .setLabel(`Username del tuo profilo github`)
                        .setPlaceholder(`0Rogi`)
                        .setMinLength(1)
                        .setMaxLength(39)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(github);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `instagram`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileInstagram,${interaction.user.id}`)
                        .setTitle(`Profilo Instagram`)
                    const instagram = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileInstagramInput`)
                        .setLabel(`Username del tuo profilo instagram`)
                        .setPlaceholder(`rogi23yt`)
                        .setMinLength(1)
                        .setMaxLength(30)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(instagram);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `twitch`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileTwitch,${interaction.user.id}`)
                        .setTitle(`Profilo Twitch`)
                    const twitch = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileTwitchInput`)
                        .setLabel(`Username del tuo profilo twitch`)
                        .setPlaceholder(`0rogii`)
                        .setMinLength(1)
                        .setMaxLength(25)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(twitch);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `twitter`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileTwitter,${interaction.user.id}`)
                        .setTitle(`Profilo Twitter`)
                    const twitter = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileTwitterInput`)
                        .setLabel(`Username del tuo profilo twitter`)
                        .setPlaceholder(`rogi23yt`)
                        .setMinLength(1)
                        .setMaxLength(15)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(twitter);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
                case `reddit`: {
                    const modal = new Discord.Modal()
                        .setCustomId(`ModalProfileReddit,${interaction.user.id}`)
                        .setTitle(`Profilo Reddit`)
                    const reddit = new Discord.TextInputComponent()
                        .setCustomId(`ModalProfileRedditInput`)
                        .setLabel(`Username del tuo profilo reddit`)
                        .setPlaceholder(`0Rogi`)
                        .setMinLength(1)
                        .setMaxLength(30)
                        .setRequired(true)
                        .setStyle(`SHORT`);
                    const row = new Discord.MessageActionRow()
                        .addComponents(reddit);
                    modal.addComponents(row);
                    await interaction.showModal(modal);
                } break;
            }
        }

        if (interaction.isModalSubmit() && interaction.customId.startsWith(`ModalProfile`)) {
            switch (interaction.customId.split(`,`)[0]) {
                case `ModalProfileYoutube`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.youtube': interaction.fields.getTextInputValue(`ModalProfileYoutubeInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Canale Youtube Impostato`)
                        .setDescription(`Il tuo canale youtube è stato impostato a:\n\nhttps://youtube.com/channel/${interaction.fields.getTextInputValue(`ModalProfileYoutubeInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
                case `ModalProfileTikTok`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.tiktok': interaction.fields.getTextInputValue(`ModalProfileTikTokInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Profilo TikTok Impostato`)
                        .setDescription(`Il tuo profilo tiktok è stato impostato a:\n\nhttps://tiktok.com/@${interaction.fields.getTextInputValue(`ModalProfileTikTokInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
                case `ModalProfileGithub`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.github': interaction.fields.getTextInputValue(`ModalProfileGithubInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Profilo Github Impostato`)
                        .setDescription(`Il tuo profilo github è stato impostato a:\n\nhttps://github.com/${interaction.fields.getTextInputValue(`ModalProfileGithubInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
                case `ModalProfileInstagram`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.instagram': interaction.fields.getTextInputValue(`ModalProfileInstagramInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Profilo Instagra Impostato`)
                        .setDescription(`Il tuo profilo instagram è stato impostato a:\n\nhttps://instagram.com/${interaction.fields.getTextInputValue(`ModalProfileInstagramInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
                case `ModalProfileTwitch`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.twitch': interaction.fields.getTextInputValue(`ModalProfileTwitchInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Profilo Twitch Impostato`)
                        .setDescription(`Il tuo profilo twitch è stato impostato a:\n\nhttps://instagram.com/${interaction.fields.getTextInputValue(`ModalProfileTwitchInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
                case `ModalProfileTwitter`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.twitter': interaction.fields.getTextInputValue(`ModalProfileTwitterInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Profilo Twitter Impostato`)
                        .setDescription(`Il tuo profilo twitter è stato impostato a:\n\nhttps://twitter.tv/${interaction.fields.getTextInputValue(`ModalProfileTwitterInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
                case `ModalProfileReddit`: {
                    database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                        $set: {
                            'customprofile.socialmedia.reddit': interaction.fields.getTextInputValue(`ModalProfileRedditInput`)
                        }
                    })

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Profilo Reddit Impostato`)
                        .setDescription(`Il tuo profilo reddit è stato impostato a:\n\nhttps://reddit.com/users/${interaction.fields.getTextInputValue(`ModalProfileRedditInput`)}`)
                        .setColor(`YELLOW`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } break;
            }
        }

        if (interaction.isButton() && interaction.customId.startsWith(`ProfileBack`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true });

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
            interaction.update({ embeds: [embed], components: [row1, row2] });
        }
    }
}

/*
    customprofile: {
        name: name/null,
        gender: gender/null,
        birthday: birthday/null,
        bio: bio/null,
        socialmedia: {
            youtube: id/null,
            tiktok: username/null,
            github: username/null,
            instagram: username/null,
            twitch: username/null,
            twitter: username/null,
            reddit: username/null,
        },
        favoritecolor: color/null,
        likes: 0,
        likeduser: [].
        badges: []
    }
*/