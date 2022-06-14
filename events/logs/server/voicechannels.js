const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `voiceStateUpdate`,
    async execute(oldState, newState) {
        if (oldState.guild != config.idServer.idServer || newState.guild != config.idServer.idServer) return
        if (!oldState.channelId && newState.channelId) {

            if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(newState.id)) return
            if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(newState.id)) return

            let embed = new Discord.MessageEmbed()
                .setTitle(`📥 Utente Entrato 📥`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👥 Utente:`, `Nome: ${client.users.cache.get(newState.id).toString()} ID: **${newState.id}**`)
                .addField(`🔊 Canale:`, client.channels.cache.get(newState.channelId).name || newState.id)
                .setColor(`YELLOW`)
            client.channels.cache.get(config.idcanali.logs.server.voicechannels).send({ embeds: [embed] })
            return
        }
        if (oldState.channelId && !newState.channelId) {

            if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(oldState.id)) return
            if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(oldState.id)) return

            let embed = new Discord.MessageEmbed()
                .setTitle(`📤 Utente Disconnesso 📤`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👥 Utente:`, `Nome: ${client.users.cache.get(oldState.id).toString()} ID: **${oldState.id}**`)
                .addField(`🔊 Canale:`, client.channels.cache.get(oldState.channelId).name || oldState.id)
                .setColor(`ORANGE`)
            client.channels.cache.get(config.idcanali.logs.server.voicechannels).send({ embeds: [embed] })
            return
        }
        if (oldState.channelId != newState.channelId) {

            if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(oldState.id)) return
            if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(oldState.id)) return

            let embed = new Discord.MessageEmbed()
                .setTitle(`🚗 Utente Spostato 🚗`)
                .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
                .addField(`👥 Utente:`, `Nome: ${client.users.cache.get(oldState.id).toString()} ID: **${oldState.id}**`)
                .addField(`🔊 Vecchio Canale:`, client.channels.cache.get(oldState.channelId).name ? `#${client.channels.cache.get(oldState.channelId).name}` : oldState.channelId)
                .addField(`🔊 Nuovo Canale:`, client.channels.cache.get(newState.channelId).name ? `#${client.channels.cache.get(newState.channelId).name}` : newState.channelId)
                .setColor(`ORANGE`)
            client.channels.cache.get(config.idcanali.logs.server.voicechannels).send({ embeds: [embed] })
        }
    }
}