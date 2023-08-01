const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `bugreport`,
    description: `Segnala un bug allo staff`,
    data: {
        name: `bugreport`,
        description: `Segnala un bug`,
        options: [
            {
                name: `bug`,
                description: `Il bug che vuoi segnalare`,
                type: `STRING`,
                required: true
            },
            {
                name: `immagine`,
                description: `Uno screen come prova`,
                type: `ATTACHMENT`,
                required: false
            }
        ],
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `none`,
    execute(interaction) {
        interaction.deferReply().then(() => {
            let bug = interaction.options.getString(`bug`)
            if (bug.length > 1024) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                    .setDescription(`*Testo troppo lungo!\npuoi usare massimo 1024 caratteri!*`)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] })
                return
            }
            let embed1 = new Discord.MessageEmbed()
                .setTitle(`🪲Bug Report🪲`)
                .setDescription(`Segnalato da ${interaction.member.toString()}`)
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                .addField(`🪲Bug:`, bug.toString())
                .setColor(`YELLOW`)
                .setFooter({ text: `User ID: ${interaction.user.id}` })
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`🐞Bug Report🐞`)
                .setDescription(`Il tuo bug è stato segnalato allo **staff**.`)
                .addField(`🪲Bug:`, bug.toString())
                .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
                .setColor(`YELLOW`)
            if (interaction.options.getAttachment(`immagine`)) {
                embed1.setImage(interaction.options.getAttachment(`immagine`).url);
                embed2.setImage(interaction.options.getAttachment(`immagine`).url);
            }
            client.channels.cache.get(config.channelsid.logs.bugs).send({ embeds: [embed1] })
            interaction.editReply({ embeds: [embed2] })
        })
    }
}