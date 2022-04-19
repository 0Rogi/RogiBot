const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `help`,
    async execute(message) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Tutti i Comandi`)
            .setColor(`YELLOW`)
            .setDescription(`Usa il **menu** qui sotto per scegliere la categoria di comandi da vedere!`)
            .addField(`🎡GENERAL`, `Comandi generali`)
            .addField(`🔨Moderation`, `Comandi di moderazione`)
            .addField(`👤Owner`, `Comandi utilizzabili solo dall'owner`)
            .addField(`🔒Stanze Private`, `Comandi delle stanze private`)
            .addField(`Tags:`, `<:StaffTag:942016780363243531> Indica che il comando è utilizzabile solo dallo **staff**\n<:LevelTag:942016432143728691> Indica che il comando si **sblocca** salendo di livello\n<:EventTag:947064431215513610> Indica che il comando è utilizzabile solo durante un determinato evento\n<:BoostTag:948979535796375622> Indica che il comando è utilizzabile anche/solo **boostando il server**`)
            .setThumbnail(message.guild.iconURL())
        let row = new Discord.MessageActionRow()
			.addComponents(new Discord.MessageSelectMenu()
			.setCustomId('select')
			.addOptions([
						{
							label: 'General',
							description: 'Comandi generali',
							value: 'General',
                            emoji: '🎡'
						},
						{
							label: 'Moderation',
							description: 'Comandi di moderazione',
							value: 'Moderation',
                            emoji: '🔨'
						},
                        {
                            label: 'Owner',
                            description: 'Comandi utilizzabili solo dall\'owner',
                            value: 'Owner',
                            emoji: '👤'
                        },
                        {
                            label: 'Stanze Private',
                            description: 'Comandi delle stanze private',
                            value: 'Pvr',
                            emoji: '🔒'
                        }
					]));
        let m = await message.channel.send({ embeds: [embed], components: [row] });
        setTimeout(() => {
            let row = new Discord.MessageActionRow()
			.addComponents(new Discord.MessageSelectMenu()
			.setCustomId('select')
            .addOptions([
                {
                    label: 'Nothing',
                    description: 'Nothing',
                    value: 'Nothing',
                }])
            .setDisabled())
            m.edit({components: [row]})
        }, 300000);
        let collector = m.createMessageComponentCollector()
        collector.on(`collect`, i => {
            if(i.values[0] == `General` || i.values[1] == `General`) {
                if(i.user.id != message.author.id) return i.reply({content: `Non è un tuo menu`,  ephemeral: true})
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Comandi Generali del server`)
                    .setDescription(`**!avatar**\nTi permette di prendere l'avatar di un utente\n**!help**\nTi permette di vedere questo menu\n**!partner**<:StaffTag:942016780363243531>\nTi permette di mandare messaggi in <#915647768943542312>\n**!serverinfo**\nTi permette di vedere informazioni sul server\n**!test**\nTi permette di vedere lo stato dei bot\n**!time**\nTi permette di vedere l'ora attuale\n**!userinfo**\nTi permette di vedere informazioni su un utente\n**!github**\nTi permette di vedere il github di Rogi\n**!instagram**\nTi permette di vedere l'instagram di Rogi\n**!invite**\nTi permette di vedere l'invito del server\n**!tiktok**\nTi permette di vedere il profilo tik tok di Rogi\n**!youtube**\nTi permette di vedere il canale youtube di Rogi\n**!rps**<:LevelTag:942016432143728691><:BoostTag:948979535796375622>\nTi permette di giocare a sasso, carta, forbici con il bot\n**!lyrics**<:LevelTag:942016432143728691><:BoostTag:948979535796375622>\nTi permette di cercare il testo di una canzone\n**!embed**<:LevelTag:942016432143728691><:BoostTag:948979535796375622>\nPer trasformare un testo in un embed\n**!kiss**<:EventTag:947064431215513610>\nPer baciare un utente\n**!ship**<:EventTag:947064431215513610>\nPer vedere la tua compatibilità d'amore con un altro utente\n**!say**<:BoostTag:948979535796375622>\nPer far dire qualcosa al bot\n**!suggest**\nPer fare un suggerimento\n**!meme**\nMostra un meme da reddit\n**!coppercraft**\nMostra alcune informazioni sulla coppercraft`)
                    .setColor(`YELLOW`)
                i.update({embeds: [embed]})
            }
            if(i.values[0] == `Moderation` || i.values[1] == `Moderation`) {
                if(i.user.id != message.author.id) return i.reply({content: `Non è un tuo menu`,  ephemeral: true})
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Comandi di moderazione del server`)
                    .setDescription(`**!ban**<:StaffTag:942016780363243531>\nTi permette di bannare un utente dal server\n**!clear**<:StaffTag:942016780363243531>\nTi permette di cancellare dei messaggi\n**!kick**<:StaffTag:942016780363243531>\nTi permette di espellere un utente dal server\n**!lockdown**<:StaffTag:942016780363243531>\nTi permette di attivare/disattivare il sistema di lockdown\n**!mute**<:StaffTag:942016780363243531>\nTi permette di mutare un utente\n**!nick**<:StaffTag:942016780363243531>\nTi permette di cambiare il nome ad un utente\n**!slowmode**<:StaffTag:942016780363243531>\nTi permette di cambiare lo slowmode del canale in cui scrivi\n**!timeout**<:StaffTag:942016780363243531>\nTi permette di mettere in timeout un utente\n**!untimeout**<:StaffTag:942016780363243531>\nTi permette di togliere il timeout ad un utente\n**!unmute**<:StaffTag:942016780363243531>\nTi permette di smutare un utente\n**!tadd**<:StaffTag:942016780363243531>\nTi permette di aggiungere un utente ad un ticket\n**!tremove**<:StaffTag:942016780363243531>\nTi permette di rimuovere un utente da un ticket\n**!tclose**\nTi permette di chiudere un ticket`)
                    .setColor(`YELLOW`)
                i.update({embeds: [embed]})
            }
            if(i.values[0] == `Owner` || i.values[1] == `Owner`) {
                if(i.user.id != message.author.id) return i.reply({content: `Non è un tuo menu`,  ephemeral: true})
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Comandi del server utilizzabili solo dall'Owner`)
                    .setDescription(`**!demote**<:StaffTag:942016780363243531>\nTi permette di retrocedere un utente\n**!promote**<:StaffTag:942016780363243531>\nTi permette di promuovere un utente\n**!shutdown**<:StaffTag:942016780363243531>\nPermette di spegnere il bot\n**!restart**<:StaffTag:942016780363243531>\nPermette di restartare il bot\n**!eval**<:StaffTag:942016780363243531>\nPermette di eseguire un codice sul momento`)
                    .setColor(`YELLOW`)
                i.update({embeds: [embed]})
            }
            if(i.values[0] == `Pvr` || i.values[1] == `Pvr`) {
                if(i.user.id != message.author.id) return i.reply({content: `Non è un tuo menu`,  ephemeral: true})
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Comandi delle stanze private del server`)
                    .setDescription(`⚠️*Per creare una stanza privata\nti basterà entrare in <#${config.idcanali.proomschannel}>*⚠️\n\n**!pdelete**\nTi permette di cancellare la tua stanza privata\n**!plimit**\nTi permette di dare un limite di utenti alla tua stanza privata\n**!plock**\nTi permette di bloccare la tua stanza privata\n**!punlock**\nTi permette di sbloccare la tua stanza privata\n**!ppermit**\nTi permette di dare il permesso ad un utente di entrare nella tua stanza privata\n**!preject**\nTi permette di espellere un utente dalla tua stanza privata`)
                    .setColor(`YELLOW`)
                i.update({embeds: [embed]})
            }
        })
    }
}