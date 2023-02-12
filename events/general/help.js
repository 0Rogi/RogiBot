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
                    .setDescription(`**/avatar**\n*Mostra l'avatar di un utente*\n**/bugreport**\n*Segnala un bug*\n**/clearsnipe <:StaffTag:1032334168371245136>**\n*Nasconde da /snipe l'ultimo messaggio eliminato*\n**/help**\n*Mostra tutti i comandi del bot*\n**/snipe <:LevellingTag:1032335296332832779>**\n*Mostra l'ultimo messaggio eliminato nel server*\n**/suggestion**\n*Proponi un suggerimento*\n**/test**\n*Controlla che i bot funzionino*\n**/time**\n*Mostra l'ora attuale*\n**/tts**\n*Fa parlare il bot in vocale*\n**/videonotification**\n*Mette/Toglie il ruolo <@&1028664506391466024>*\n**/github**\n*Mostra il profilo github di Rogi*\n**/instagram**\n*Mostra il profilo instagram di Rogi*\n**/invite**\n*Mostra l'invito di questo server*\n**/tiktok**\n*Mostra il profilo tiktok di Rogi*\n**/youtube**\n*Mostra il canale youtube di Rogi*`)
            } break
            case `fun`: {
                embed
                    .setTitle(`😂 Comandi di Divertimento 😂`)
                    .setDescription(`**/cset <:StaffTag:1032334168371245136>**\n*Imposta un nuovo numero in counting*\n**/cstats**\n*Mostra le informazioni sul counting*\n**/embed <:LevellingTag:1032335296332832779>**\n*Trasforma il tuo messaggio in un embed*\n**/emojify <:LevellingTag:1032335296332832779>**\n*Trasforma il tuo messaggio in emoji*\n**/lyrics <:LevellingTag:1032335296332832779>**\n*Cerca il testo di una canzone*\n**/meme**\n*Mostra un meme da reddit*\n**/rps <:LevellingTag:1032335296332832779>**\n*Gioca a sasso, carta, forbice con il bot*\n**/say**\n*Fa dire qualcosa al bot*\n**/translate <:LevellingTag:1032335296332832779>**\n*Traduce in italiano un messaggio*\n**/skin**\n*Cerca la skin di minecraft di un utente premium*`)
            } break
            case `moderation`: {
                embed
                    .setTitle(`🔨 Comandi di Moderazione 🔨`)
                    .setDescription(`**/ban <:StaffTag:1032334168371245136>**\n*Bandisce un utente dal server*\n**/banwave <:StaffTag:1032334168371245136>**\n*Bandisce fino a 5 utenti contemporaneamente dal server*\n**/kick <:StaffTag:1032334168371245136>**\n*Espelle un utente dal server*\n**/mute <:StaffTag:1032334168371245136>**\n*Muta un utente nel server*\n**/tempmute <:StaffTag:1032334168371245136>**\n*Muta temporaneamente un utente nel server*\n**/unban <:StaffTag:1032334168371245136>**\n*Sbanna un utente dal server*\n**/unmute <:StaffTag:1032334168371245136>**\n*Smuta un utente mutato nel server*\n**/backup <:StaffTag:1032334168371245136>**\n*Esegue un backup del database*\n**/clear <:StaffTag:1032334168371245136>**\n*Cancella dei messaggi*\n**/emojisteal <:StaffTag:1032334168371245136>**\nRuba un'emoji e la crea qui\n**/lock <:StaffTag:1032334168371245136>**\n*Blocca un canale*\n**/lockdown <:StaffTag:1032334168371245136>**\n*Attiva il sistema di lockdown del server*\n**/partner <:StaffTag:1032334168371245136>**\n*Esegue una partnership*\n**/slowmode <:StaffTag:1032334168371245136>**\n*Cambia la slowmode di un canale*`)
            } break
            case `owner`: {
                embed
                    .setTitle(`👑 Comandi Utilizzabili SOLO dall'Owner 👑`)
                    .setDescription(`**/eval <:StaffTag:1032334168371245136>**\n*Esegue un codice JavaScript*\n**/restart <:StaffTag:1032334168371245136>**\n*Restarta il BOT*\n**/shutdown <:StaffTag:1032334168371245136>**\n*Spegne il BOT*\n**/maintenance <:StaffTag:1032334168371245136>**\n*Imposta lo stato di manutenzione del bot*\n**/setevent <:StaffTag:1032334168371245136>**\n*Imposta un evento all'interno del server*`)
            } break
            case `statistics`: {
                embed
                    .setTitle(`📈 Comandi per Mostrare Statistiche 📈`)
                    .setDescription(`**/channelinfo**\n*Mostra informazioni su un canale del server*\n**/roleinfo**\n*Mostra informazioni su un ruolo del server*\n**/serverinfo**\n*Mostra informazioni sul server*\n**/userinfo**\n*Mostra informazioni su un utente*`)
            } break
            case `ticket`: {
                embed
                    .setTitle(`🎫 Comandi dei Ticket 🎫`)
                    .setDescription(`**/tadd <:StaffTag:1032334168371245136>**\n*Aggiunge un utente ad un ticket*\n**/tclose**\n*Chiude un ticket*\n**/tremove <:StaffTag:1032334168371245136>**\n*Rimuove un utente da un ticket*`)
            } break
            case `prooms`: {
                embed
                    .setTitle(`🔐 Comandi delle Stanze Private 🔐`)
                    .setDescription(`**/pdelete**\n*Elimina le tue stanze private*\n**/pname**\n*Imposta il nome per le tue stanze private*\n**/ptopic**\n*Imposta la descrizione per le tue stanze private*\n**/puser**\n*Aggiunge/Rimuove utenti dalle tue stanze private*`)
            } break
        }
        interaction.update({ embeds: [embed] })
    }
}