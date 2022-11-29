const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `tadd`,
    description: `Aggiunge un utente al ticker`,
    data: {
        name: `tadd`,
        description: `Aggiunge un utente al ticket`,
        options: [
            {
                name: `user`,
                description: `Aggiunge un utente ad un ticket`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `utente`,
                        description: `L'utente da aggiungere al ticket`,
                        type: `USER`,
                        required: true,
                    }
                ]
            },
            {
                name: `role`,
                description: `Aggiunge un ruolo ad un ticket`,
                type: `SUB_COMMAND`,
                options: [
                    {
                        name: `ruolo`,
                        description: `Il ruolo da aggiungere al ticket`,
                        type: `ROLE`,
                        required: true,
                    }
                ]
            }
        ],
    },
    permissionlevel: 0.5,
    allowedchannels: [`ALL`],
    requirement: `none`,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let ticket = await serverstats.tickets.find(ticket => ticket.channelid == interaction.channel.id);
            if (!ticket) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Errore`)
                    .setColor(`RED`)
                    .setDescription(`*Questo canale non è un ticket*`)
                    .setThumbnail(config.images.rogierror);
                interaction.editReply({ embeds: [embed] });
                return;
            }
            if (ticket) {

                let command = interaction.options.getSubcommand();

                if (command == `user`) {
                    let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id);
                    if (interaction.channel.permissionsFor(user).has(`VIEW_CHANNEL`, true)) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Errore`)
                            .setColor(`RED`)
                            .setDescription(`*Questo utente ha già accesso a questo ticket*`)
                            .setThumbnail(config.images.rogierror);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }
                    if (user.user.bot) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Errore`)
                            .setColor(`RED`)
                            .setDescription(`*Non puoi aggiungere un bot ad un ticket*`)
                            .setThumbnail(config.images.rogierror);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Aggiunta di un Utente`)
                        .setDescription(`${user} è stato **aggiunto** al ticket con successo`)
                        .setColor(`GREEN`)
                        .setThumbnail(user.displayAvatarURL({ dynamic: true }));
                    interaction.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true });
                    interaction.editReply({ embeds: [embed] });
                } else if (command == `role`) {
                    let role = interaction.guild.roles.cache.find(x => x.id == interaction.options.getRole(`ruolo`)?.id)
                    if (interaction.channel.permissionsFor(role).has(`VIEW_CHANNEL`, true)) {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Errore`)
                            .setColor(`RED`)
                            .setDescription(`*Questo ruolo ha già accesso a questo ticket*`)
                            .setThumbnail(config.images.rogierror);
                        interaction.editReply({ embeds: [embed] });
                        return;
                    }

                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Aggiunta di un Ruolo`)
                        .setDescription(`${role} è stato **aggiunto** al ticket con successo`)
                        .setColor(`GREEN`);
                    interaction.channel.permissionOverwrites.create(role.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true });
                    interaction.editReply({ embeds: [embed] });
                }
            }
        })
    }
}