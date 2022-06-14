const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return
        if (!interaction.isSelectMenu()) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

        if (!interaction.customId.startsWith(`Help`)) return
        if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:966371274853089280>Questo non è un tuo menù!`, ephemeral: true })
        let embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
        switch (interaction.values[0]) {
            case `general`: {
                embed
                    .setTitle(`🎡 Comandi Generali 🎡`)
                    .setDescription(`**/avatar**\n*Mostra l'avatar di un utente*\n**/bugreport**\n*Segnala un bug*\n**/clearsnipe**\n*Nasconde da /snipe l'ultimo messaggio eliminato*\n**/coppercraft**\n*Mostra informazioni sulla coppercraft*\n**/help**\n*Mostra tutti i comandi del bot*\n**/snipe**\n*Mostra l'ultimo messaggio eliminato nel server*\n**/suggestion**\n*Proponi un suggerimento*\n**/test**\n*Controlla che i bot funzionino*\n**/time**\n*Mostra l'ora attuale*\n**/github**\n*Mostra il profilo github di Rogi*\n**/instagram**\n*Mostra il profilo instagram di Rogi*\n**/invite**\n*Mostra l'invito di questo server*\n**/tiktok**\n*Mostra il profilo tiktok di Rogi*\n**/youtube**\n*Mostra il canale youtube di Rogi*`)
            } break
            case `fun`: {
                embed
                    .setTitle(`😂 Comandi di Divertimento 😂`)
                    .setDescription(`**/cset**\n*Imposta un nuovo numero in counting*\n**/cstats**\n*Mostra le informazioni sul counting*\n**/embed**\n*Trasforma il tuo messaggio in un embed*\n**/lyrics**\n*Cerca il testo di una canzone*\n**/meme**\n*Mostra un meme da reddit*\n**/rps**\n*Gioca a sasso, carta, forbice con il bot*\n**/say**\n*Fa dire qualcosa al bot*\n**/translate**\n*Traduce in italiano un messaggio*\n**/weather**\n*Mostra il tempo meteorologico di un paese*`)
            } break
            case `moderation`: {
                embed
                    .setTitle(`🔨 Comandi di Moderazione 🔨`)
                    .setDescription(`**/ban**\n*Bandisce un utente dal server*\n**/kick**\n*Espelle un utente dal server*\n**/mute**\n*Muta un utente nel server*\n**/tempmute**\n*Muta temporaneamente un utente nel server*\n**/unban**\n*Sbanna un utente dal server*\n**/unmute**\n*Smuta un utente mutato nel server*\n**/clear**\n*Cancella dei messaggi*\n**/lockdown**\n*Attiva il sistema di lockdown del server*\n**/slowmode**\n*Cambia la slowmode di un canale*`)
            } break
            case `owner`: {
                embed
                    .setTitle(`👑 Comandi Utilizzabili SOLO dall'Owner 👑`)
                    .setDescription(`**/eval**\n*Esegue un codice JavaScript*\n**/restart**\n*Restarta il BOT*\n**/shutdown**\n*Spegne il BOT*\n**/maintenance**\n**Imposta lo stato di manutenzione del bot*`)
            } break
            case `statistics`: {
                embed
                    .setTitle(`📈 Comandi per Mostrare Statistiche 📈`)
                    .setDescription(`**/channelinfo**\n*Mostra informazioni su un canale del server*\n**/roleinfo**\n*Mostra informazioni su un ruolo del server*\n**/serverinfo**\n*Mostra informazioni sul server*\n**/userinfo**\n*Mostra informazioni su un utente*`)
            } break
            case `ticket`: {
                embed
                    .setTitle(`🎫 Comandi dei Ticket 🎫`)
                    .setDescription(`**/tadd**\n*Aggiunge un utente ad un ticket*\n**/tclose**\n*Chiude un ticket*\n**/tremove**\n*Rimuove un utente da un ticket*`)
            } break
        }
        interaction.update({ embeds: [embed] })
    }
}