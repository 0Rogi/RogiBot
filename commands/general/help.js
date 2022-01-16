module.exports = {
    name: "help",
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("Tutti i comandi del server! Usa il menu qui sotto per scegliere le varie categorie!\n🎡General\nPer avere tutti i comandi generali\n🔨Moderation\nPer avere tutti i comandi di moderazione\n👤Owner\nPer avere i comandi che solo l\'owner puo\' usare\n🔒Stanze Private\nPer Avere comandi delle stanze private")
            const row = new Discord.MessageActionRow()
			.addComponents(new Discord.MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('🏘️Home')
			.addOptions([
						{
							label: '🎡General',
							description: 'Per avere tutti i comandi generali',
							value: 'General',
						},
						{
							label: '🔨Moderation',
							description: 'Per avere tutti i comandi di moderazione',
							value: 'Moderation',
						},
                        {
                            label: '👤Owner',
                            description: 'Per avere i comandi che solo l\'owner puo\' usare',
                            value: 'Owner',
                        },
                        {
                            label: '🔒Stanze Private',
                            description: 'Per Avere comandi delle stanze private',
                            value: 'Pvr',
                        }
					]));
        const m = await message.channel.send({ embeds: [embed], components: [row] });
        setTimeout(() => {
            const row = new Discord.MessageActionRow()
			.addComponents(new Discord.MessageSelectMenu()
			.setCustomId('select')
			.setPlaceholder('🏘️Home')
            .addOptions([
                {
                    label: 'Nothing',
                    description: 'Nothing',
                    value: 'Nothing',
                }])
            .setDisabled())
            m.edit({components: [row]})
        }, 300000);
        const collector = m.createMessageComponentCollector()
        collector.on("collect", i => {
            if(i.values[0] == "General" || i.values[1] == "General") {
                if(i.user.id != message.author.id) return i.reply({content: "Non è un tuo menu",  ephemeral: true})
                const images = new Discord.MessageEmbed()
                .setTitle("Comandi Generali del server")
                .setDescription("!avatar\nTi permette di prendere l'avatar di un utente\n!help\nTi permette di vedere questo menu\n!partner\nComando utilizzabile solo dallo staff, per mandare messaggi in <#915647768943542312>\n!serverinfo\nTi permette di vedere informazioni sul server\n!test\nTi permette di vedere lo stato dei bot\n!time\nTi permette di vedere l'ora attuale\n!userinfo\nTi permette di vedere informazioni su un utente\n!github\nTi permette di vedere il github di Rogi\n!instagram\nTi permette di vedere l'instagram di Rogi\n!invite\nTi permette di vedere l'invito del server\n!tiktok\nTi permette di vedere il profilo tik tok di Rogi\n!youtube\nTi permette di vedere il canale youtube di Rogi\n")
                .setColor("YELLOW")
                i.update({embeds: [images]})
            }
            if(i.values[0] == "Moderation" || i.values[1] == "Moderation") {
                if(i.user.id != message.author.id) return i.reply({content: "Non è un tuo menu",  ephemeral: true})
                const images = new Discord.MessageEmbed()
                .setTitle("Comandi di moderazione del server")
                .setDescription("!ban\nTi permette di bannare un utente dal server\n!clear\nTi permette di cancellare dei messaggi\n!kick\nTi permette di espellere un utente dal server\n!lockdown\nTi permette di attivare/disattivare il sistema di lockdown\n!mute\nTi permette di mutare un utente\n!nick\nTi permette di cambiare il nome ad un utente\n!say\nPermette allo staff di annunciare qualcosa\n!slowmode\nTi permette di cambiare lo slowmode del canale in cui scrivi\n!timeout\nTi permette di mettere in timeout un utente\n!unmute\nTi permette di smutare un utente\n!tadd\nTi permette di aggiungere un utente ad un ticket\n!tremove\nTi permette di rimuovere un utente da un ticket\n!tclose\nTi permette di chiudere un ticket")
                .setColor("YELLOW")
                i.update({embeds: [images]})
            }
            if(i.values[0] == "Owner" || i.values[1] == "Owner") {
                if(i.user.id != message.author.id) return i.reply({content: "Non è un tuo menu",  ephemeral: true})
                const images = new Discord.MessageEmbed()
                .setTitle("Comandi del server utilizzabili solo dall'Owner")
                .setDescription("!demote\nTi permette di retrocedere un utente\n!promote\nTi permette di promuovere un utente\n!friend\nTi permette di far diventare un utente un Rogi's Friend\n!unfriend\nTi permette di togliere il Rogi's friend ad un utente\n!shutodown\nPermette di spegnere il bot\n!restart\nPermette di restartare il bot")
                .setColor("YELLOW")
                i.update({embeds: [images]})
            }
            if(i.values[0] == "Pvr" || i.values[1] == "Pvr") {
                if(i.user.id != message.author.id) return i.reply({content: "Non è un tuo menu",  ephemeral: true})
                const images = new Discord.MessageEmbed()
                .setTitle("Comandi delle stanze private del server")
                .setDescription("!pdelete\nTi permette di cancellare la tua stanza privata\n!plimit\nTi permette di dare un limite di utenti alla tua stanza privata\n!plock\nTi permette di bloccare la tua stanza privata\n!punlock\nTi permette di sbloccare la tua stanza privata\n!ppermit\nTi permette di dare il permesso ad un utente di entrare nella tua stanza privata\n!preject\nTi permette di espellere un utente dalla tua stanza privata")
                .setColor("YELLOW")
                i.update({embeds: [images]})
            }
        })
    }
}