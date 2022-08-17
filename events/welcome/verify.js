const config = require(`${process.cwd()}/JSON/config.json`)
const Canvas = require(`canvas`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `SuspiciousVerify`) {
            let modal = new Discord.Modal()
                .setCustomId(`SuspiciousVerifyModal`)
                .setTitle(`VERIFICA`)
            let input = new Discord.TextInputComponent()
                .setCustomId(`SuspiciousVerifyModalInput`)
                .setLabel(`Quanto fa 2+2? (Scrivi la risposta a lettere)`)
                .setStyle(`SHORT`)
            let firstActionRow = new Discord.MessageActionRow().addComponents(input)
            modal.addComponents(firstActionRow)
            await interaction.showModal(modal)
        }
        if (interaction.customId == `SuspiciousVerifyModal`) {
            const answer = interaction.fields.getTextInputValue(`SuspiciousVerifyModalInput`)
            if (answer.toLowerCase() == `quattro`) {
                await interaction.reply({ content: `<a:checkmark:970022827866611762> Sei stato verificato!`, ephemeral: true })
                let bots = client.guilds.cache.get(config.idServer.idServer).members.cache.filter(member => member.user.bot).size;
                let users = client.guilds.cache.get(config.idServer.idServer).memberCount - bots;
                let canvas = Canvas.createCanvas(1280, 720);
                let ctx = canvas.getContext(`2d`)
                let background = await Canvas.loadImage(`${process.cwd()}/Canvas/img/welcome/image${Math.floor(Math.floor(Math.random() * (7 + 1)))}.png`)
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                let avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: `png` }))
                ctx.drawImage(avatar, 470, 250, 350, 350)
                await Canvas.registerFont(`${process.cwd()}/Canvas/font/robotoBold.ttf`, { family: `robotoBold` })
                ctx.font = '40px "robotoBold"'
                ctx.fillStyle = `#F8F8F8`
                ctx.fillText(`${interaction.user.username}\nè entrato nel server!\nSei il nostro ${users} utente!`, 450, 100)
                let embed = new Discord.MessageEmbed()
                    .setDescription(`👋🏻 Ciao ${interaction.member.toString()}, benvenuto in ${interaction.member.guild.name} \n👀 Sei il nostro **${users}** membro!\n📜 Leggi le <#698178808011948032> e rispettale 😉\n🌐 Puoi vedere tutte le info del sever in <#813476709731008532>`)
                    .setImage(`attachment://Welcome.png`)
                    .setColor(`YELLOW`)
                await client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)] })
                database.collection(`UserStats`).find({ id: interaction.member.id }).toArray(function (err, result) {
                    if (!result[0]) {
                        database.collection(`UserStats`).insertOne({
                            username: interaction.member.user.username, id: interaction.member.id, roles: interaction.member._roles, moderation: {}, leavedAt: 0
                        })
                    } else if (result[0]) {
                        result[0].roles.forEach(role => {
                            if (role == config.idruoli.serverbooster || role == config.idruoli.unverified) return
                            interaction.member.roles.add(role)
                        })
                    }
                })
                interaction.member.roles.remove(config.idruoli.unverified)
                interaction.member.roles.add(config.idruoli.fan)
                return
            } else {
                interaction.reply({ content: `<a:error:966371274853089280> C'è stato un problema con la tua verifica, riprova tra un'ora`, ephemeral: true })
                interaction.member.timeout(1000 * 60 * 60)
            }
        }
        if (interaction.customId == `Verify`) {
            if (!interaction.member.roles.cache.has(config.idruoli.unverified)) {
                interaction.reply({ content: `<a:error:966371274853089280> Sei già verificato!`, ephemeral: true })
                return
            }
            if (new Date().getHours() >= 22 || new Date().getHours() <= 8) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`VERIFICA SOSPETTA`)
                    .setDescription(`Salve,\ndato che si sta verificando durante un **orario in cui il server è poco frequentato**, la sua verifica è **sospetta**, pertanto le chiediamo di risolvere questo **piccolo captcha**.\n\nPrema il pulsante qui sotto`)
                    .setColor(`RED`)
                let button = new Discord.MessageButton()
                    .setStyle(`SECONDARY`)
                    .setCustomId(`SuspiciousVerify`)
                    .setLabel(`Clicca Qui`)
                let row = new Discord.MessageActionRow()
                    .addComponents(button)
                interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
                return
            }
            await interaction.reply({ content: `<a:checkmark:970022827866611762> Sei stato verificato!`, ephemeral: true })
            let bots = client.guilds.cache.get(config.idServer.idServer).members.cache.filter(member => member.user.bot).size;
            let users = client.guilds.cache.get(config.idServer.idServer).memberCount - bots;
            let canvas = Canvas.createCanvas(1280, 720);
            let ctx = canvas.getContext(`2d`)
            let background = await Canvas.loadImage(`${process.cwd()}/Canvas/img/welcome/image${Math.floor(Math.floor(Math.random() * (7 + 1)))}.png`)
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            let avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: `png` }))
            ctx.drawImage(avatar, 470, 250, 350, 350)
            await Canvas.registerFont(`${process.cwd()}/Canvas/font/robotoBold.ttf`, { family: `robotoBold` })
            ctx.font = '40px "robotoBold"'
            ctx.fillStyle = `#F8F8F8`
            ctx.fillText(`${interaction.user.username}\nè entrato nel server!\nSei il nostro ${users} utente!`, 450, 100)
            let embed = new Discord.MessageEmbed()
                .setDescription(`👋🏻 Ciao ${interaction.member.toString()}, benvenuto in ${interaction.member.guild.name} \n👀 Sei il nostro **${users}** membro!\n📜 Leggi le <#698178808011948032> e rispettale 😉\n🌐 Puoi vedere tutte le info del sever in <#813476709731008532>`)
                .setImage(`attachment://Welcome.png`)
                .setColor(`YELLOW`)
            await client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)] })
            database.collection(`UserStats`).find({ id: interaction.member.id }).toArray(function (err, result) {
                if (!result[0]) {
                    database.collection(`UserStats`).insertOne({
                        username: interaction.member.user.username, id: interaction.member.id, roles: interaction.member._roles, moderation: {}, leavedAt: 0
                    })
                } else if (result[0]) {
                    result[0].roles.forEach(role => {
                        if (role == config.idruoli.serverbooster || role == config.idruoli.unverified) return
                        interaction.member.roles.add(role)
                    })
                }
            })
            interaction.member.roles.remove(config.idruoli.unverified)
            interaction.member.roles.add(config.idruoli.fan)
        }
    }
}