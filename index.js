/*const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("hello hell!")
})

app.listen(3000, () => {
  console.log("Project is ready")
})*/
//Codice da inserire su replit:
const Discord = require("discord.js");
const Canvas = require("canvas");
const ytch = require('yt-channel-info');
const moment = require("moment");
const bot = new Discord.Client();
const { getInfo } = require('ytdl-getinfo')
bot.login("ODEzNDM5NDQ0NDE3NzczNjM5.YDPUhA.nlUrBqLVSy5UPUh7yajhBLXJ4SU");
require('events').EventEmitter.prototype._maxListeners = 100;
const { Collection } = require("discord.js")
const voiceCollection = new Collection()
//Bot Start
bot.on('ready', () =>{
    console.log("Rogi Bot è stato attivato!")
    const on = new Discord.MessageEmbed()
    .setTitle("ONLINE")
    .setColor("GREEN")
    .setDescription("<:RogiBot:854792536694587434>Sono online!<:RogiBot:854792536694587434>")
    .setTimestamp()
    bot.channels.cache.get(`905099873664237568`).send({embeds: [on]})
    bot.user.setActivity("!help")

})
//Embed generali
const Noperm = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Errore") 
            .setDescription(":x: **Non hai il permesso**")
            .setThumbnail("https://i.imgur.com/lRLRIr4.png")
            .setTimestamp()
