const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = function unmute() {
    database.collection(`UserStats`).find().toArray(function (err, result) {
        result.forEach(async r => {
            if (r?.moderation.type == `tempmuted`) {
                if (r.moderation.time - new Date().getTime() <= 0) {

                    let user = client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == r.id);
                    if (!user) return;

                    await database.collection(`UserStats`).updateOne({ id: r.id }, {
                        $set: { moderation: {} }
                    });

                    user.roles.remove(config.rolesid.tempmuted);

                    let embed3 = new Discord.MessageEmbed()
                        .setTitle(`🔊 UNMUTE 🔊`)
                        .setColor(`GREEN`)
                        .setThumbnail(user.displayAvatarURL({ dynamic: true, format: `png`, size: 512 }))
                        .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                        .addField(`🔨 Moderatore:`, `Nome: **${client.user.username}**, ID: **${client.user.id}**\n||${client.user.toString()}||`)
                        .addField(`👤 Utente:`, `Nome: **${r.username}**, ID: **${user.id}**\n||${user.toString()}||`);
                    client.channels.cache.get(config.channelsid.logs.moderation.unmute).send({ embeds: [embed3] });
                    return;
                }
            }
        })
    })
}