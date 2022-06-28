const config = require(`${process.cwd()}/JSON/config.json`)
const badwords = require(`${process.cwd()}/JSON/badwords.json`)

module.exports = {
	name: `say`,
	data: {
		name: `say`,
		description: `Fa dire qualcosa al bot - Disponibile solo boostando il server`,
		options: [
			{
				name: `testo`,
				description: `Il testo da trasformare che il bot deve dire`,
				type: `STRING`,
				required: true
			}
		]
	},
	permissionlevel: 0,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Errore`)
				.setDescription(`*Devi boostare il server per usare questo comando!*`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogierror)
			interaction.reply({ embeds: [embed], ephemeral: true })
			return
		}
		interaction.deferReply({ ephemeral: true }).then(async () => {
			let text = interaction.options.getString(`testo`)
			if (text.length > 2000) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*Testo troppo lungo!\npuoi usare massimo 2000 caratteri!*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror)
				interaction.editReply({ embeds: [embed] })
				return
			}
			let send = true
			await badwords.forEach(b => {
				text = text.replace(/\_/g, ``)
				text = text.replace(/\*/g, ``)
				text = text.replace(/\`/g, ``)
				text = text.replace(/\~\~/g, ``)
				text = text.replace(/\|\|/g, ``)
				if (text.toLowerCase().includes(b)) send = false
			})
			if (!send) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*Non puoi mandare parolacce con /say!\nRicorda di rispettare le regole!*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror)
				interaction.editReply({ embeds: [embed] })
				return
			}
			text = interaction.options.getString(`testo`)
			let embed = new Discord.MessageEmbed()
				.setTitle(`Messaggio Mandato`)
				.setDescription(`Il tuo messaggio **è stato mandato** con successo!`)
				.setColor(`GREEN`)
			let embedlog = new Discord.MessageEmbed()
				.setTitle(`/SAY`)
				.addField(`👤 Utente:`, `Nome: ${interaction.user.username}, ID: ${interaction.user.id}\n||${interaction.user.toString()}||`)
				.addField(`📖 Contenuto:`, text.toString())
				.addField(`⚓ Canale:`, interaction.channel.toString())
				.setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
				.setColor(`YELLOW`)
			interaction.channel.send(text)
			interaction.editReply({ embeds: [embed], ephemeral: true })
			client.channels.cache.get(config.idcanali.logs.messages.say).send({ embeds: [embedlog] })
		})
	}
}