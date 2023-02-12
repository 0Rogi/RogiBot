const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.guild != config.idServer.idServerLogs) return;
        if (!interaction.isButton()) return;

        if (interaction.customId.startsWith(`AcceptManager`)) {

            if (!interaction.member.roles.cache.has(`966265476193861673`) && !interaction.member.roles.cache.has(`966265909075402812`)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Non hai il permesso`)
                    .setDescription(`Devi essere almeno <@&966265909075402812> per accettare/rifiutare un suggerimento`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }

            let embed = interaction.message.embeds[0].setTitle(`✔ Candidatura ACCETTATA da ${interaction.user.username} ✔`).setColor(`GREEN`);

            await interaction.update({ embeds: [embed], components: [] });

            let user = client.users.cache.get(embed.footer.text.slice(9));
            let embeddm = new Discord.MessageEmbed()
                .setTitle(`✔ CANDIDATURA ACCETTATA ✔`)
                .setDescription(`Complimenti, sei stato **accettato** come partner manager all'interno di **Rogi Discord**.\n\nOra avrai tutti i privilegi del partner manager, ricorda però di eseguire almeno **10 partner a settimama** o sarai depexato 😔\n\nBuona Fortuna!`)
                .setColor(`GREEN`);
            user.send({ embeds: [embeddm] }).catch(() => {
                interaction.followUp({ content: `Quest'utente ha i dm chiusi...`, ephemeral: true });
            })

            let guildMember = client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == user.id);
            if (!guildMember) {
                interaction.followUp({ content: `Quest'utente è uscito dal server 😐`, ephemeral: true });
                return;
            }
            guildMember.roles.add(config.rolesid.partnermanager);

        } else if (interaction.customId.startsWith(`RefuseManager`)) {

            if (!interaction.member.roles.cache.has(`966265476193861673`) && !interaction.member.roles.cache.has(`966265909075402812`)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Non hai il permesso`)
                    .setDescription(`Devi essere almeno <@&966265909075402812> per accettare/rifiutare un suggerimento`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }

            let embed = interaction.message.embeds[0].setTitle(`❌ Candidatura RIFIUTATA da ${interaction.user.username} ❌`).setColor(`RED`);
            let user = client.users.cache.get(embed.footer.text.slice(9));
            let embeddm = new Discord.MessageEmbed()
                .setTitle(`❌ CANDIDATURA RIFIUTATA ❌`)
                .setDescription(`Mi spiace, lo staff ha deciso di **rifiutare** la tua candidatura per essere partner manager, all'interno di **Rogi Discord**.\nPuoi sempre riprovare a farla dal canale <#1011673883260231742>`)
                .setColor(`RED`);
            user.send({ embeds: [embeddm] }).catch(() => {
                interaction.followUp({ content: `Quest'utente ha i dm chiusi...`, ephemeral: true });
            });

            interaction.update({ embeds: [embed], components: [] });
        }

    }
}