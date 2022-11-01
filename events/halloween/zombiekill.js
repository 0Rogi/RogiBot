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

        if (interaction.customId != `HalloweenZombieKill`) return;

        //? Check if the zombie is died
        if (interaction.message.embeds[0].footer.text != `Zombie Ancora Vivo`) {
            interaction.reply({ content: `Qualcun altro ha già sconfitto lo zombie prima di te, mi spiace 😞`, ephemeral: true });
            return;
        }

        //? Find userstats
        let userstats;
        serverstats.halloweenevent.forEach(user => {
            if (user.id == interaction.user.id) {
                userstats = user;
            }
        })

        //? Calculate the possibility to win the fight
        let possibility = [true, false, true];
        if (interaction.member.roles.cache.has(config.idruoli.serverbooster)) {
            possibility = [true, false, true, true];
        }
        let win = possibility[Math.floor(Math.random() * possibility.length)];

        //? If the user win the fight
        if (win) {
            //? Generate random points to give
            let points = Math.floor(Math.random() * (25 - 15 + 1) + 15)
            //? Update the message
            let embed = interaction.message.embeds[0].setFooter({ text: `Zombie Sconfitto da: ${interaction.user.username}` })
            let button = new Discord.MessageButton()
                .setLabel(`Uccidi Zombie`)
                .setEmoji(`🔪`)
                .setStyle(`PRIMARY`)
                .setCustomId(`HalloweenZombieKill`)
                .setDisabled();
            let row = new Discord.MessageActionRow()
                .addComponents(button);
            await interaction.update({ embeds: [embed], components: [row] });
            interaction.followUp({ content: `Hai **sconfitto** lo **zombie**, guadagnango ben **${points} punti**!`, ephemeral: true });

            //? Store points in the database
            if (!userstats) {
                userstats = {
                    username: interaction.user.username,
                    id: interaction.user.id,
                    missioncompleted: 0,
                    points: points,
                    skeletons: {
                        found: 0,
                        messages: [],
                    },
                    batkilled: false,
                    ghostfound: false,
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

                if (new Date().getDate() == 1) {
                    userstats.killedzombies6 = userstats.killedzombies6 + 1;
                }
                if (userstats.killedzombies6 == 5) {
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Missione Completata!`)
                        .setDescription(`Hai completato con successo la missione, guadagnando 50 punti!`)
                        .setColor(`ORANGE`);
                    interaction.editReply({ embeds: [embed] });
                    userstats.points = userstats.points + 50;
                }

                userstats.points = userstats.points + points;
                await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: interaction.user.id } } })
                database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": userstats } });
                return;
            }

        } else if (!win) { //? If the user lose the fight
            //? Reply to interaction
            interaction.reply({ content: `Lo **zombie ti ha sconfitto**, ferendoti, non potrai **fare niente** per **un minuto**!`, ephemeral: true });
            //? Timeout the user
            interaction.member.timeout(1000 * 60, `Morso dallo Zombie`);
        }

    }
}