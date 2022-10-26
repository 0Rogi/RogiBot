const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        //? Check if maintenance is enabled or not
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        //? Check if the server is the correct server
        if (interaction.guild != config.idServer.idServer) return;

        //? Check if the button is the button to kill zombies
        if (!interaction.isButton()) return;

        if (interaction.customId != `HalloweenGhostSpeak`) return;

        //? Check if the zombie is died
        if (interaction.message.embeds[0].footer.text != `Il Fantasma non ha ancora parlato con nessuno`) {
            interaction.reply({ content: `Qualcun altro ha già parlato con il fantasma prima di te, mi spiace 😞`, ephemeral: true });
            return;
        }

        //? Find userstats
        let userstats;
        serverstats.halloweenevent.forEach(user => {
            if (user.id == interaction.user.id) {
                userstats = user;
            }
        })

        if (userstats?.ghostfound) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`❌ ERRORE ❌`)
                .setDescription(`Hai già **parlato con il fanstasma**, lascia farlo agli altri ora :)`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        //? Update the message
        let embed = interaction.message.embeds[0].setFooter({ text: `Il Fantasma ha parlato con: ${interaction.user.username}` });
        let button = new Discord.MessageButton()
            .setLabel(`Parla con il Fantasma`)
            .setStyle(`PRIMARY`)
            .setEmoji(`🗣`)
            .setCustomId(`HalloweenGhostSpeak`)
            .setDisabled();
        let row = new Discord.MessageActionRow()
            .addComponents(button);
        await interaction.update({ embeds: [embed], components: [row] });
        interaction.followUp({ content: `Hai **parlato** con il **fantasma**, completando la missione di oggi!`, ephemeral: true });

        //? Store points in the database
        if (!userstats) {
            userstats = {
                username: interaction.user.username,
                id: interaction.user.id,
                missioncompleted: 1,
                points: 150,
                skeletons: {
                    found: 0,
                    messages: [],
                },
                batkilled: false,
                ghostfound: true,
                pumpkins: 0,
                potions: 0,
                inventory: {
                    object1: 0,
                    object2: 0,
                },
                killedzombies6: 0,
                candies: 0,
            }
            database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
            return;
        }

        if (userstats) {
            userstats.points = userstats.points + 150;
            userstats.ghostfound = true;
            userstats.missioncompleted = userstats.missioncompleted + 1;
            await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: interaction.user.id } } })
            database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
            return;
        }
    }
}