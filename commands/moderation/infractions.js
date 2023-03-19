module.exports = {
    name: `infractions`,
    description: `Mostra i tuoi avvertimenti o quelli di un altro utente`,
    data: {
        name: `infractions`,
        description: `Mostra i tuoi avvertimenti o quelli di un altro utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente di cui vedere gli avvertimenti`,
                type: `USER`,
                required: false
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    async execute(interaction) {

        await interaction.deferReply();

        const user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id) || interaction.member;

        database.collection(`UserStats`).find({ id: user.user.id }).toArray(function (err, result) {
            if (err || !result[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                    .setDescription(`_${user.toString()} non ha avvertimenti_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            const warns = result[0]?.warns || [];

            if (warns?.length <= 0) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> ERRORE <a:error:1086952752892092416>`)
                    .setDescription(`_${user.toString()} non ha avvertimenti_`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            let totPage = Math.ceil(warns.length / 10);

            let page = 1;

            let warnsList = "";

            for (let i = 10 * (page - 1); i < 10 * page; i++) {
                if (warns[i]) {
                    warnsList += `**#${warns[i].id}** ${warns[i].warn}\n`;
                }
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`INFRAZIONI DI ${user.user.username}`)
                .addField(`⚠️ Avvertimenti:`, warnsList.toString())
                .setColor(`YELLOW`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: `Pagina ${page}/${totPage}` });
            let button1 = new Discord.MessageButton()
                .setStyle(`PRIMARY`)
                .setCustomId(`WarnIndietro,${interaction.user.id}`)
                .setEmoji(`⬅️`);
            let button2 = new Discord.MessageButton()
                .setStyle(`PRIMARY`)
                .setCustomId(`WarnAvanti,${interaction.user.id}`)
                .setEmoji(`➡️`);

            if (page == 1) button1.setDisabled();
            if (page == totPage) button2.setDisabled();

            const row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2);

            interaction.editReply({ embeds: [embed], components: [row] }).then(msg => {
                const collector = msg.createMessageComponentCollector()

                setTimeout(() => {
                    button1.setDisabled();
                    button2.setDisabled();
                    msg.edit({ components: [row] });
                }, 1000 * 60 * 5);

                collector.on(`collect`, interaction => {

                    if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo menù!`, ephemeral: true });

                    if (interaction.customId.startsWith(`WarnIndietro`)) {
                        page--;
                        if (page < 1) page = 1;
                    } else if (interaction.customId.startsWith(`WarnAvanti`)) {
                        page++;
                        if (page > totPage) page = totPage;
                    }

                    warnsList = ``;

                    for (let i = 10 * (page - 1); i < 10 * page; i++) {
                        if (warns[i]) {
                            warnsList += `**#${warns[i].id}** ${warns[i].warn}\n`;
                        }
                    }

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`INFRAZIONI DI ${user.user.username}`)
                        .addField(`⚠️ Avvertimenti:`, warnsList.toString())
                        .setColor(`YELLOW`)
                        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                        .setFooter({ text: `Pagina ${page}/${totPage}` });
                    let button1 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setCustomId(`WarnIndietro,${interaction.user.id}`)
                        .setEmoji(`⬅️`);
                    let button2 = new Discord.MessageButton()
                        .setStyle(`PRIMARY`)
                        .setCustomId(`WarnAvanti,${interaction.user.id}`)
                        .setEmoji(`➡️`);

                    if (page == 1) button1.setDisabled();
                    if (page == totPage) button2.setDisabled();

                    const row = new Discord.MessageActionRow().addComponents(button1).addComponents(button2);

                    interaction.update({ embeds: [embed], components: [row] });
                });
            });
        });
    }
}