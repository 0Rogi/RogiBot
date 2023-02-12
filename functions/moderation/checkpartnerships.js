const config = require(`${process.cwd()}/JSON/config.json`);
const moment = require(`moment`);

module.exports = function checkpartnerships() {
    serverstats.partnerships.forEach(async p => {
        const user = client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == p.user);
        if (!user) {
            client.channels.cache.get(config.channelsid.partnership).messages.fetch(p.message1).then(m => m.delete());
            client.channels.cache.get(config.channelsid.partnership).messages.fetch(p.message2).then(m => m.delete());
            database.collection(`ServerStats`).updateOne({}, { $pull: { "partnerships": { user: p.user } } });
            let moderator = await client.users.fetch(p.executor);
            let embed = new Discord.MessageEmbed()
                .setTitle(`❌ PARTNERSHIP ANNULLATA ❌`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤 Utente:`, `Nome: **${p.user.user.username}** - ID: **${p.user.user.id}**\n||${p.user.toString()}||`)
                .addField(`🔨 Moderatore:`, `Nome: **${moderator.username}** - ID: **${moderator.id}**\n||${moderator.toString()}||`)
                .addField(`🏠 Server:`, `**${p.server.toUpperCase()}**`)
                .setThumbnail(p.user.displayAvatarURL({ dynamic: true }))
                .setColor(`RED`);
            client.channels.cache.get(config.channelsid.logs.partnership.leftedpartnership).send({ embeds: [embed] });
        }
    })
}