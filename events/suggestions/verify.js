const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (!interaction.isButton() || interaction.guild != config.idServer.idServerLogs) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (interaction.customId == `SuggestAccept` || interaction.customId == `SuggestRefuse`) {
            if (!interaction.member.roles.cache.has(`966265476193861673`) && !interaction.member.roles.cache.has(`966265909075402812`)) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Non hai il permesso`)
                    .setDescription(`Devi essere almeno <@&966265909075402812> per accettare/rifiutare un suggerimento`)
                    .setColor(`RED`)
                interaction.reply({ embeds: [embed], ephemeral: true })
                return
            }
            let embed = interaction.message.embeds[0]
            if (!embed) return interaction.deferUpdate()
            let embed1 = new Discord.MessageEmbed()
                .setTitle(embed.title.toString())
                .setDescription(embed.description)
                .setThumbnail(embed.thumbnail.url)
            if (interaction.customId == `SuggestAccept`) {
                embed1.addField(`📉Stato:`, `🟢Accettato da ${interaction.member.toString()}`)
                embed1.setColor(`GREEN`)
                client.channels.cache.get(config.channelsid.suggest)
                let userid = embed.footer.text.slice(9)

                database.collection(`UserStats`).updateOne({ id: userid }, {
                    $inc: {
                        acceptedsuggests: 1,
                    }
                })

                let user = client.users.cache.get(userid)
                if (!user) return
                let embeduser = new Discord.MessageEmbed()
                    .setTitle(`💡Suggerimento Accettato💡`)
                    .setDescription(`${user.toString()} il tuo suggerimento è stato __accettato__ da ${interaction.member.toString()}!`)
                    .addField(`Suggerimento:`, interaction.message.embeds[0].fields[1].value.toString())
                    .setColor(`GREEN`)
                user.send({ embeds: [embeduser] }).catch(() => { })
                let embedsuggestion = new Discord.MessageEmbed()
                    .setTitle(`Suggerimento da ${user.username}`)
                    .setDescription(`**Suggerimento:** ${interaction.message.embeds[0].fields[1].value.toString()}`)
                    .setThumbnail(embed.thumbnail.url)
                    .setColor(`#2f3136`)
                client.channels.cache.get(config.channelsid.suggestions).send({ embeds: [embedsuggestion] }).then(msg => {
                    msg.react(`👍`)
                    msg.react(`👎`)
                })
            }
            if (interaction.customId == `SuggestRefuse`) {
                embed1.addField(`📉Stato:`, `🔴Rifiutato da ${interaction.member.toString()}`)
                embed1.setColor(`RED`)
                let userid = embed.footer.text.slice(9)
                let user = client.users.cache.get(userid)
                if (!user) return
                let embeduser = new Discord.MessageEmbed()
                    .setTitle(`💡Suggerimento Rifiutato💡`)
                    .setDescription(`${user.toString()} il tuo suggerimento è stato __rifiutato__ da ${interaction.member.toString()}!`)
                    .addField(`Suggerimento:`, interaction.message.embeds[0].fields[1].value.toString())
                    .setColor(`RED`)
                user.send({ embeds: [embeduser] }).catch(() => { })
            }
            embed1.addField(`💡Suggerimento:`, embed.fields[1].value.toString())
            interaction.update({ components: [], embeds: [embed1] })
        }
    }
}