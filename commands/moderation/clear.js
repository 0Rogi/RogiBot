const moment = require(`moment`);
const fs = require(`fs`);
const config = require(`${process.cwd()}/JSON/config.json`);
const createTranscript = require(`${process.cwd()}/functions/transcripts/createtranscript.js`);

module.exports = {
    name: `clear`,
    description: `Cancella dei messaggi contemporaneamente, anche di un solo utente specifico`,
    data: {
        name: `clear`,
        description: `Cancella dei messaggi`,
        options: [
            {
                name: `quantità`,
                description: `Numero dei messaggi da eliminare`,
                type: `NUMBER`,
                required: true
            },
            {
                name: `utente`,
                description: `Utente di cui cancellare i messaggi`,
                type: `USER`,
                required: false
            }
        ]
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        let count = interaction.options.getNumber(`quantità`)
        if (!count) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Inserisci un numero valido*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed], ephemeral: true })
            return
        }
        if (count > 100) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Posso cancellare solo 100 messaggi per volta*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed], ephemeral: true })
            return
        }
        if (count < 1) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Devi inserire un numero maggiore o uguale a 1*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed], ephemeral: true })
            return
        }

        let user = interaction.options.getUser(`utente`);

        if (user) {
            let i = 0;
            let messagesfound = [];

            await interaction.channel.messages.fetch({ limit: count }).then(messages => {
                messages.forEach(message => {
                    if (message.author == user.id) {
                        messagesfound.push(message);
                        message.delete().catch(() => { });
                    }
                    i++;
                })
            })

            await messagesfound.reverse();
            let transcript = await createTranscript(interaction.channel.id, messagesfound);
            fs.writeFile(`clear${interaction.user.id}.txt`, transcript, async function (err) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🧹 CLEAR (UTENTE) 🧹`)
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                    .addField(`⚓ Canale`, `Nome: **#${interaction.channel.name}** - ID: **${interaction.channel.id}**\n||${interaction.channel.toString()}||`)
                    .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
                    .setColor(`RED`);
                if (interaction.channel != config.channelsid.logs.errors) {
                    await client.channels.cache.get(config.channelsid.logs.moderation.clear).send({ embeds: [embed], files: [`${process.cwd()}/clear${interaction.user.id}.txt`] });
                }
            })

            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: `[CLEAR] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**${messagesfound.length.toString()} messaggi di ${user.toString()}** sono stati **eliminati** all'interno degli **ultimi ${count.toString()} messaggi** di questo canale`)
                .setColor(`PURPLE`);
            interaction.editReply({ embeds: [embed] });
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
            return;
        }

        if (!user) {
            let embed = new Discord.MessageEmbed()
                .setAuthor({ name: `[CLEAR] ${interaction.member.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
                .setDescription(`**${count.toString()} messaggi** sono stati **eliminati** all'interno di questo canale`)
                .setColor(`PURPLE`);
            interaction.editReply({ embeds: [embed] });
            interaction.channel.messages.fetch({ limit: count }).then(async messages => {
                await messages.reverse();
                let transcript = await createTranscript(interaction.channel.id, messages);
                fs.writeFile(`clear${interaction.user.id}.txt`, transcript, async function (err) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`🧹 CLEAR 🧹`)
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🔨 Moderatore:`, `Nome: **${interaction.member.user.username}** - ID: **${interaction.member.user.id}**\n||${interaction.member.toString()}||`)
                        .addField(`⚓ Canale`, `Nome: **#${interaction.channel.name}** - ID: **${interaction.channel.id}**\n||${interaction.channel.toString()}||`)
                        .setColor(`RED`);
                    if (interaction.channel != config.channelsid.logs.errors) {
                        await client.channels.cache.get(config.channelsid.logs.moderation.clear).send({ embeds: [embed], files: [`${process.cwd()}/clear${interaction.user.id}.txt`] });
                    }
                    interaction.channel.bulkDelete(count, true);
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
                })
            })
        }
    }
}