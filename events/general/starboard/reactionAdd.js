const config = require(`../../../JSON/config.json`);

module.exports = {
    name: `messageReactionAdd`,
    async execute(reaction, user) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(user.id)) return;

        const message = await client.channels.cache.get(reaction.message.channelId).messages.fetch(reaction.message.id);

        if (reaction._emoji.name != `⭐`) return;

        let reactionsNumber = (await message.reactions.cache.find(x => x._emoji.name == `⭐`).users.fetch()).map(user => user.id);
        reactionsNumber = reactionsNumber.length;

        if (reactionsNumber <= 2) return;

        let found = false;
        let sentMessage;
        serverstats.starboard.forEach(e => {
            if (e.messageId == message.id) {
                found = true;
                sentMessage = e;
            }
        })

        if (found) {

            let embed = await client.channels.cache.get(config.channelsid.starboard).messages.fetch(sentMessage.botMessageId)
            embed = embed.embeds[0];

            embed.fields[1].value = reactionsNumber.toString();

            client.channels.cache.get(config.channelsid.starboard).messages.fetch(sentMessage.botMessageId).then(m => {
                m.edit({ embeds: [embed] });
            });
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`🌟 Messaggio Starboard 🌟`)
            .addField(`💬 Messaggio:`, `${message.content?.length > 1024 - 109 - 3 ? message.content.slice(0, (1024 - 109 - 3)) + `...` : message.content}\n\n[Vai al messaggio](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
            .addField(`⭐ Stelle:`, reactionsNumber.toString())
            .addField(`👤 Autore:`, message.author.toString())
            .setColor(`#ffbf00`)
            .setThumbnail(message.member.displayAvatarURL({ dynamic: true }));

        if (message.attachments.size > 0) {

            let attachment;

            message.attachments.forEach(e => {

                if (!e.contentType.includes(`image`)) return;
                attachment = e.url
            })


            if (attachment) {
                embed.setImage(attachment);
            }


        }

        client.channels.cache.get(config.channelsid.starboard).send({ embeds: [embed] }).then(m => {

            database.collection(`ServerStats`).updateOne({}, {
                $push: {
                    'starboard': {
                        messageId: message.id,
                        botMessageId: m.id,
                        author: message.author.id
                    }
                }
            });

        });
    }
}