const config = require(`${process.cwd()}/JSON/config.json`);
const moment = require(`moment`);

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (!interaction.isButton()) return;

        if (!interaction.customId.includes(`claimVip`)) return;

        if (!interaction.customId.includes(interaction.user.id)) return interaction.reply({ content: `<a:error:1086952752892092416> Non è un tuo pulsante!`, ephemeral: true });

        const nickname = interaction.customId.split(`,`)[1];

        if (!nickname) return;

        client.channels.cache.get(`1118947905961721939`).send(`lp user ${nickname} parent set vip`);
        client.channels.cache.get(`1118947905961721939`).send(`tellraw @a {"text": "${interaction.user.username}${interaction.user.discriminator != `0` ? `#` + interaction.user.discriminator : ``} ha riscattato il VIP a ${nickname}!", "color": "gold"}`);

        const embed = new Discord.MessageEmbed()
            .setTitle(`💎 VIP INSERITO 💎`)
            .setDescription(`Il VIP è stato dato a \`${nickname}\`.\n\n*Se c'è stato un errore con il nickname inserito o il comando non ha funzionato, aprire un post in <#1102996021707030578> e pingare un admin/owner della coppercraft*`)
            .setColor(`YELLOW`);

        interaction.reply({ embeds: [embed], ephemeral: true });

        let logEmbed = new Discord.MessageEmbed()
            .setTitle(`💎 VIP RISCATTATO 💎`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`👤 Utente:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n||${interaction.user.toString()}||`)
            .addField(`🪪 Nickname:`, nickname)
            .setColor(`GREEN`);
        client.channels.cache.get(`1119298541022621906`).send({ embeds: [logEmbed] });

        const embedChat = new Discord.MessageEmbed()
            .setColor(`#2B2D31`)
            .setAuthor({
                name: `💎 ${nickname} ha ricevuto il VIP 💎`, iconURL: `https://minotar.net/helm/${nickname}/128.png`
            });
        client2.channels.cache.get(`1121088737703633127`).send({ embeds: [embedChat] });

        const button = new Discord.MessageButton()
            .setLabel(`Riscatta il VIP`)
            .setStyle(`SUCCESS`)
            .setCustomId(`${interaction.user.id},${nickname},claimVip`)
            .setEmoji(`💎`)
            .setDisabled();
        const row = new Discord.MessageActionRow()
            .addComponents(button);

        interaction.message.edit({ components: [row] });

        database.collection(`ServerStats`).updateOne({}, {
            $push: {
                'coppercraftvip': {
                    username: interaction.user.username,
                    id: interaction.user.id,
                    nickname: nickname
                }
            }
        });
    }
}