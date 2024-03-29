const ms = require(`ms`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `slowmode`,
    description: `Cambia la slowmode di un canale`,
    data: {
        name: `slowmode`,
        description: `Imposta la slowmode di un canale`,
        options: [
            {
                name: `tempo`,
                description: `Slowmode da settare`,
                type: `STRING`,
                required: true
            }
        ]
    },
    permissionlevel: 1,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        let time = interaction.options.getString(`tempo`);

        if (time != `off` && time != 0) {
            time = ms(time);

            if (!time) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Inserisci un tempo valido*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            if (time > 21600000) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Puoi impostare un massimo di 6 ore di slowmode*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            if (time < 1 * 1000) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Puoi impostare un minimo di 1 secondo di slowmode*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }
        }

        if (time == `off` || time == `no` || time == 0)
            time = 0;
        interaction.channel.setRateLimitPerUser(parseInt(time) / 1000);
        let timeembed = ms(time, { long: true });
        timeembed = timeembed + ` `;
        timeembed = timeembed
            .replace(`second `, `secondo`)
            .replace(`seconds`, `secondi`)
            .replace(`minute `, `minuto `)
            .replace(`minutes`, `minuti`)
            .replace(`hour `, `ora `)
            .replace(`hours`, `ore`);

        let embed = new Discord.MessageEmbed()
            .setAuthor({ name: `[SLOWMODE] @${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor(`PURPLE`)
            .addField(`⚓ Canale:`, `Nome: ${interaction.channel.name} - ID: ${interaction.channel.id}\n||${interaction.channel.toString()}||`);
        if (time == 0) {
            embed.addField(`🐌 Nuova Slowmode:`, `_Slowmode disattivata_`);
        } else {
            embed.addField(`🐌 Nuova Slowmode:`, `${timeembed}`);
        }
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
    }
}