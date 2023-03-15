const config = require(`${process.cwd()}/JSON/config.json`);
const randomWord = require(`random-words`);
const translate = require(`translate-google`);

module.exports = {
    name: `messageCreate`,
    async execute(message) {

        if (message.channel != config.channelsid.hangman) return;

        if (serverstats.maintenance && process.env.local && !serverstats.testers?.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers?.includes(message.author.id)) return;

        if (message.content.length > 1 || message.author.bot) return;

        if (serverstats.hangman.wordarray?.includes(message.content)) {

            if (serverstats.hangman.foundletters?.includes(message.content)) return message.react(`😐`);

            const foundLettersArray = serverstats.hangman.foundletters;

            foundLettersArray.push(message.content.toString());

            database.collection(`ServerStats`).updateOne({}, {
                $set: {
                    'hangman.foundletters': foundLettersArray,
                }
            });

            message.react(`✅`);

            let string = ``;

            for (let i = 0; i < serverstats.hangman.wordarray.length; i++) {
                if (foundLettersArray?.includes(serverstats.hangman.wordarray[i])) {
                    string += serverstats.hangman.wordarray[i];
                } else {
                    if (serverstats.hangman.wordarray[i] == ` `) {
                        string += ` `;
                    } else {
                        string += `\\_`;
                    }
                }
            }

            const embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setDescription(`${string}`)

            message.channel.send({ embeds: [embed] });

            if (string == serverstats.hangman.word) {

                const embed = new Discord.MessageEmbed()
                    .setTitle(`🥳 PAROLA INDOVNATA! 🥳`)
                    .setColor(`GREEN`)
                    .setDescription(`${message.author.toString()} ha indovinato la parola **${serverstats.hangman.word}**`)
                message.channel.send({ embeds: [embed] });

                const word = randomWord();

                await translate(word, { to: `it` }).then(async w => {

                    await database.collection(`ServerStats`).updateOne({}, {
                        $set: {
                            'hangman.word': w.toLowerCase(),
                            'hangman.wordarray': w.toLowerCase().split(''),
                            'hangman.foundletters': [],
                        }
                    });

                    setTimeout(() => {
                        let string = ``;

                        for (let i = 0; i < serverstats.hangman.word.length; i++) {

                            if (serverstats.hangman.wordarray[i] == ` `) {
                                string += ` `;
                            } else {
                                string += `\\_`;
                            }
                        }

                        const embed2 = new Discord.MessageEmbed()
                            .setTitle(`👀 Parola Generata 👀`)
                            .setColor(`YELLOW`)
                            .setDescription(`${string}`)
                            .setThumbnail(`https://i.imgur.com/G7cRF93.png`);
                        message.channel.send({ embeds: [embed2] });
                    }, 1000)
                });
            }
        } else {
            message.react(`❌`);
        }
    }
}