const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `suggestion`,
	description: `Fai un suggerimento al server/a Rogi in generale`,
	data: {
		name: `suggestion`,
		description: `Fai un suggerimento`,
		options: [
			{
				name: `suggerimento`,
				description: `Il suggerimento che vuoi fare`,
				type: `STRING`,
				required: true
			}
		],
	},
	permissionlevel: 0,
	allowedchannels: [config.idcanali.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let suggestion = interaction.options.getString(`suggerimento`)
			if (suggestion.length > 1024) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*Testo troppo lungo!\npuoi usare massimo 1024 caratteri!*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror)
				interaction.editReply({ embeds: [embed] })
				return
			}
			let embed1 = new Discord.MessageEmbed()
				.setTitle(`⁉️Nuovo Suggerimento⁉️`)
				.setDescription(`Suggerimento da ${interaction.member.toString()}`)
				.setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
				.addField(`📉Stato:`, `⚪In attesa...`)
				.addField(`💡Suggerimento:`, suggestion.toString())
				.setColor(`#2f3136`)
				.setFooter({ text: `User ID: ${interaction.user.id}` })
			let embed2 = new Discord.MessageEmbed()
				.setTitle(`💡Suggerimento`)
				.setDescription(
					`Il tuo suggerimento è stato mandato allo **staff**.\nAttendi che venga **approvato/rifiutato**.`
				)
				.addField(`Suggerimento:`, suggestion.toString())
				.setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
				.setColor(`YELLOW`)
			let button1 = new Discord.MessageButton()
				.setLabel(`Accetta`)
				.setCustomId(`SuggestAccept`)
				.setStyle(`SUCCESS`)
			let button2 = new Discord.MessageButton()
				.setLabel(`Rifiuta`)
				.setCustomId(`SuggestRefuse`)
				.setStyle(`DANGER`)
			let row = new Discord.MessageActionRow().addComponents(button1, button2)
			client.channels.cache.get(config.idcanali.suggests).send({ embeds: [embed1], components: [row] })
			interaction.editReply({ embeds: [embed2] })
		})
	}
}