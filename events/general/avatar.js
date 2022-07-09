const config = require(`${process.cwd()}/JSON/config.json`)
const Canvas = require(`canvas`)

module.exports = {
    name: `interactionCreate`,
    async execute(interaction) {
        if (!interaction.isButton()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId.startsWith(`showbanner`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })

            let banner
            let user = await client.api.users(interaction.customId.split(`,`)[2]).get()
            if (!user) return interaction.deferUpdate()
            if (user.banner) {
                banner = `https://cdn.discordapp.com/banners/${user.id}/${user.banner}?size=4096`
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(`Banner di ${user.username}`)
                .setImage(banner)
                .setColor(`YELLOW`)
            let button1 = new Discord.MessageButton()
                .setLabel(`Vedi Avatar`)
                .setStyle(`PRIMARY`)
                .setCustomId(`showavatar,${interaction.member.id},${user.id}`)
            let button2 = new Discord.MessageButton()
                .setLabel(`Vedi Server Avatar`)
                .setStyle(`PRIMARY`)
                .setCustomId(`serveravatar,${interaction.member.id}`)
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            if (!banner) {
                if (user.banner_color) {
                    let canvas = await Canvas.createCanvas(1024, 408)
                    let ctx = await canvas.getContext('2d')

                    ctx.fillStyle = user.banner_color
                    ctx.fillRect(0, 0, canvas.width, canvas.height)

                    embed.setImage(`attachment://banner.png`)

                    interaction.update({ embeds: [embed], components: [row], files: [new Discord.MessageAttachment(canvas.toBuffer(), `banner.png`)] })
                    return
                }
                if (!user.banner_color) {
                    embed.setDescription(`Quest'utente non ha impostato nessun banner 🙁`)
                }
            }
            interaction.update({ embeds: [embed], components: [row] })
        }
        if (interaction.customId.startsWith(`showavatar`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })
            let user = client.users.cache.get(interaction.customId.split(`,`)[2]) || interaction.user
            let guildmember = interaction.guild.members.cache.find(x => x.id == interaction.customId.split(`,`)[2]) || interaction.member
            user.displayAvatarURL({ dynamic: true, size: 512 })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Avatar di ${user.username}`)
                .setImage(user?.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(`YELLOW`)
                .setDescription(`Altri formati: [**.jpeg**](${user.displayAvatarURL({ dynamic: true, size: 512, format: `jpeg` })}) [**.png**](${user.displayAvatarURL({ dynamic: true, size: 512, format: `png` })}) [**.webp**](${user.displayAvatarURL({ dynamic: true, size: 512, format: `webp` })}) [**.gif**](${user.displayAvatarURL({ dynamic: true, size: 512, format: `gif` })})`)
            if (guildmember?.displayAvatarURL() != user?.displayAvatarURL()) embed.setThumbnail(guildmember?.displayAvatarURL({ dynamic: true, size: 512 }))
            let button1 = new Discord.MessageButton()
                .setLabel(`Vedi Banner`)
                .setStyle(`PRIMARY`)
                .setCustomId(`showbanner,${interaction.member.id},${user.id}`)
            let button2 = new Discord.MessageButton()
                .setLabel(`Vedi Server Banner`)
                .setStyle(`PRIMARY`)
                .setCustomId(`serverbanner,${interaction.member.id}`)
            let row = new Discord.MessageActionRow()
                .addComponents(button1, button2)
            interaction.update({ embeds: [embed], components: [row], files: [] })
        }
        if (interaction.customId.startsWith(`serveravatar`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Immagine del Server`)
                .setImage(interaction.guild.iconURL({ dynamic: true, size: 512 }))
                .setColor(`YELLOW`)
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
        if (interaction.customId.startsWith(`serverbanner`)) {
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280> Questo non è un tuo pulsante!`, ephemeral: true })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Banner del Server`)
                .setImage(interaction.guild.bannerURL({ dynamic: true, size: 512 }))
                .setColor(`YELLOW`)
            interaction.reply({ embeds: [embed], ephemeral: true })
        }
    }
}