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
}