const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if (interaction.guild != config.idServer.idServer) return;

        //? Controlla se la manutenzione è attiva o no
        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return;

        //? Controlla l'id del pulsate
        if (!interaction.isButton()) return;
        if (interaction.customId.startsWith(`DeletePRoom`)) {
            //? Controlla se l'utente è chi ha fatto i l comando
            if (interaction.customId.split(`,`)[1] != interaction.user.id) return interaction.reply({ content: `<a:error:1086952752892092416> Questo non è un tuo pulsante!`, ephemeral: true });

            //? Modifica la risposta dell'interazione
            let embed = new Discord.MessageEmbed()
                .setTitle(`🗑 Canali Privati Eliminati 🗑`)
                .setDescription(`_I tuoi **canali privati** sono stati **ELIMINATI** con successo!_`)
                .setColor(`RED`);
            interaction.update({ embeds: [embed], components: [] });

            //? Trova i canali
            let channel = undefined;

            serverstats.privaterooms.forEach(room => {
                if (room.user == interaction.user.id) {
                    channel = room;
                }
            })

            //? Elimina i canali
            client.channels.cache.get(channel.text).delete(() => { });
            client.channels.cache.get(channel.vc).delete().catch(() => { });

            database.collection(`ServerStats`).updateOne({}, { $pull: { "privaterooms": { user: interaction.user.id } } });
        }
    }
}