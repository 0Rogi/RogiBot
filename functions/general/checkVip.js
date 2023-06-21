const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`);

module.exports = async function checkVip() {

    serverstats.coppercraftvip?.forEach(u => {
        let stillBoost = true;
        const user = client.guilds.cache.get(config.idServer.idServer).members.cache.find(x => x.id == u.id);

        if (!user) stillBoost = false;
        if (!user.roles.cache.has(config.rolesid.serverbooster)) stillBoost = false;

        if (!stillBoost) {
            client.channels.cache.get(`1118947905961721939`).send(`lp user ${u.nickname} parent clear`);
            client.channels.cache.get(`1118947905961721939`).send(`tellraw @a {"text": "${user.user.username}${user.user.discriminator != `0` ? `#` + user.user.discriminator : ``} ha smesso di boostare il server, ${u.nickname} ha perso il VIP!", "color": "red"}`);

            database.collection(`ServerStats`).updateOne({}, {
                $pull: {
                    'coppercraftvip': {
                        id: u.id
                    }
                }
            });

            let logEmbed = new Discord.MessageEmbed()
                .setTitle(`💎 VIP PERSO 💎`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👤 Utente:`, `Nome: **${u.username}**, ID: **${u.id}**`)
                .addField(`🪪 Nickname:`, u.nickname)
                .setColor(`RED`);
            client.channels.cache.get(`1119298541022621906`).send({ embeds: [logEmbed] });

            const embedChat = new Discord.MessageEmbed()
                .setColor(`#2B2D31`)
                .setAuthor({
                    name: `💎 ${u.nickname} ha perso il VIP 💎`, iconURL: `https://minotar.net/helm/${u.nickname}/128.png`
                });
            client2.channels.cache.get(`1121088737703633127`).send({ embeds: [embedChat] });
        }
    });
}