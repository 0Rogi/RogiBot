module.exports = {
    name: `cstats`,
    data: {
        name: `cstats`,
        description: `Mostra le statistiche del server sul counting`
    },
    permissionlevel: 0,
    execute(interaction) {
        interaction.deferReply().then(async () => {
            let lastuser = serverstats.counting.lastuser
            if (lastuser != null) {
                let fetched = await client.users.fetch(lastuser).catch(() => { return })
                if (!fetched) lastuser = lastuser = `_Nessun Utente_`
                if (fetched) lastuser = `${fetched.username} - ${fetched.id}`
            }
            if (lastuser == null || !lastuser) lastuser = `_Nessun Utente_`
            let embed = new Discord.MessageEmbed()
                .setTitle(`💯 Statistiche Counting 💯`)
                .addField(`👤 Ultimo utente:`, lastuser, true)
                .addField(`🔢 Numero Attuale:`, serverstats.counting.currentnumber.toString(), true)
                .addField(`🏅 Record Attuale:`, serverstats.counting.bestnumber.toString(), true)
                .setColor(`YELLOW`)
                .setThumbnail(`https://i.imgur.com/yhlJWRw.png`)
            interaction.editReply({ embeds: [embed] })
        })
    }
}