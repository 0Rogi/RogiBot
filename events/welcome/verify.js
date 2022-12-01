const config = require(`${process.cwd()}/JSON/config.json`);
const Canvas = require(`canvas`);
const moment = require(`moment`);

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        //? Check if the server is correct
        if (interaction.guild != config.idServer.idServer) return;

        //? Check if is maintenance or not
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        if (interaction.customId == `SuspiciousVerify`) {
            //? Generate a Random sum
            let number1 = Math.floor(Math.random() * (10 - 1)) + 1;
            let number2 = Math.floor(Math.random() * (20 - 10)) + 10;

            let modal = new Discord.Modal()
                .setCustomId(`SuspiciousVerifyModal,${number1},${number2}`)
                .setTitle(`VERIFICA`);
            let input = new Discord.TextInputComponent()
                .setCustomId(`SuspiciousVerifyModalInput`)
                .setLabel(`Quanto fa ${number1} + ${number2}?`)
                .setStyle(`SHORT`)
                .setRequired();
            let firstActionRow = new Discord.MessageActionRow().addComponents(input);
            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);

        }

        if (interaction.customId?.startsWith(`SuspiciousVerifyModal`)) {
            let answer = interaction.fields.getTextInputValue(`SuspiciousVerifyModalInput`)

            //? Check if the answer is correct
            let number1 = parseInt(interaction.customId.split(`,`)[1]);
            let number2 = parseInt(interaction.customId.split(`,`)[2]);

            if (answer == number1 + number2) {

                //? Replying to interaction
                await interaction.reply({ content: `<a:checkmark:970022827866611762> Sei stato verificato!`, ephemeral: true });

                //? Create the welcome card
                let bots = client.guilds.cache.get(config.idServer.idServer).members.cache.filter(member => member.user.bot).size;
                let users = client.guilds.cache.get(config.idServer.idServer).memberCount - bots;
                let canvas = Canvas.createCanvas(1280, 720);
                let ctx = canvas.getContext(`2d`);
                let background = await Canvas.loadImage(`${process.cwd()}/Canvas/img/welcome/image${Math.floor(Math.floor(Math.random() * (7 + 1)))}.png`);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                let avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: `png` }));
                ctx.drawImage(avatar, 470, 250, 350, 350);
                await Canvas.registerFont(`${process.cwd()}/Canvas/font/robotoBold.ttf`, { family: `robotoBold` });
                ctx.font = '40px "robotoBold"';
                ctx.fillStyle = `#F8F8F8`;
                ctx.fillText(`${interaction.user.username}\nè entrato nel server!\nSei il nostro ${users} utente!`, 450, 100);

                //? Send the welcome card
                let embed = new Discord.MessageEmbed()
                    .setDescription(`👋🏻 Ciao ${interaction.member.toString()}, benvenuto in ${interaction.member.guild.name} \n👀 Sei il nostro **${users}** membro!\n📜 Leggi le <#698178808011948032> e rispettale 😉\n🌐 Puoi vedere tutte le info del sever in <#813476709731008532>`)
                    .setImage(`attachment://Welcome.png`)
                    .setColor(`YELLOW`);
                await client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)] });

                //? Check if the user had some other roles and if yes, assign it
                database.collection(`UserStats`).find({ id: interaction.member.id }).toArray(function (err, result) {
                    if (!result[0]) {
                        database.collection(`UserStats`).insertOne({
                            username: interaction.member.user.username, id: interaction.member.id, roles: interaction.member._roles, moderation: {}, leavedAt: 0, levelling: {}
                        })
                        interaction.member.roles.add(config.idruoli.videonotification);
                    } else if (result[0]) {
                        result[0].roles.forEach(role => {
                            if (role == config.idruoli.serverbooster || role == config.idruoli.unverified) return;
                            interaction.member.roles.add(role);
                        })
                    }
                })

                //? Give fan role and remove unverified
                interaction.member.roles.remove(config.idruoli.unverified);
                interaction.member.roles.add(config.idruoli.fan);
                return;

            } else {

                //? Replying to interaction
                let embed = new Discord.MessageEmbed()
                    .setTitle(`❌ Risposta Errata ❌`)
                    .setDescription(`Hai scritto \`${answer}\`, ma \`${number1} + ${number2}\` fa \`${number1 + number2}\`...\n\nPotrai **riprovare** fra **due ore** o **contattare** un **admin** per essere **verificato manualmente**`)
                    .setColor(`RED`);
                interaction.reply({ embeds: [embed], ephemeral: true });

                //? Timeout user
                interaction.member.timeout(1000 * 60 * 2, `Verifica Sospetta Fallita`).catch(() => { });

                //? Send the Log
                let embed2 = new Discord.MessageEmbed()
                    .setTitle(`🤦‍♂️ Verifica Fallita 🤦‍♂️`)
                    .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                    .addField(`👤 Utente:`, `Nome: **${interaction.user.username}**, ID: **${interaction.user.id}**\n||${interaction.user.toString()}||`)
                    .addField(`🔢 Operazione:`, `${number1} + ${number2} = ${number1 + number2}`)
                    .addField(`👀 Risposta:`, answer.toString())
                    .setColor(`RED`)
                    .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }));
                client.channels.cache.get(`1029450785739780207`).send({ embeds: [embed2] });
            }

        }

        if (interaction.customId == `Verify`) {
            //? Check if the user is already verified
            if (!interaction.member.roles.cache.has(config.idruoli.unverified)) {
                interaction.reply({ content: `<a:error:966371274853089280> Sei già verificato!`, ephemeral: true })
                return
            }

            //? Check if the verify is suspect
            if (new Date().getHours() >= 22 || new Date().getHours() <= 8 || serverstats?.lockdown || new Date().getTime() - interaction.member.createdAt >= 1814400049) {

                //? Write all the reason for the suspect verify
                let reasons = ``;
                if (serverstats?.lockdown) reasons += `-Verifica durante un **lockdown** al server\n`;
                if (new Date().getHours() >= 22 || new Date().getHours() <= 8) reasons += `-Verifica durante la **sicurezza notturna**\n`;
                if (new Date().getTime() - interaction.member.createdAt >= 1814400049) reasons += `-L'account è stato creato da troppo poco tempo`;

                //? Send the warning of the suspect verify
                let embed = new Discord.MessageEmbed()
                    .setTitle(`🤨 VERIFICA SOSPETTA 👮‍♂️`)
                    .setDescription(`Salve, la sua verifica è stata rilevata **SOSPETTA** per i seguenti motivi:\n${reasons}\n\nPer essere verificato, dovrà risolvere una piccola operazione, in caso di fallimento, sarà messo in timeout per **2 ore**.\nPuo' contattare un **admin** per farsi **verificare a mano** o attendere la fine del timeout.`)
                    .setColor(`RED`);
                let button = new Discord.MessageButton()
                    .setStyle(`SECONDARY`)
                    .setCustomId(`SuspiciousVerify`)
                    .setLabel(`Clicca Qui`);
                let row = new Discord.MessageActionRow()
                    .addComponents(button);
                interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
                return;
            }

            //? Replying to interaction
            await interaction.reply({ content: `<a:checkmark:970022827866611762> Sei stato verificato!`, ephemeral: true });

            //? Create the welcome card
            let bots = client.guilds.cache.get(config.idServer.idServer).members.cache.filter(member => member.user.bot).size;
            let users = client.guilds.cache.get(config.idServer.idServer).memberCount - bots;
            let canvas = Canvas.createCanvas(1280, 720);
            let ctx = canvas.getContext(`2d`);
            let background = await Canvas.loadImage(`${process.cwd()}/Canvas/img/welcome/image${Math.floor(Math.floor(Math.random() * (7 + 1)))}.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            let avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: `png` }));
            ctx.drawImage(avatar, 470, 250, 350, 350);
            await Canvas.registerFont(`${process.cwd()}/Canvas/font/robotoBold.ttf`, { family: `robotoBold` });
            ctx.font = '40px "robotoBold"';
            ctx.fillStyle = `#F8F8F8`;
            ctx.fillText(`${interaction.user.username}\nè entrato nel server!\nSei il nostro ${users} utente!`, 450, 100);

            //? Send the welcome card
            let embed = new Discord.MessageEmbed()
                .setDescription(`👋🏻 Ciao ${interaction.member.toString()}, benvenuto in ${interaction.member.guild.name} \n👀 Sei il nostro **${users}** membro!\n📜 Leggi le <#698178808011948032> e rispettale 😉\n🌐 Puoi vedere tutte le info del sever in <#813476709731008532>`)
                .setImage(`attachment://Welcome.png`)
                .setColor(`YELLOW`);
            await client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)] });

            //? Check if the user had some other roles and if yes, assign it
            database.collection(`UserStats`).find({ id: interaction.member.id }).toArray(function (err, result) {
                if (!result[0]) {
                    database.collection(`UserStats`).insertOne({
                        username: interaction.member.user.username, id: interaction.member.id, roles: interaction.member._roles, moderation: {}, leavedAt: 0, levelling: {}
                    })
                    interaction.member.roles.add(config.idruoli.videonotification);
                } else if (result[0]) {
                    result[0].roles.forEach(role => {
                        if (role == config.idruoli.serverbooster || role == config.idruoli.unverified) return;
                        interaction.member.roles.add(role);
                    })
                }
            })

            //? Give fan role and remove unverified
            interaction.member.roles.remove(config.idruoli.unverified);
            interaction.member.roles.add(config.idruoli.fan);

        }
    }
}