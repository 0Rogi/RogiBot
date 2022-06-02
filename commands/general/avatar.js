module.exports = {
    name: `avatar`,
    data: {
        name: `avatar`,
        description: `Mostra l'avatar di un utente`,
        options: [
            {
                name: `utente`,
                description: `L'utente di cui mostrare l'avatar`,
                type: `USER`,
                required: false
            }
        ],
    },
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(() => {
            let date = new Date()
            if (date.getMonth() == 3 && date.getDate() == 1) {
                let embed = new Discord.MessageEmbed()
                    .setImage(`https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif`)
                    .setColor(`YELLOW`)
                interaction.editReply({ embeds: [embed] })
                setTimeout(() => {
                    let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id) || interaction.member
                    let avatar = user.displayAvatarURL({ dynamic: true, size: 512 })
                    let avatarjpeg = user.displayAvatarURL({ dynamic: true, size: 512, format: `jpeg` })
                    let avatarpng = user.displayAvatarURL({ dynamic: true, size: 512, format: `png` })
                    let avatarwebp = user.displayAvatarURL({ dynamic: true, size: 512, format: `webp` })
                    let avatargif = user.displayAvatarURL({ dynamic: true, size: 512, format: `gif` })
                    user.displayAvatarURL({ dynamic: true, size: 512 })
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Avatar di ${user.user.username}`)
                        .setImage(avatar)
                        .setColor(`YELLOW`)
                        .setDescription(`Altri formati: [**.jpeg**](${avatarjpeg}) [**.png**](${avatarpng}) [**.webp**](${avatarwebp}) [**.gif**](${avatargif})`)
                    interaction.editReply({ embeds: [embed] })
                }, 1000 * 10)
                return
            }
            let user = interaction.guild.members.cache.find(x => x.id == interaction.options.getUser(`utente`)?.id) || interaction.member
            let avatar = user.displayAvatarURL({ dynamic: true, size: 512 })
            let avatarjpeg = user.displayAvatarURL({ dynamic: true, size: 512, format: `jpeg` })
            let avatarpng = user.displayAvatarURL({ dynamic: true, size: 512, format: `png` })
            let avatarwebp = user.displayAvatarURL({ dynamic: true, size: 512, format: `webp` })
            let avatargif = user.displayAvatarURL({ dynamic: true, size: 512, format: `gif` })
            user.displayAvatarURL({ dynamic: true, size: 512 })
            let embed = new Discord.MessageEmbed()
                .setTitle(`Avatar di ${user.user.username}`)
                .setImage(avatar)
                .setColor(`YELLOW`)
                .setDescription(`Altri formati: [**.jpeg**](${avatarjpeg}) [**.png**](${avatarpng}) [**.webp**](${avatarwebp}) [**.gif**](${avatargif})`)
            interaction.editReply({ embeds: [embed] })
        })
    }
}