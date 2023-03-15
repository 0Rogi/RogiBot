const config = require(`../JSON/config.json`);
const randomWord = require(`random-words`);
const translate = require(`translate-google`);

module.exports = function generateGames() {

    game = Math.floor(Math.random() * (4 - 1) + 1);
    game = 3;

    if (game == 1) {

        let word = randomWord();

        translate(word, { to: `it` }).then(w => {
            word = w;

            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    'economyGame1Word': word,
                }
            });

            const embed = new Discord.MessageEmbed()
                .setTitle(`🎮 Nuovo Minigioco 🎮`)
                .setDescription(`Il primo che scriverà la parola:\n||\`${word}\`||\nriceverà **10 RogiBucks** 🤑🤑`)
                .setColor(`YELLOW`);
            client.channels.cache.get(config.channelsid.testing).send({ embeds: [embed] }); //! Cambiare l'id di testing con general
        });

    } else if (game == 2) {

        const embed = new Discord.MessageEmbed()
            .setTitle(`<:fortunewheel:1083676748211826718> Ruota della Fortuna <:fortunewheel:1083676748211826718>`)
            .setDescription(`È comparsa una **Ruota della Fortuna**!\n\nUtilizza **20 RogiBucks** per vincere uno dei premi!\n\n⚠️ **ATTENZIONE** ⚠️\nQuesta ruota durerà solo 2h!`)
            .setImage(`https://i.imgur.com/4dTWxpP.png`)
            .setColor(`YELLOW`);
        const button = new Discord.MessageButton()
            .setLabel(`Gira la Ruota`)
            .setCustomId(`SpinWheel`)
            .setStyle(`PRIMARY`);
        const row = new Discord.MessageActionRow()
            .addComponents(button)

        client.channels.cache.get(config.channelsid.testing).send({ embeds: [embed], components: [row] }).then(m => { //! Cambiare l'id di testing con general
            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    'game2.messageId': m.id,
                    'game2.expireDate': new Date().getTime() + 1000 * 60 * 60 * 2
                }
            });
        });

    } else if (game == 3) {
        
        let word = randomWord();
        console.log(word)
        translate(word, { to: `it` }).then(async w => {
            word = w;
            let arr = word.split("")
            arr.sort(() => Math.random() - 0.5);
            let messWord = arr.join("")

            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    'economyGame3Word': word,
                }
            });

            const embed = new Discord.MessageEmbed()
                .setTitle(`🎮 Nuovo Minigioco 🎮`)
                .setDescription(`Il primo che indovina la parola mescolata:\n||\`${messWord}\`||\nriceverà **15 RogiBucks** 🤑🤑`)
                .setColor(`YELLOW`);
            client.channels.cache.get(config.channelsid.testing).send({ embeds: [embed] }); //! Cambiare l'id di testing con general
        });
    }
}