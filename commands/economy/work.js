const config = require(`${process.cwd()}/JSON/config.json`);
const moment = require(`moment`);
const randomWord = require(`random-words`);
const translate = require(`translate-google`);

module.exports = {
    name: `work`,
    description: ``,
    data: {
        name: `work`,
        description: `Lavora per guadagnare dei RogiBucks`
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.commands],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        let cooldown;
        await database.collection(`UserStats`).find({ id: interaction.user.id }).toArray(function (err, result) {
            if (!result[0]) {
                database.collection(`UserStats`).insertOne({
                    username: interaction.member.user.username, id: interaction.member.id, roles: interaction.member._roles, moderation: {}, leavedAt: 0, economy: {
                        money: 0,
                        cooldown: new Date().getTime() + 1000 * 60 * 40,
                        inventory: []
                    }
                })
                cooldown = new Date().getTime();
            } else if (result[0]) {
                cooldown = result[0]?.economy?.cooldown;
            }

            if (new Date().getTime() < cooldown) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Sei in cooldown <a:error:966371274853089280>`)
                    .setDescription(`Non puoi ancora lavorare, **sei in cooldown**!\n\nPotrai lavorare di nuovo alle \`${moment(cooldown).format(`hh:mm:ss A`)}\``)
                    .setColor(`RED`);
                interaction.editReply({ embeds: [embed] });
                return;
            }

            let game = Math.floor(Math.random() * (4 - 1) + 1);

            if (game == 1) {
                let button1 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setCustomId(`WorkRogi,${interaction.user.id}`)
                    .setEmoji(`<:Rogi:1080392279711293450>`);
                let button2 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setCustomId(`WorkGabvy,${interaction.user.id}`)
                    .setEmoji(`<:Gabvy:1080392612017606707>`);
                let button3 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setCustomId(`WorkBluu,${interaction.user.id}`)
                    .setEmoji(`<:BLuu:1080392300519231578>`);
                let button4 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setCustomId(`WorkAccel,${interaction.user.id}`)
                    .setEmoji(`<:Accel:1080392321633362050>`);
                let button5 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setCustomId(`WorkLight,${interaction.user.id}`)
                    .setEmoji(`<:Light:1080392323004899328>`);
                let button6 = new Discord.MessageButton()
                    .setStyle(`PRIMARY`)
                    .setCustomId(`WorkXen,${interaction.user.id}`)
                    .setEmoji(`<:Xen:1080392319213244466>`);
                let row1 = new Discord.MessageActionRow();
                let row2 = new Discord.MessageActionRow();
                let buttons = [button1, button2, button3, button4, button5, button6];

                let correctbutton = buttons[Math.floor(Math.random() * buttons.length)];
                correctbutton.setCustomId(`CorrectWork,${interaction.user.id},${correctbutton.customId.split(`,`)[0].slice(4)}`);

                const embed = new Discord.MessageEmbed()
                    .setTitle(`👦 Ricorda la Skin 👦`)
                    .setColor(`YELLOW`);

                if (correctbutton.customId.includes(`Rogi`)) {
                    embed.setDescription(`Ricorda questa skin: <:Rogi:1080392279711293450>`);
                } else if (correctbutton.customId.includes(`Gabvy`)) {
                    embed.setDescription(`Ricorda questa skin: <:Gabvy:1080392612017606707>`);
                } else if (correctbutton.customId.includes(`Bluu`)) {
                    embed.setDescription(`Ricorda questa skin: <:BLuu:1080392300519231578>`);
                } else if (correctbutton.customId.includes(`Accel`)) {
                    embed.setDescription(`Ricorda questa skin: <:Accel:1080392321633362050>`);
                } else if (correctbutton.customId.includes(`Light`)) {
                    embed.setDescription(`Ricorda questa skin: <:Light:1080392323004899328>`);
                } else if (correctbutton.customId.includes(`Xen`)) {
                    embed.setDescription(`Ricorda questa skin: <:Xen:1080392319213244466>`);
                }

                interaction.editReply({ embeds: [embed] });

                setTimeout(() => {

                    embed.setDescription(`Qual era la skin? 🧐`);

                    for (i = 0; i < 3; i++) {
                        button = buttons[Math.floor(Math.random() * buttons.length)];
                        buttons = buttons.filter(x => x != button);

                        row1.addComponents(button);
                    }

                    for (i = 0; i < 3; i++) {
                        let button = buttons[Math.floor(Math.random() * buttons.length)];
                        buttons = buttons.filter(x => x != button);

                        row2.addComponents(button);
                    }
                    interaction.editReply({ components: [row1, row2], embeds: [embed] })
                }, 500);
            }

            if (game == 2) {

                const embed = new Discord.MessageEmbed()
                    .setTitle(`🧠 Ricorda le Parole 🧠`)
                    .setDescription(`In questo gioco genererò **3 parole casuali** e dovrai **ricordare l'ordine** per poi **premerlo** all'interno dei pulsanti`)
                    .setColor(`YELLOW`);
                interaction.editReply({ embeds: [embed] });

                let words = [];

                for (let i = 0; i < 3; i++) {
                    const word = randomWord();

                    translate(word, { to: `it` }).then(w => {
                        words.push(w);
                    });
                }

                setTimeout(() => {

                    let row = new Discord.MessageActionRow();
                    let buttons = [];
                    let i = 0;

                    words.forEach(w => {
                        w.toLowerCase();
                        w = w.charAt(0).toUpperCase() + w.slice(1);

                        const button = new Discord.MessageButton()
                            .setLabel(w)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`Workgame2,${w},${interaction.user.id},${i}`)
                        buttons.push(button);

                        i++;

                        setTimeout(() => {
                            interaction.editReply({ content: w, embeds: [] });
                        }, 700);
                    });

                    for (i = 0; i < 3; i++) {
                        let button = buttons[Math.floor(Math.random() * buttons.length)];
                        buttons = buttons.filter(x => x != button);

                        row.addComponents(button);
                    }

                    setTimeout(() => {
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`Qual era l'ordine? 🤔`)
                            .setColor(`YELLOW`)
                            .setFooter({ text: `Parole Giuste: 0/3` });
                        interaction.editReply({ content: `_ _`, embeds: [embed], components: [row] });
                    }, 1000);

                }, 3000);

            }

            if (game == 3) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🤯 Risolvi il calcolo 🔢`)
                    .setDescription(`Risolvi questo calcolo per guadagnare **RogiBucks**`)
                    .setColor(`YELLOW`);

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setLabel(`Risolvi Calcolo`)
                            .setStyle(`PRIMARY`)
                            .setCustomId(`WorkRisolviCalcolo,${interaction.user.id}`)
                    );
                interaction.editReply({ embeds: [embed], components: [row] });
            }

            database.collection(`UserStats`).updateOne({ id: interaction.user.id }, {
                $set: {
                    'economy.cooldown': new Date().getTime() + 1000 * 60 * 40
                }
            });
        });
    }
}