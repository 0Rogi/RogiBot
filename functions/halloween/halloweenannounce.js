const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = async function halloweenannounce() {
    if (new Date().getDate() == 31 && new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
        let button = new Discord.MessageButton()
            .setStyle(`PRIMARY`)
            .setCustomId(`HalloweenPumpkinAnnounce`)
            .setEmoji(`<:knife:1036322090007146557>`)
            .setLabel(`Uccidi Mostro`);
        let row = new Discord.MessageActionRow()
            .addComponents(button);
        client.channels.cache.get(`942473357931192391`).send({ content: `> 🎃 Buon **Halloween** a tutti!\n> \n> Come prima cosa, volevo ricordarvi che c'è ancora l'**evento di halloween** in corso e che terminerà il **2 Novembre 2022**, il **vincitore** *(il primo in classifica)*, vincerà __il ruolo <@&1034900435347185738>, che avrà un'emoji esclusiva__!\n> Il modo per guadagnare punti in questo evento, lo trovate nell'annuncio sopra infatti ora non sono qui per spiegarvi questo... MA per dirvi che...\n> \n> \n> ⚠ **UN NUOVO MOSTRO È SPAWNATO** ⚠!\n> Questo mostro è molto particolare, si chiama **Bighog** e questa è l'**unica foto** che gli si è riuscito a scattare: https://i.imgur.com/khKriJX.png\n> \n> Potete sconfiggerlo *(premendo il pulsante qui sotto)* per avere il **10% di 5 \* _i vostri punti_**!\n> \n> **Premi subito il pulsante qui sotto per ucciderlo**!\n\n<@&704646594506653791>`, components: [row], allowedMentions: { users: [], roles: [`704646594506653791`] } });
    }
    if (new Date().getDate() == 2 && new Date().getHours() == 10 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {

        //? Crea la classifica finale
        serverstats.halloweenevent.sort((a, b) => b.points - a.points);

        let text = ``;
        let i = 0;
        serverstats.halloweenevent.forEach((e) => {
            i++
            if (i > 10) return;
            if (i == 1) {
                text += `> **# 🥇** ${e.username} - **${e.points}** - **${e.missioncompleted}**\n`;
                return;
            }
            if (i == 2) {
                text += `> **# 🥈** ${e.username} - **${e.points}** - **${e.missioncompleted}**\n`;
                return;
            }
            if (i == 3) {
                text += `> **# 🥉** ${e.username} - **${e.points}** - **${e.missioncompleted}**\n`;
                return;
            }
            text += `> **# ${i}** ${e.username} - **${e.points}** - **${e.missioncompleted}**\n`;
        });

        if (text == ``) {
            text = `_Classifica Vuota_`;
        }

        //? Manda il messaggio
        client.channels.cache.get(`942473357931192391`).send({ content: `> 🎃 **Evento di Halloween**\n> \n> L'evento di halloween, **termina qui**. Avete **completato tutte le missioni** e **sconfitto tutti gli zombie** *(sì... da oggi non spawnano più 😞)*.\n> \n> In ogni caso... **ringrazio TUTTI coloro che hanno partecipato** all'evento... e anche se non avete vinto, ci sarà sicuramente un prossimo evento in cui magari potrete vincere :).\n> Ma prima di dirvi il vincitore... ecco cosa si vince con l'evento:\n> -**Ruolo** <@&1034900435347185738>;\n> -**Emoji** Esclusiva: <:RogiPumpkin:1037065155709784064>;\n> -**Livellamento** del **20% in più** per 2 giorni.\n> \n> 🥇 Va bene, ora annunciamo il **vincitore** che **è**: ||<@${serverstats.halloweenevent.sort((a, b) => b.points - a.points)[0].id}>|| 👏\n> \n> 🏆 Questa è la **classifica finale**: *(Posizione - Utente - Punti - Missioni Completate)*\n ${text}` });

        //? Resetta il server a com'era prima dell'evento
        client.guilds.cache.get(config.idServer.idServer).setName(`Rogi Discord`);
        client.guilds.cache.get(config.idServer.idServer).setIcon(`https://i.imgur.com/bhSUCXi.gif`);

        //? Assegna il ruolo al vincitore
        client.guilds.cache.get(config.idServer.idServer).members.find(x => x.id == serverstats.halloweenevent.sort((a, b) => b.points - a.points)[0].id).roles.add(`1034900435347185738`);
    }
}