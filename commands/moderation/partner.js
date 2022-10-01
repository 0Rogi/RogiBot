const config = require(`${process.cwd()}/JSON/config.json`)
const moment = require(`moment`)

module.exports = {
    name: `partner`,
    data: {
        name: `partner`,
        description: `Esegue una partnership`,
        options: [
            {
                name: `descrizione`,
                description: `Descrizione della pertnership`,
                type: `STRING`,
                required: true
            },
            {
                name: `utente`,
                description: `Utente con cui è stata effettuata la partnership`,
                type: `USER`,
                required: true
            },
            {
                name: `server`,
                description: `Nome del server con cui si sta effettuando la partnership`,
                type: `STRING`,
                required: true
            }
        ]
    },
    permissionlevel: 0.5,
    allowedchannels: [config.idcanali.partnermanager],
    async execute(interaction) {
        await interaction.deferReply();

        let description = interaction.options.getString(`descrizione`);
        let user = interaction.options.getUser(`utente`);
        let server = interaction.options.getString(`server`);

        if (interaction.guild.members.cache.find(x => x.id == user.id).roles.cache.has(config.idruoli.unverified)) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`ERRORE`)
                .setDescription(`*Questo utente non è verificato...*\n*Non puoi eseguire una partner con un utente non verificato!*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        // let done = false;
        // let donepartnership;
        // await serverstats?.partnerships?.forEach(p => {
        //     if (p.user == user.id) {
        //         done = true;
        //         donepartnership = p;
        //     }
        // });

        // if (done) {
        //     let embed = new Discord.MessageEmbed()
        //         .setTitle(`<a:error:966371274853089280> ERRORE <a:error:966371274853089280>`)
        //         .setDescription(`Una partnership con questo utente è stata **già effettuata**!\n\n[${donepartnership.server}](https://discord.com/channels/602019987279839274/915647768943542312/${donepartnership.message1})`)
        //         .setColor(`RED`);
        //     interaction.editReply({ embeds: [embed] });
        //     return;
        // }

        let id1;
        await client.channels.cache.get(config.idcanali.partnership).send(description).then(m => {
            id1 = m.id;
        })
        let id2;
        await client.channels.cache.get(config.idcanali.partnership).send(`─────────────────\n🔷 Eseguita da: ${interaction.user.toString()}\n🔷 Eseguita con: ${user.toString()}\n🔷 Nome Server: ${server.toString()}─────────────────`).then(m => {
            id2 = m.id;
        })

        let partner = {
            message1: id1,
            message2: id2,
            user: user?.id,
            executor: interaction.user.id,
            server: server
        }

        database.collection(`ServerStats`).updateOne({}, { $push: { "partnerships": partner } });

        let embedlog = new Discord.MessageEmbed()
            .setTitle(`🤝 NUOVA PARTNERSHIP 🤝`)
            .addField(`⏰ Orario:`, `${moment(new Date().getTime()).format(`ddd DD MMM YYYY, HH:mm:ss`)}`)
            .addField(`🔨 Moderatore:`, `Nome: **${interaction.user.username}** - ID: **${interaction.user.id}**\n||${interaction.user.toString()}||`)
            .addField(`👤 Utente:`, `Nome: **${user.username}** - ID: **${user.id}**\n||${user.toString()}||`)
            .addField(`🏠 Server:`, `**${server.toUpperCase()}**`)
            .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
            .setColor(`GREEN`);
        client.channels.cache.get(config.idcanali.logs.partnership.newpartnership).send({ embeds: [embedlog] });

        let embed = new Discord.MessageEmbed()
            .setTitle(`Partnership Effettuata`)
            .setDescription(`La partnership con **${user.toString()}** è stata effettuata **con successo**! <a:checkmark:970022827866611762>`)
            .setColor(`YELLOW`);
        interaction.editReply({ embeds: [embed] });

    }
}