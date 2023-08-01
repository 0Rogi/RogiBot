const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `claimvip`,
    description: `Riscatta il vip nella coppercraft`,
    data: {
        name: `claimvip`,
        description: `Riscatta il vip nella coppercraft`,
        options: [
            {
                name: `nickname`,
                description: `Il tuo nick nella coppercraft - POTRAI INSERIRLO SOLO UNA VOLTA`,
                type: `STRING`,
                required: true
            }
        ],
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    async execute(interaction) {
        await interaction.deferReply();

        if (!interaction.member.roles.cache.has(config.rolesid.serverbooster) && interaction.user.id != `601308178482855956`) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setColor(`RED`)
                .setDescription(`*Devi boostare il server per poter riscattare il VIP nella coppercraft!*`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        const nickname = interaction.options.getString(`nickname`);

        let found = false;
        let hasAlreadyVip = false;
        serverstats.coppercraftvip?.forEach(u => {
            if (u.id == interaction.user.id) found = true;
            if (u.nickname == nickname) hasAlreadyVip = true;
        });

        if (found) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setColor(`RED`)
                .setDescription(`*Hai già dato il VIP a qualcuno*\n\n*Se ritieni che si tratta di un errore, apri un post in <#1102996021707030578> e pinga un admin/owner della coppercraft*`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (serverstats.coppercraftstaffers?.includes(nickname.toLowerCase()) || hasAlreadyVip) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setColor(`RED`)
                .setDescription(`*${nickname} non può ricevere il VIP.*`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`💎 Riscatta il VIP 💎`)
            .setDescription(`Il nickname che prenderà il **VIP nella coppercraft** è: \`${nickname}\`.\n\nSe il nickname è corretto, premi il pulsante qui sotto.\n\n⚠️ **NON POTRAI PIÙ REINSERIRE IL NICKNAME** ⚠️\n*Per essere sicuro che funzioni, entra nel server e premi il pulsante qui sotto.*`)
            .setColor(`YELLOW`);
        const button = new Discord.MessageButton()
            .setLabel(`Riscatta il VIP - 60s`)
            .setStyle(`SUCCESS`)
            .setCustomId(`${interaction.user.id},${nickname},claimVip`)
            .setEmoji(`💎`);
        const row = new Discord.MessageActionRow()
            .addComponents(button);
        interaction.editReply({ embeds: [embed], components: [row] }).then(m => {
            const button = m.components[0].components[0];
            setTimeout(() => {
                if (!button.disabled) {
                    button.setLabel(`Riscatta il VIP - 30s`);
                    const row = new Discord.MessageActionRow().addComponents(button);
                    m.edit({ components: [row] });
                }
            }, 1000 * 30);

            setTimeout(() => {
                if (!button.disabled) {
                    button.setLabel(`Riscatta il VIP - 10s`);
                    const row = new Discord.MessageActionRow().addComponents(button);
                    m.edit({ components: [row] });
                }
            }, 1000 * 50);

            setTimeout(() => {
                if (!button.disabled) {
                    button.setLabel(`Riscatta il VIP - 5s`);
                    const row = new Discord.MessageActionRow().addComponents(button);
                    m.edit({ components: [row] });
                }
            }, 1000 * 55);

            setTimeout(() => {
                if (!button.disabled) {
                    button.setLabel(`Riscatta il VIP`);
                    button.setDisabled();
                    const row = new Discord.MessageActionRow().addComponents(button);
                    m.edit({ components: [row] });
                }
            }, 1000 * 60);
        });
    }
}