//Commands
bot.on("message", (message) => {
    if(message.author.bot || !message.guild) return
    //Controllare se il comando è in #commands
    if (message.content.startsWith("!") && message.channel != "826014465186332682" && !message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(":x: Non puoi usare i bot qui, usali in <#826014465186332682>")
        .setColor("#ff0000")
        .setTitle("Errore")
        .setThumbnail("https://i.imgur.com/lRLRIr4.png")
        .setTimestamp()).then(msg => {
          msg.delete( { timeout: 2000 })
        })
        message.delete( { timeout: 2000 })
        return
    }
    //Youtube
    if (message.content == "!youtube" || message.content == "!yt") {
        console.log(message.author.tag + " Ha eseguito il comando !youtube")
        var youtubeembed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("Clicca qui")
        .setThumbnail("https://i.imgur.com/vEHGQrx.png")
        .setURL("https://tinyurl.com/RogiYT")
        .setDescription(":love_you_gesture: Questo è il canale youtube **RodariRogi23**\rIscriviti, lascia like, e attiva la campanellina");
        message.channel.send(youtubeembed)
    }
    //Telegram
    if (message.content == "!telegram"  || message.content == "!tel") {
        console.log(message.author.tag + " Ha eseguito il comando !telegram")
        var telegramembed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("Clicca qui!")
        .setURL("https://t.me/RodariRogi23")
        .setThumbnail("https://i.imgur.com/vEHGQrx.png")
        .setDescription("**Questo è il gruppo telegram di RodariRogi23!**");
        message.channel.send(telegramembed)
    }
    //Instagram
    if (message.content == "!instagram"  || message.content == "!ig"  || message.content == "!insta") {
        var instagramembed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("Clicca qui")
        .setURL("https://tinyurl.com/Rogi-IG")
        .setThumbnail("https://i.imgur.com/vEHGQrx.png")
        .setDescription("**Questo è il profilo instagram di RodariRogi23, seguilo e metti mi piace ai post!! ;D**");
        message.channel.send(instagramembed)
        console.log(message.author.tag + " Ha eseguito il comando !instagram")
    }
    //Villager Bot
    if (message.content == "!villager-bot" || message.content == "!villagerbot" || message.content == "!vlb") {
        console.log(message.author.tag + " Ha eseguito il comando !vilalger-bot")
        var villagerbotembed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("!villager-bot")
        .setThumbnail("https://i.imgur.com/vEHGQrx.png")
        .setTimestamp()
        .setDescription("Villager è un bot che permette di giocare a minecraft tramite discord!! Non è fantastico? La moneta di questo bot sono gli smeraldi! Come si ottengono?? Devi scavare scrivendo: **/mine**. In questo modo potrai scavare e avrai una probabilità di trovare smeraldi. Se trovi degli oggetti questi si possono vendere usando il comando: **/sell [Quantità] [Nome dell’oggetto]**. Puoi anche sfidare gli altri utenti con il comando **/battle @[nome dell’utente]** oppure con **/duel @[nome dell’utente]**. Come faccio a vedere quanti smeraldi ho? Puoi vederlo con **/balance**, se vuoi scoprire quanti smeraldi ha una persona specifica usa: **/balance @[Nome dell’utente]**. Puoi anche regalare smeraldi o oggetti con il comando **/give @[Nome dell’utente] [numero]** puoi dare degli smeraldi, se vuoi regalare degli oggetti usa il comando: **/giveitem @[Nome dell’utente] [Numero] [Oggetto]**. Puoi perfino sfidarti con il bot con il comando **/gamble [Numero di smeraldi]** così potrai sfidare gli smeraldi e potrai vincerli o perderli!! Puoi farlo anche con gli utenti **/pillage @[nome utente]** FUNZIONA SOLO SE ENTRAMBI HANNO 64 SMERALDI NELL'INVENTARIO. Con gli smeraldi guadagnati potrai comprare gli oggetti dal negozio usando **/shop pickaxes** per i picconi, **/shop magic** per libri incantati e pozioni, **/shop other** per altri oggetti. Se vuoi nascondere agli altri quanti smeraldi hai puoi tramutarli in blocchi di smeraldo e metterli nella tua personale cassaforte con il comando: **/deposit [Numero di blocchi che riesci a creare con i tuoi smeraldi]**. Per riprenderlo usa il comando: **/withdraw [Numero blocchi]** e potrai rimetterli nell’inventario e usarli per vendere. In fine con **/chung [Nome della pozione]** potrai bere una delle pozioni che hai trovato scavando (se le hai trovate) oppure puoi anche venderle.  Conosci Minecraft maledetto? Bene puoi usare il comando **/cursed** per vedere delle immagini maledette di Minecraft!");
        message.channel.send(villagerbotembed)
    }
    //Invito
    if (message.content == "!invito" || message.content == "!nvite") {
        var invitoembed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("!invito")
        .setThumbnail("https://i.imgur.com/vEHGQrx.png")
        .setTimestamp()
        .setDescription("**Vuoi far entrare un tuo amico ma non sai come fare? Dagli questo link e lui potrà entrare!**\r\rhttps://discord.gg/cRXca9N5Kv");
        message.channel.send(invitoembed)
        console.log(message.author.tag + " Ha eseguito il comando !invito")
    }
    //Commands-2
    if (message.content == "!commands-2") {
        console.log(message.author.tag + " Ha eseguito il comando !commands-2")
        var comandi2embed = new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setTitle("!commands-2")
        .setThumbnail("https://i.imgur.com/vEHGQrx.png")
        .setTimestamp()
        .setDescription("Questi sono i comandi utilizzabili sono dagli staffer\r!warn @(nome dell'utente) **MANDA UN’INFRAZIONE ALL' UTENTE SELEZIONATO**\r!infractions  @(nome dell'utente) **VEDI QUANTE INFRAZIONI HA L'UTENTE SELEZIONATO**\r!mute @(nome dell'utente) **MUTA L'UTENTE SELEZIONATO**\r!unmute @(nome dell'utente) **SMUTA L'UTENTE SELEZIONATO**\r!kick @(nome dell'utente) **CESPELLE L'UTENTE SELEZIONATO** \r!clear (numero di messaggi) **CANCELLA I MESSAGGI**\r!ban @(nome dell'utente) **BANNA L'UTENTE SELEZIONATO**\r!unban @(nome dell'utente) **SBANNA L'UTENTE SELEZIONATO**");
        message.channel.send(comandi2embed)
    }
    //Primo comando in assoluto
    if (message.content == "!comando"){
        console.log(message.author.tag + " Ha eseguito il comando !comando")
        message.channel.send("Secondo te, questo comando fa davvero qualcosa?!")
    }
    //Time
    if (message.content == "!time") {
        console.log(message.author.tag + " Ha eseguito il comando !time")
        var data = new Date();
        var ora = data.getHours() + 2;
        var min = data.getMinutes();
        if(min == "0" ||min == "1" || min == "2" || min == "3" || min == "4" || min == "5" || min == "6" || min == "7" || min == "8" || min == "9") {
          var minuti = `0${min}`
          message.channel.send(":alarm_clock:Sono le ore " + ora + ":" + minuti);
          return
        }

        message.channel.send(":alarm_clock:Sono le ore " + ora + ":" + min);
    }
    //Test
    if (message.content == "!test") {
        var testo = "";
        var RogiBot = message.guild.members.cache.get('813439444417773639')
        var RogiMusicBot = message.guild.members.cache.get('839093486728773653')
        var RogiFunBot = message.guild.members.cache.get('846690950931021874')
        var RogiModerationBot = message.guild.members.cache.get('836663677713252403')
        if (RogiBot.presence.status == "online") {
            testo += "<:RogiBot:854792536694587434>RogiBot - ONLINE 🟢\r"
        }
        else {
            testo += "<:RogiBot:854792536694587434>RogiBot - OFFLINE 🔴\r"
        }
        if (RogiMusicBot.presence.status == "online") {
            testo += "<:RogiMusicBot:854792640180912218>RogiMusicBot - ONLINE 🟢\r"
        }
        else {
            testo += "<:RogiMusicBot:854792640180912218>RogiMusicBot - OFFLINE 🔴\r"
        }
        if (RogiFunBot.presence.status == "online") {
            testo += "<:RogiFunBot:854792583490568222>RogiFunBot - ONLINE 🟢\r"
        }
        else {
            testo += "<:RogiFunBot:854792583490568222>RogiFunBot- OFFLINE 🔴\r"
        }
        if (RogiModerationBot.presence.status == "online") {
            testo += "<:RogiModerationBot:854792613504483388>RogiModerationBot - ONLINE 🟢\r"
        }
        else {
            testo += "<:RogiModerationBot:854792613504483388>RogiModerationBot - OFFLINE 🔴\r"
        }
        var embed = new Discord.MessageEmbed()
            .setColor("#78B159")
            .addField("Stato di tutti i bot di Rogi", testo)

        message.channel.send(embed)
    }
    //Friend
    if(message.content.startsWith("!friend")) {
        var friend = message.mentions.members.first()
        if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(Noperm);
            return;
        }
        if(!friend) {
            const InvalidUser = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Errore")
            .setDescription(":x:**Inserisci un utente valido**")
            .setThumbnail("https://i.imgur.com/lRLRIr4.png")
            .setTimestamp()
            message.channel.send(InvalidUser)
            return;
        }
        if(friend.roles.cache.has("823969594670186546")) {
            const Already = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Errore")
            .setDescription(":x: **Questo utente è già amico di rogi!**")
            .setThumbnail("https://i.imgur.com/lRLRIr4.png")
            .setTimestamp()
            message.channel.send(Already)
            return;
        }
        const Friended = new Discord.MessageEmbed()
        .setColor("#25a605")
        .setTitle("Riuscito!")
        .setDescription(":white_check_mark: <@" + friend + "> è ora amico di rogi!")
        .setThumbnail("https://i.imgur.com/P7xHsvc.png")
        .setTimestamp()
        friend.roles.add("823969594670186546")
        friend.roles.add("741619600319578162")
        message.channel.send(Friended)
        friend.send("Adesso sei amico di Rogi nel server `" + message.guild.name + "`")
    }
    //Unfriend
    if(message.content.startsWith("!unfriend")) {
        var friend = message.mentions.members.first()
        if(!message.member.hasPermission("ADMINISTRATOR")){
            message.channel.send(Noperm);
            return;
        }
        if(!friend) {
            const InvalidUser = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Errore")
            .setDescription(":x:**Inserisci un utente valido**")
            .setThumbnail("https://i.imgur.com/lRLRIr4.png")
            .setTimestamp()
            message.channel.send(InvalidUser)
            return;
        }
        if(!friend.roles.cache.has("823969594670186546")) {
            const Already = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Errore")
            .setDescription(":x: **Questo utente non è amico di rogi!**")
            .setThumbnail("https://i.imgur.com/lRLRIr4.png")
            .setTimestamp()
            message.channel.send(Already)
            return;
        }
        const Friended = new Discord.MessageEmbed()
        .setColor("#25a605")
        .setTitle("Riuscito!")
        .setDescription(":white_check_mark: <@" + friend + "> ora non è più amico di rogi!")
        .setThumbnail("https://i.imgur.com/P7xHsvc.png")
        .setTimestamp()
        friend.roles.remove("823969594670186546")
        friend.roles.remove("741619600319578162")
        message.channel.send(Friended)
        friend.send("Non sei più amico di Rogi nel server `" + message.guild.name + "`")
    }
    //Help
    if (message.content == "!help" || message.content  == "!comandi" || message.content  == "!aiuto" || message.content  == "!commands") {
        var totalPage = 7;
        var page = 0;
        var page0 = new Discord.MessageEmbed()
            .setTitle("Tutti i comandi")
            .setDescription("Tutti i comandi di Rogi Discord")
            .setColor("RANDOM")
            .setThumbnail("https://i.imgur.com/c4Jv5R3.png")

            var page1 = new Discord.MessageEmbed()
            .setTitle("Comandi Generali")
            .setDescription("`!youtube` **Alias:** `!yt` Dà il canale youtube di Rogi\r`!telegram` **Alias:** `!tel` Dà il telegram di Rogi\r`!instagram` **Alias:** `!insta !ig` Dà l'instagram di Rogi\r`!invito` **Alias:** `!invite` Dà l'invito del server discord per far entrare vostri amici!\n`!time` Dice l'ora attuale\n`!test` Controlla se tutti i bot di Rogi sono online\n`!serverinfo` Dà le info su questo server\n`!userinfo` Dà le informazioni su un utente taggato o su di te\n`!channelinfo` Dà le informazioni su un canale taggato o su quello dove si scrive\n`!friend/!unfriend` Serve per dare il ruolo <@&823969594670186546> a qualcuno, ma è utilizzabile solo da Rogi\n\n\n:no_entry_sign: **CANALE CONCESSO**\n <#826014465186332682>")
            .setColor("#ffff00")
            .setThumbnail("https://i.imgur.com/5cscZ4o.png")
            .setFooter("Page 1/" + totalPage)

            var page2 = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setTitle("<:Music:865539429641093130>Comandi di Musica<:Music:865539429641093130>")
            .setThumbnail("https://i.imgur.com/Nay7Ik7.png")
            .setDescription("`!play + Canzone` **Alias** `!p + Canzone` Per scegliere una canzone da riprodurre\n`!pause` Per mettere in pausa la canzone\n`!resume` Per disattivare la pausa dalla canzone\n`!leave` **Alias:** `!stop` `!disconnect` Per far uscire il bot dalla chat vocale\n`!skip` **Alias:** `!next` Per skippare una canzone\n`!autoplayon/!autoplayoff` Per disattivare o attivare l'autoplay (Di base è attivato)\n`!queue` Per visualizzare la coda attuale\n\n\n:no_entry_sign: **CANALI CONCESSI**\n<#826014465186332682> <#641309954212495385>")
            .setFooter("Pagina 2/" + totalPage)

            var page3 = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setTitle("Comandi di Divertimento")
            .setThumbnail("https://i.imgur.com/zdwz46z.png")
            .setDescription("Ci sono molti comandi di divertimento in <@846690950931021874>:\n`!roast` Alias: `!chicken`\n`!fakeban` Alias: `!fban`\n`!jail` Alias: `!prison`\n`!rip`\n`!steve` Alias: `!minecraft`\n`!policeman` Alias: `!pman`\n`!Ti Aspecto`\n`!meme`\n`!foodporn`\n`!cat`\n`!8ball` Alias: `!palla8`\n`!dado` Alias: `!dice`\n`!kill`\n`!hack`\n`!coin` Alias: `!flip`\n`!hug`\n`!qi`\n`!snake`\n`!number`\n`!click`\n`!calculator`\n`!emojify`\n`!clap`\n`!doot`\n`!bluetext` Alias: `!bluetxt`\n`!setprefix`\n`!report`\n`!suggestion`\n`!invite`\n`!vote`\n\n\n:no_entry_sign: **CANALE CONCESSO**\n<#826014465186332682>")
            .setFooter("Page 3/" + totalPage)
            
            var page4 = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setTitle("Stanze Private")
            .setThumbnail("https://www.seekpng.com/png/detail/10-100352_lock-icon-lock-cartoon-png.png")
            .setDescription("Utilizzando <@813439444417773639> puoi anche creare le stanze private permanenti, per crerle entra in <#813742934096740353> e la tua stanza si creerà automaticamente\n`!voice lock/!voice unlock` Per bloccare o sbloccare la tua stanza privata\n`!voice limit numero` Per mettere un limite di utenti nel canale vocale\n`!voice permit/reject` Per dare/togleire il permesso ad un utente di entrare nella stanza\n`!voice delete` Per cancellare la stanza privata se non ne avete più bisogno\n\n\n:no_entry_sign: **CANALE CONCESSO**\n<#826014465186332682>")
            .setFooter("Page 4/" + totalPage)

            var page5 = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setTitle("Moderazione")
            .setThumbnail("https://www.seekpng.com/png/detail/10-100352_lock-icon-lock-cartoon-png.png")
            .setDescription("Della moderazione si occupa <@836663677713252403>, questi sono i suoi comandi:\n`!warn + utente + motivo` per dare un avviso ad un utente\n`!say` Per far annunciare qualcosa allo staff\n`!clear + numero di messaggi da cancellare` Serve per cancellare un numero di messaggi selezionato\n`!kick + utente + motivo` Per kickare un utente\n`!ban + utente + motivo` Per bannare un utente\n`!unban + id utente` Per sbannare un utente dal server\n`!mute + utente + motivo` Per mutare un utente\n`!unmute + utente` Per smutare un utente mutato\n`!slowmode + tempo in secondi` Per settare lo slowmode in un canale testuale\n`!nick + utente + nuovo nick` Per cambiare il nick di qualcuno che lo ha inappropriato\n`!lockdown on/off` Per attivare o disattivare il sistema di lockdown\n`!tclose` per chiudere un ticket\n`!tdelete` Per cancellare un ticket\n\n\n:no_entry_sign: **CANALI CONCESSI**\nTutti")
            .setFooter("Page 5/" + totalPage)

            var page6 = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setTitle(":pick: VillagerBot")
            .setFooter("Page 6/" + totalPage)
            .setThumbnail("https://bot.to/wp-content/uploads/2020/09/villager-bot_5f702cd79b834.png")
            .setDescription("\n\n Per usare villager bot si usa il comando\n`/mine`\nQueso ti permette di scavare degli smeraldi\ncon la quale potrai comprare altre cose!!\nPer altre info usa il comando `!villager-bot`\n**Alias:**\n`!villagerbot`\n`!vlb`\n\n\n:no_entry_sign: **CANALI CONCESSI**\n <#826014465186332682> <#702256452521164952>")
            
            var page7 = new Discord.MessageEmbed()
            .setColor("#ffff00")
            .setTitle(":medal: LIVELLAMENTO")
            .setThumbnail("https://i.imgur.com/keDyc25.png")
            .setDescription("\n\n In questo server c'è la possibilità di livellare.\n Si livella mandando messaggi.\n\n:warning: **ATTENZIONE** :warning:\n\n **NON SPAMMARE LETTERE**\n **A CASO PER LIVELLARE!**\n\n\n:medal: **LIVELLO**\nPuoi vedere il tuo rank utilizzando il comando `&rank`\n\n\n:no_entry_sign: **CANALE CONCESSO**\n <#826014465186332682>")
            .setFooter("Page 7/" + totalPage)

        console.log(message.author.tag + " Ha eeguito il comando !help")
        message.channel.send(page0).then(msg => {
            msg.react('⬅️').then(r => {
                msg.react('➡️')
    
                const reactIndietro = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id
                const reactAvanti = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id
    
                const paginaIndietro = msg.createReactionCollector(reactIndietro)
                const paginaAvanti = msg.createReactionCollector(reactAvanti)
    
                paginaIndietro.on('collect', (r, u) => {
                    page--
                    page < 1 ? page = totalPage : ""
                    msg.edit(eval("page" + page))
                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                })
                paginaAvanti.on('collect', (r, u) => {
                    page++
                    page > totalPage ? page = 1 : ""
                    msg.edit(eval("page" + page))
                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                })
            })
        }) 
    }
    //ServerInfo
    if (message.content == "!serverinfo") {
        let server = message.member.guild;
        let botCount = server.members.cache.filter(member => member.user.bot).size;
        let memberCount = server.memberCount - botCount;

        let categoryCount = server.channels.cache.filter(c => c.type == "category").size;
        let textCount = server.channels.cache.filter(c => c.type == "text").size;
        let vocalCount = server.channels.cache.filter(c => c.type == "voice").size;
        var embed = new Discord.MessageEmbed()
        .setTitle(server.name)
        .setDescription("Tutte le statistiche su questo server")
        .setThumbnail(server.iconURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField(":technologist: Owner", "```" + server.owner.user.username + "```", true)
        .addField(":map: Regione del Server", "```" + server.region + "```", true)
        .addField(":green_circle: Utenti Online", "```" + server.members.cache.filter(user => user.presence.status != "offline").size + "```", true)
        .addField(":placard: ID del Server", "```" + server.id + "```", true)
        .addField(":beginner: Livello di Boost", "```Level " + server.premiumTier + " (" + server.premiumSubscriptionCount + " boost)```", true)
        .addField(":busts_in_silhouette: Membri", "```Totali: " + server.memberCount + " | Membri: " + memberCount + " | Bot: " + botCount + "```", false)
        .addField(":loud_sound: Server, Categorie e Canali", "```Categorie: " + categoryCount + " | Testuali: " + textCount + " | Vocali: " + vocalCount + "```", false)
        .addField(":calendar_spiral: Creazione del server", "```" + moment(server.createdAt).format("ddd DD MMM, HH:mm") + " (" + moment(server.createdAt).fromNow() + ")```", false)
        message.channel.send(embed)
    }
    //UserInfo
    if (message.content.startsWith("!userinfo")) {
        var utente = message.mentions.members.first()
        if(!utente) utente = message.member

        let status = utente.user.presence.status;
        switch (status) {
            case "online": status = "🟢Online"; break;
            case "offline": status = "⚫Offline"; break;
            case "dnd": status = "🔴Do not disturb"; break;
            case "idle": status = "🟡Idle"; break;
        }
        var embed = new Discord.MessageEmbed()
            .setTitle("Tutte le statistiche su questo utente")
            .setThumbnail(utente.user.avatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .addField(":receipt: ID dell'utente", "```" + utente.user.id + "```", true)
            .addField(":ok_hand: Stato", "```" + status + "```", true)
            .addField(":link: Tag", "```" + utente.user.tag + "```", true)
            .addField(":robot: È un bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField(":pencil: Creazione account", "```" + moment(utente.user.createdAt).format("ddd DD MMM, HH:mm") + " (" + moment(utente.user.createdAt).fromNow() + ")```", true)
            .addField(":red_car: Entrato in questo server", "```" + moment(utente.joinedTimestamp).format("ddd DD MMM, HH:mm") + " (" + moment(utente.joinedTimestamp).fromNow() + ")```", true)
        message.channel.send(embed)
    }
    //ChannelInfo
    if(message.content.startsWith("!channelinfo")) {
        let args = message.content.slice(13)
        if (!args[0]) {
            var canale = message.channel;
        }
        else {
            var canale = message.mentions.channels.first()
        }

        switch (canale.type) {
            case "text": canale.type = "Text"; break;
            case "voice": canale.type = "Voice"; break;
            case "news": canale.type = "News"; break;
            case "category": canale.type = "Category"; break;
        }

        if (canale.type == "Voice") {
            let embed = new Discord.MessageEmbed()
                .setTitle(canale.name)
                .setDescription("Tutte le statistiche su questo canale")
                .setColor("RANDOM")
                .addField(":receipt: ID Canale", "```" + canale.id + "```", true)
                .addField(":thought_balloon: Tipo di Canale", "```" + canale.type + "```", true)
                .addField(":1234: Posizione", "```" + canale.rawPosition + "```", true)
                .addField(":bricks: Categoria", "```" + canale.parent.name + "```", true)
                .addField(":loud_sound: Bitrate", "```" + canale.bitrate + "```", true)
                .addField(":bust_in_silhouette: Limite di utenti", canale.userLimit == 0 ? "```∞```" : "```" + canale.userLimit + "```", true)
                .addField(":pencil: Creazione canale", "```" + moment(canale.createdAt).format("ddd DD MMM, HH:mm") + " (" + moment(canale.createdAt).fromNow() + ")```", false)
            message.channel.send(embed)
            return
        }

        if (canale.type == "Category") {
            let embed = new Discord.MessageEmbed()
                .setTitle(canale.name)
                .setDescription("Tutte le statistiche su questa categoria")
                .addField(":receipt: ID Categoria", "```" + canale.id + "```", true)
                .setColor("RANDOM")
                .addField(":thought_balloon: Tipo", "```" + canale.type + "```", true)
                .addField(":1234: Posizione", "```" + canale.rawPosition + "```", true)
                .addField(":pencil: Creazione categoria", "```" + moment(canale.createdAt).format("ddd DD MMM, HH:mm") + " (" + moment(canale.createdAt).fromNow() + ")```", false)
            message.channel.send(embed)
            return
        }

        const hasPermissionInChannel = canale
            .permissionsFor(message.member)
            .has('VIEW_CHANNEL', true);

        let lastMessage = canale.messages.fetch(canale.lastMessageID)
            .then(lastMessage => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(canale.name)
                    .setDescription("Tutte le statistiche su questo canale")
                    .setColor("RANDOM")
                    .addField(":receipt: ID Canale", "```" + canale.id + "```", true)
                    .addField(":thought_balloon: Tipo", "```" + canale.type + "```", true)
                    .addField(":1234: Posizione", "```" + canale.rawPosition + "```", true)
                    .addField(":bricks: Categoria", "```" + canale.parent.name + "```", true)
                    .addField(":notepad_spiral: Descrizione", !canale.topic ? "```Nessuna Descrizione```" : "```" + canale.topic + "```", true)
                    .addField(":underage: NSFW", canale.nsfw ? "```Sì```" : "```No```", true)
                    .addField(":pushpin: Ultimo Messaggio", !hasPermissionInChannel ? "```Non hai il permesso per vedere questo canale```" : ("```" + lastMessage.author.username + "#" + lastMessage.author.discriminator + " (" + moment(new Date(lastMessage.createdTimestamp).getTime()).fromNow() + ") - " + lastMessage.content + "```"), true)
                    .addField(":pencil: Creazione Canale", "```" + moment(canale.createdAt).format("ddd DD MMM, HH:mm") + " (" + moment(canale.createdAt).fromNow() + ")```", false)
                message.channel.send(embed)
            })
            .catch(() => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(canale.name)
                    .setDescription("Tutte le statistiche su questo canale")
                    .setColor("RANDOM")
                    .addField(":receipt: ID Canale", "```" + canale.id + "```", true)
                    .addField(":thought_balloon: Tipo", "```" + canale.type + "```", true)
                    .addField(":1234: Posizione", "```" + canale.rawPosition + "```", true)
                    .addField(":bricks: Categoria", "```" + canale.parent.name + "```", true)
                    .addField(":notepad_spiral: Descrizione", !canale.topic ? "```Nessuna Descrizione```" : "```" + canale.topic + "```", true)
                    .addField(":underage: NSFW", canale.nsfw ? "```Sì```" : "```No```", true)
                    .addField(":pushpin: Ultimo Messaggio", !hasPermissionInChannel ? "```Non hai il permesso per vedere questo canale```" : "```Not found```", true)
                    .addField(":pencil: Creazione Canale", "```" + moment(canale.createdAt).format("ddd DD MMM, HH:mm") + " (" + moment(canale.createdAt).fromNow() + ")```", false)
                message.channel.send(embed)
            })
}
    //Last Video
    if(message.content == "!lastvideo") {
        const channelId = 'UCw7lKb-XBW4ApE0puSbJLFQ'
        const sortBy = 'newest'
        ytch.getChannelVideos(channelId, sortBy).then(async (response) => {
            message.channel.send("> Aspetta 5/10 Secondi").then(msg => {
                msg.delete({ timeout: 8000 })
            })
            var video1 = await getInfo(`https://www.youtube.com/watch?v=${response.items[1].videoId}`)
            var video2 = await getInfo(`https://www.youtube.com/watch?v=${response.items[2].videoId}`)
            var video3 = await getInfo(`https://www.youtube.com/watch?v=${response.items[3].videoId}`)
            getInfo(`https://www.youtube.com/watch?v=${response.items[0].videoId}`).then(async info => {
                let embed = new Discord.MessageEmbed()
                    .setTitle(response.items[0].title)
                    .setColor("#41A9F6")
                    .setDescription(":love_you_gesture: Questo è l'ultimo video uscito su **RodariRogi23**, vai subito a vederlo...\rhttps://www.youtube.com/watch?v=" + response.items[0].videoId)
                    .setThumbnail(response.items[0].videoThumbnails[3].url)
                    .addField(":eyes: Visualizzazioni", "```" + response.items[0].viewCount + "```", true)
                    .addField(":film_frames: Durata", "```" + response.items[0].durationText + "```", true)
                    .addField(":alarm_clock: Pubblicato", "```" + response.items[0].publishedText + "```", true)
                    .addField(":thumbsup: Like", "```" + info.items[0].like_count + "```", true)
                    .addField(":thumbsdown: Dislike", "```" + info.items[0].dislike_count + "```", true)
                    .addField(":projector: Altri Video...", `
[${response.items[1].title.length > 40 ? (response.items[1].title.slice(0, 40) + "...") : response.items[1].title}](https://www.youtube.com/watch?v=${response.items[1].videoId}) - ${video1.items[0].upload_date.slice(6)}/${video1.items[0].upload_date.slice(4, -2)}/${video1.items[0].upload_date.slice(0, -6)}
[${response.items[2].title.length > 40 ? (response.items[2].title.slice(0, 40) + "...") : response.items[2].title}](https://www.youtube.com/watch?v=${response.items[2].videoId}) - ${video2.items[0].upload_date.slice(6)}/${video2.items[0].upload_date.slice(4, -2)}/${video2.items[0].upload_date.slice(0, -6)}
[${response.items[3].title.length > 40 ? (response.items[3].title.slice(0, 40) + "...") : response.items[3].title}](https://www.youtube.com/watch?v=${response.items[3].videoId}) - ${video3.items[0].upload_date.slice(6)}/${video3.items[0].upload_date.slice(4, -2)}/${video3.items[0].upload_date.slice(0, -6)}`)

        message.channel.send(embed)
        })
    })
}
    //Controllo stanze private
    const nochannel = new Discord.MessageEmbed()
        .setTitle("ERRORE")
            .setThumbnail("https://i.imgur.com/lRLRIr4.png")
            .setColor("RED")
            .setDescription(":x: Non sei connesso in un canale vocale")
    const nopvt = new Discord.MessageEmbed()
        .setTitle("ERRORE")
        .setColor("RED")
        .setThumbnail("https://i.imgur.com/lRLRIr4.png")
        .setDescription(":x: Non sei in una stanza privata!")
    //Comando lock
    if(message.content.toLocaleLowerCase().startsWith("!voice lock")) {
        var channel = message.member.voice.channel
        if(!channel) return message.channel.send(nochannel)
        if(channel.parent.id != "866340075951226900") return message.channel.send(nopvt)
        if(message.author.username != channel.name) return message.channel.send(Noperm)
        channel.overwritePermissions([
            {
                id: message.guild.id,
                deny: ["CONNECT"]
            }
        ])
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Il tuo canale <#${channel.id}> è stato bloccato, ora nessuno puo' entrarci`)
        .setColor("RANDOM"))
    }
    //Comando unlock
    if(message.content.toLowerCase().startsWith("!voice unlock")) {
        var channel = message.member.voice.channel
        if(!channel) return message.channel.send(nochannel)
        if(channel.parent.id != "866340075951226900") return message.channel.send(nopvt)
        if(message.author.username != channel.name) return message.channel.send(Noperm)
        channel.overwritePermissions([
            {
                id: message.guild.id,
                allow: ["CONNECT"]
            }
        ])
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Il tuo canale <#${channel.id}> è stato sbloccato, ora tutti possono entrarci`)
        .setColor("RANDOM"))
    }
    //Comando Limit
    if(message.content.toLowerCase().startsWith("!voice limit")) {
        var channel = message.member.voice.channel
        if(!channel) return message.channel.send(nochannel)
        if(channel.parent.id != "866340075951226900") return message.channel.send(nopvt)
        if(message.author.username != channel.name) return message.channel.send(Noperm)
        const args = message.content.slice(13)
        channel.setUserLimit(args).catch(() => {
            message.channel.send(new Discord.MessageEmbed()
            .setTitle("ERRORE")
            .setColor("RED")
            .setDescription("Hai inserito un numero non valido o più alto di 99"))
            return;
        }
        )
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Il tuo canale ha adesso un limite di ${args} utenti`)
        .setColor("RANDOM"))
    }
    //Comando Delete
    if(message.content.toLowerCase().startsWith("!voice delete")) {
        var channel = message.member.voice.channel
        if(!channel) return message.channel.send(nochannel)
        if(channel.parent.id != "866340075951226900") return message.channel.send(nopvt)
        if(message.author.username != channel.name) return message.channel.send(Noperm)
        channel.delete()
        message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("La tua stanza privata è stata cancellata"))
    }
    //Comando Permit
    if(message.content.toLowerCase().startsWith("!voice permit")) {
        var channel = message.member.voice.channel
        if(!channel) return message.channel.send(nochannel)
        if(channel.parent.id != "866340075951226900") return message.channel.send(nopvt)
        if(message.author.username != channel.name) return message.channel.send(Noperm)
        var user = message.mentions.members.first()
        channel.overwritePermissions([
            {
                id: user.id,
                allow: ["CONNECT", "VIEW_CHANNEL"]
            }
        ])
        message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${user} puo' entrare in <#${channel.id}>`))
    }
    //Comando Reject
    if(message.content.toLowerCase().startsWith("!voice reject")) {
        var channel = message.member.voice.channel
        if(!channel) return message.channel.send(nochannel)
        if(channel.parent.id != "866340075951226900") return message.channel.send(nopvt)
        if(message.author.username != channel.name) return message.channel.send(Noperm)
        var user = message.mentions.members.first()
        channel.overwritePermissions([
            {
                id: user.id,
                deny: ["CONNECT"]
            }
        ])
        user.voice.kick()
        message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${user} ora non puo' più entrare in <#${channel.id}>`))
    }
    //Reactions
    if(message.content.includes(":")) return;
    if(message.content.toLowerCase().includes("rogi")) message.react("<:Rogi:904005869799366696>")
    if(message.content.toLowerCase().includes("ciao") || message.content.toLowerCase().includes("salve") || message.content.toLowerCase().includes("hello") || message.content.toLowerCase().includes("benvenuto")) message.react("<:RogiCiao:904001520880726036>")
    if(message.content.toLowerCase().includes("?")) message.react("<:RogiDomandoso:904007044246433923>")
    if(message.content.toLowerCase() == "f") message.react("<:RogiF:904002259921293382>")
    if(message.content.toLowerCase() == "gg") message.react("<:RogiGG:904002692286922753> ")
    if(message.content.toLowerCase().includes("amore") || message.content.toLowerCase().includes("amo") || message.content.toLowerCase().includes("adoro") || message.content.toLowerCase().includes("adorare")) message.react("<:RogiHearts:904005290905718874>")
    if(message.content.toLowerCase().includes("lol")) message.react(" <:RogiLOL:904003061960282142> ")
    if(message.content.toLowerCase().includes("ok") || message.content.toLowerCase().includes("va bene") || message.content.toLowerCase().includes("capito")) message.react("<:RogiOk:904003454350004265>")
    if(message.content.toLocaleLowerCase().includes("triste") || message.content.toLowerCase().includes("sad") || message.content.toLowerCase().includes("piango")) message.react("<:RogiSad:904004495611142176>")
})



