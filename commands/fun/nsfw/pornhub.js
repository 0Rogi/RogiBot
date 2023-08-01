const PornHub = require('pornhub.js');
const pornhub = new PornHub();
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `pornhub`,
    description: `Cerca video 18+`,
    data: {
        name: `pornhub`,
        description: `test`,
        options: [
            {
                name: `search`,
                description: `Cerca dei video su pornhub`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `video`,
                        description: `Il video da cercare`,
                        type: `STRING`,
                        required: true
                    }
                ]
            },
            {
                name: `info`,
                description: `Manda informazioni su un video di pornhub`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `url`,
                        description: `Il link del video di cui avere le informazioni`,
                        type: `STRING`,
                        required: true
                    }
                ]
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.nsfw],
    requirement: `none`,
    async execute(interaction) {
        if (interaction.channel != config.channelsid.nsfw) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Puoi usare questo comando, SOLO in <#${config.channelsid.nsfw}> 😦*`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        await interaction.deferReply();

        let command = interaction.options.getSubcommand();

        if (command == `search`) {
            pornhub.search('Video', interaction.options.getString(`video`)).then(res => {
                let porn = res.data[Math.floor(Math.random() * res.data.length)];
                let embed = new Discord.MessageEmbed()
                    .setTitle(porn.title)
                    .addField(`🎞️ Durata:`, porn.duration, true)
                    .addField(`👑 Premium?`, porn.premium ? `Sì` : `No`, true)
                    .addField(`🖥 HD?`, porn.hd ? `Sì` : `No`, true)
                    .setThumbnail(porn.preview)
                    .setColor(`YELLOW`);
                let button = new Discord.MessageButton()
                    .setLabel(`Vedi il video`)
                    .setEmoji(`😏`)
                    .setStyle(`LINK`)
                    .setURL(porn.url);
                let row = new Discord.MessageActionRow()
                    .addComponents(button);
                interaction.editReply({ embeds: [embed], components: [row] });
            })

            pornhub.search('Video', interaction.options.getString(`video`)).catch(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Non ho trovato nessun video, cercando \`${interaction.options.getString(`video`)}\` 🙁*`)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
            })
        }


        if (command == `info`) {
            pornhub.video(interaction.options.getString(`url`)).then(res => {
                const porn = res.data;

                let tags = ``
                porn.tags.forEach(tag => {
                    tags += `- **${tag}** `
                })
                if (tags == ``) tags = `_Nessun Tag_`;
                if (tags != `_Nessun Tag_`) tags = tags.slice(2, tags.length);

                let categories = ``
                porn.categories.forEach(category => {
                    categories += `- **${category}** `
                })
                if (categories == ``) tags = `_Nessuna Categoria_`;
                if (categories != `_Nessuna Categoria_`) categories = categories.slice(2, tags.length);

                let embed = new Discord.MessageEmbed()
                    .setTitle(porn.title)
                    .setDescription(`**__TAGS__**: \n${tags}\n\n**__CATEGORIE__**:\n${categories}`)
                    .addField(`🎞️ Durata:`, porn.duration, true)
                    .addField(`\u200b`, `\u200b`, true)
                    .addField(`👑 Premium?`, porn.premium ? `Sì` : `No`, true)
                    .setColor(`YELLOW`)
                    .setFooter({ text: `👁 ${porn.views} - 👍 ${porn.vote.up} - 👎 ${porn.vote.down}` });
                interaction.editReply({ embeds: [embed] });
            })

            pornhub.video(interaction.options.getString(`url`)).catch(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Inserisci un link di un video su pornhub, che sia valido...*`)
                    .setColor(`RED`)
                interaction.editReply({ embeds: [embed] })
            })
        }
    }
}