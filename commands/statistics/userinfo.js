const moment = require(`moment`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `userinfo`,
    description: `Mostra le informazioni di un utente nel server`,
    data: {
        name: `userinfo`,
        description: `Mostra le informazioni di un utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente di cui mostrare le informazioni`,
                type: `USER`,
                required: false
            }
        ],
    },
    permissionlevel: 0,
    allowedchannels: [config.idcanali.commands],
    requirement: `none`,
    execute(interaction) {
        interaction.deferReply().then(() => {
            let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id) || interaction.member;

            let embed = new Discord.MessageEmbed()
                .setTitle(user.user.tag)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setColor(!user?.displayHexColor || user?.displayHexColor == "#000000" ? "#ffffff" : user?.displayHexColor);
            
                let status = user.presence?.activities;
            if (status?.[0]) {
                if (status[0]?.emoji?.name && status[0]?.state) {
                    embed.setDescription(`${status[0]?.emoji.id ? `<:${status[0]?.emoji?.name}:${status[0]?.emoji.id}>` : status[0]?.emoji?.name ? status[0]?.emoji?.name : ``} ${status[0]?.state}`);
                } else if (status[0].emoji?.name) {
                    embed.setDescription(`${status[0]?.emoji.id ? `<:${status[0]?.emoji?.name}:${status[0]?.emoji.id}>` : status[0]?.emoji?.name ? status[0]?.emoji?.name : ``}`);
                } else if (status[0]?.state) {
                    embed.setDescription(`${status[0]?.state}`);
                }
            }
            embed.addField(`🧾 ID Utente:`, user.id.toString(), true);
            embed.addField(`\u200b`, `\u200b`, true);
            switch (user.presence?.status) {
                case `online`: {
                    embed.addField(`👌🏻 Stato`, `<:online:966385817327132723> Online`, true);
                } break;
                case `dnd`: {
                    embed.addField(`👌🏻 Stato`, `<:dnd:966385946385870948> Non Disturbare`, true);
                } break;
                case `idle`: {
                    embed.addField(`👌🏻 Stato`, `<:idle:966385794237476955> Inattivo`, true);
                } break;
                case `offline`: {
                    embed.addField(`👌🏻 Stato`, `<:offline:966386018204913695> Offline`, true);
                } break;
                case undefined: {
                    embed.addField(`👌🏻 Stato`, `<:offline:966386018204913695> Offline`, true);
                } break;
            }

            embed.addField(`📝 Creazione Account:`, `${moment(user.user.createdAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(user.user.createdAt).fromNow()})`);
            embed.addField(`🚗 Entrato nel server:`, `${moment(user.joinedAt).format(`ddd DD MMM YYYY, HH:mm:ss`)} (${moment(user.joinedAt).fromNow()})`);

            let roles = ``;
            user._roles.forEach(r => {
                if (r == `947935270622351390` || r == `947935224812158997` || r == `956939692857753720` || r == `848596250730823741` || r == `839456022925541376` || r == `741616767079809024` || r == `813840229152063540` || r == `814568422431522817`) return
                roles += `<@&${r}>`;
            });

            if (roles == `` || !roles) roles = `_Nessun Ruolo_`;
            embed.addField(`🎯Ruoli:`, roles);
            interaction.editReply({ embeds: [embed] });
        })
    }
}