bot.on("voiceStateUpdate", async (oldState, newState) => {
    //Creare le stanze private
    const user = await bot.users.fetch(newState.id)
    const member = newState.guild.member(user)
    if(newState.channelID == "813742934096740353") {
        var server = bot.guilds.cache.get("602019987279839274")
        if (server.channels.cache.find(canale => canale.name == user.username)) {
            user.send(`\`\`\`diff\n- Hai già creato una stanza privata, per crearne una nuova, connettiti in quella precedente e digita !delete\n\`\`\``).catch(() => { })
            var canale = server.channels.cache.find(canale => canale.name == user.username)
            member.voice.setChannel(canale)
            return
        }
        const channel = await newState.guild.channels.create(user.username, { 
            type: "voice",
            parent: "866340075951226900",
            permissionOverwrites: [
            {
                id: server.id,
                allow: ["VIEW_CHANNEL"],
                deny: ["CONNECT"]
            },
            {
                id: user.id,
                allow: ["CONNECT"]
            }
            ]
        })
        member.voice.setChannel(channel)
    }
    //Disconnettere da #membri e #iscritti
    if (newState.channelID == "814829205904424980" || newState.channelID == "862009685087748117") {
        var server = bot.guilds.cache.get("602019987279839274");
        var utente = server.members.cache.find(x => x.id == newState.id);
        utente.voice.kick()
    }
})
//Messaggio di Welcome
bot.on("guildMemberAdd", async (member) => {
    if (member.guild.id != "602019987279839274") return
    var server = bot.guilds.cache.get("602019987279839274");
    var botCount = server.members.cache.filter(member => member.user.bot).size;
    var utentiCount = server.memberCount - botCount;  
    const canvas =  Canvas.createCanvas(1280, 720);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("./WelcomeImage.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);        
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }))
    ctx.drawImage(avatar, 470, 250, 350, 350);
    /*ctx.font = "40px Impact";
    ctx.fillStyle = "#F8F8F8";
    ctx.fillText(member.user.tag + "\rÈ entrato in Rogi Discord!!\rSei il nostro " + member.guild.memberCount +  " membro!!", 450, 100)*/
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "WelcomeImage.png")
    //bot.channels.cache.get("813375425056342036").send(attachment);
    bot.channels.cache.get("813375425056342036").send(":wave:Ciao" + member.toString() + " benvenuto in " + member.guild.name + "\r:eyes: Sei il nostro " + utentiCount + "° membro!!!\r:scroll:Leggi il <#698178808011948032> e rispetta le regole :wink:\r:rotating_light:Puoi vedere tutte le info del server in <#813476709731008532>")
    bot.channels.cache.get("813375425056342036").send(attachment);
    member.roles.add("704646594506653791")
    member.roles.add("741619822810366024")
})
//Member Counter e Youtube Counter
setInterval(function () {
    //Member Counter
    var server = bot.guilds.cache.get("602019987279839274");
    var botCount = server.members.cache.filter(member => member.user.bot).size;
    var utentiCount = server.memberCount - botCount;
    var canalemembri = bot.channels.cache.get("814829205904424980")
    canalemembri.setName(`👾│Members: ${utentiCount}`)
    //Youtube Counter
    ytch.getChannelInfo("UCw7lKb-XBW4ApE0puSbJLFQ").then((response) => {
        var canaleyoutube = bot.channels.cache.get("862009685087748117")
        canaleyoutube.setName(`🎬│Subscribers: ${response.subscriberCount}`)
    })
    //Natale Countdown
    const currenttime = new Date()
    const Christmas = new Date("December 25 2021 00:00:00")
    const diff = Christmas - currenttime
    const days = Math.floor(diff / 1000 / 60 / 60 / 24)
    const hours = Math.floor(diff / 1000 / 60 / 60)
    const minutes = Math.floor(diff / 1000 / 60)
    const canale = bot.channels.cache.get("905070103035518987")
    canale.setName(`🤶🏻│${days} giorni a Natale!`)
    if(days == "0") {
        canale.setName(`🤶🏻│${hours} ore e ${minutes} minuti a Natale!`)
    }
}, 10000)