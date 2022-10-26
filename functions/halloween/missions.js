const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = function missions() {
    if (new Date().getHours() == 10 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
        if (new Date().getDate() == 27) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nuova Missione`)
                .setDescription(`La vostra missione di oggi è:\n||**Trovare più scheletri possibili**||.\n\nQuesti **scheletri** compariranno in **reazioni** a **messaggi casuali** scritti qui in general, per raccoglierli basterà premere sulla reazione.\nAlla fine della giornata, i vostri punti saranno \`100 * \`*\`il numero di scheletri trovati\`*.\n\nBuona fortuna :)`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed], content: `<@&1033320600271323227>`, allowedMentions: { users: [], roles: [`1033320600271323227`] } });
        }
        if (new Date().getDate() == 28) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nuova Missione`)
                .setDescription(`La vostra missione di oggi è:\n||**Uccidere il pipistrello**||.\n\nQuesto **pipistrello** comparirà in **<#974971851526770688>**. Ad ogni numero *giusto**, ci sarà il 25% di possibilità di far comparire un **pipistrello**.\nAppena lo ucciderete, riceverete **100 punti** completando la missione di oggi!`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed], content: `<@&1033320600271323227>`, allowedMentions: { users: [], roles: [`1033320600271323227`] } });
        }
        if (new Date().getDate() == 29) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nuova Missione`)
                .setDescription(`La vostra missione di oggi è:\n||**Trovare il fantasma e parlarci**||.\n\nIl **fantasma** spawnerà nelle **stanze private**. Ad ogni messaggio, ci sarà il 25% di possibilità di far comparire un **fantasma**.\nAppena ci parlerete, riceverete **150 punti** completando la missione di oggi!`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed], content: `<@&1033320600271323227>`, allowedMentions: { users: [], roles: [`1033320600271323227`] } });
        }
        if (new Date().getDate() == 30) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nuova Missione`)
                .setDescription(`La vostra missione di oggi è:\n||**Raccogliere 3 zucche**||.\n\nPer poter raccogliere una zucca, dovrete prima **piantarla**, potete fare questo con il comando\`/halloween plant\` e poi dopo **un'ora**, sarà possibile **raccoglierla** con \`/halloween collect\`. Dopo che 3 zucche saranno raccolte, la missione sarà completata!`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed], content: `<@&1033320600271323227>`, allowedMentions: { users: [], roles: [`1033320600271323227`] } });
        }
        if (new Date().getDate() == 31) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nuova Missione`)
                .setDescription(`La vostra missione di oggi è:\n||**Craftare 3 pozioni**||.\n\nPer poter craftare le 3 pozioni, sarà necessario utilizare il comando \`/halloween potion\`. Prima di craftare queste pozioni però, saranno necessario 2 oggetti che si potranno ottenere casualmente entrando in vocale _(con \`/halloween inventory\` è possibile vedere l'inventario)_. Una volta che anche la 3 pozione sarà craftata, avrete completato la missione!`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed], content: `<@&1033320600271323227>`, allowedMentions: { users: [], roles: [`1033320600271323227`] } });
        }
        if (new Date().getDate() == 1) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nuova Missione`)
                .setDescription(`La vostra missione di oggi è:\n||**Uccidere 10 zombie**||.\n\nLa missione di oggi, è molto semplice, gli zombie che di solito compaiono, beh, oggi se ne uccidete ben 10, completerete la missione!`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed], content: `<@&1033320600271323227>`, allowedMentions: { users: [], roles: [`1033320600271323227`] } });
        }
    }
    if (new Date().getHours() == 0 && new Date().getMinutes() == 0 && new Date().getSeconds() == 0) {
        if (new Date().getDate() == 28) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Fine Missione`)
                .setDescription(`La **prima missione** è **finita**.\n\n_Potete vedere gli **scheletri** che avete **trovato** e i **punti guadagnati**, con \`/halloween stats\`._`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
            serverstats.halloweenevent.forEach(async user => {
                let skeletonsfound = user.skeletons.found;
                if (skeletonsfound > 0) {
                    user.points = user.points + (100 * skeletonsfound);
                    user.missioncompleted = user.missioncompleted + 1;
                    await database.collection(`ServerStats`).updateOne({}, { $pull: { "halloweenevent": { id: user.id } } })
                    database.collection(`ServerStats`).updateOne({}, { $push: { "halloweenevent": user } });
                    return;
                }
            })
        }
        if (new Date().getDate() == 29) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Fine Missione`)
                .setDescription(`La **seconda missione** è **terminata**.\n\nSe siete riusciti a trovare ed uccidere il pipistrello, avrete guadagnato 100 punti.\n\n*Potete vedere le vostre statistice con \`/halloween stats\`.*`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
        }
        if (new Date().getDate() == 30) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Fine Missione`)
                .setDescription(`La **terza missione** è **terminata**.\n\nSe siete riusciti a trovare il fantasma e a parlarci, avrete guadagnato ben 150 punti.\n\n*Potete vedere le vostre statistice con \`/halloween stats\`.*`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
        }
        if (new Date().getDate() == 31) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Fine Missione`)
                .setDescription(`La **quarta missione** è **terminata**.\n\nSe siete riusciti a piantare e raccogliere le **3 zucche**, avrete ricevuto ben **200 punti**.\n\n*Potete vedere le vostre statistice con \`/halloween stats\`.*`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
        }
        if (new Date().getDate() == 1) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Fine Missione`)
                .setDescription(`La **quinta missione** è **terminata**.\n\nSe siete riusciti a craftare le **3 pozioni**, avrete ricevuto ben **250 punti**.\n\n*Potete vedere le vostre statistice con \`/halloween stats\`.*`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
        }
        if (new Date().getDate() == 2) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Fine Missione`)
                .setDescription(`La **sesta _(ed ultima)_ missione**  è **terminata**.\n\nSe siete riusciti a uccidere i **10 zombie**, avrete ottenuto 50 punti!\n\n*Potete vedere le vostre statistice con \`/halloween stats\`.*`)
                .setColor(`ORANGE`);
            client.channels.cache.get(config.idcanali.generaltxt).send({ embeds: [embed] });
        }
    }
}