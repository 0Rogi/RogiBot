const config = require(`${process.cwd()}/JSON/config.json`)
const Canvas = require(`canvas`)
const adduser = require(`${process.cwd()}/functions/database/adduser.js`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `Verify`) {
            if (!interaction.member.roles.cache.has(config.idruoli.unverified)) {
                interaction.reply({ content: `<a:error:966371274853089280> Sei già verificato!`, ephemeral: true })
                return
            }
            await interaction.reply({ content: `<a:checkmark:970022827866611762> Sei stato verificato!`, ephemeral: true })

            let bots = client.guilds.cache.get(config.idServer.idServer).members.cache.filter(member => member.user.bot).size;
            let users = client.guilds.cache.get(config.idServer.idServer).memberCount - bots;
            let canvas = Canvas.createCanvas(1280, 720);
            let ctx = canvas.getContext(`2d`);
            let background = await Canvas.loadImage(`./Canvas/img/WelcomeImage.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            let avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: `png` }))
            ctx.drawImage(avatar, 470, 250, 350, 350);
            await Canvas.registerFont(`${process.cwd()}/Canvas/font/robotoBold.ttf`, { family: `robotoBold` })
            ctx.font = '40px "robotoBold"'
            ctx.fillStyle = `#F8F8F8`;
            ctx.fillText(`${interaction.user.tag}\nè entrato nel server!\nSei il nostro ${users} utente!`, 450, 100)

            let embed = new Discord.MessageEmbed()
                .setDescription(`👋🏻Ciao ${interaction.member.toString()}, benvenuto in ${interaction.member.guild.name}\n👀Sei il nostro ${users} membro!\n📜Leggi il <#698178808011948032> e rispetta le regole 😉\n🚨Puoi vedere tutte le info del sever in <#813476709731008532>`)
                .setImage(`attachment://Welcome.png`)
                .setColor(`YELLOW`)
            await client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)] })

            database.collection(`users`).find({ id: interaction.member.id }).toArray(function (err, result) {
                if (!result[0]) {
                    adduser(interaction.member)
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