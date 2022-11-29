const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `roleinfo`,
	description: `Mostra informazioni su un ruolo del server`,
	data: {
		name: `roleinfo`,
		description: `Mostra informazioni su un ruolo`,
		options: [
			{
				name: `ruolo`,
				description: `Il ruolo di cui mostrare le informazioni`,
				type: `ROLE`,
				required: true
			}
		],
	},
	permissionlevel: 0,
	allowedchannels: [config.idcanali.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let role = interaction.options.getRole(`ruolo`)
			let embed = new Discord.MessageEmbed()
				.setTitle(role.name)
				.setColor(role.hexColor ? role.hexColor : `YELLOW`)
				.addField(`📛Nome:`, role.name, true)
				.addField(`\u200b`, `\u200b`, true)
				.addField(`🚨ID:`, role.id.toString(), true)
			let button1 = new Discord.MessageButton()
				.setLabel(`Più Informazioni`)
				.setStyle(`PRIMARY`)
				.setEmoji(`⬇️`)
				.setCustomId(`roleinfoplus,${interaction.member.id}`)
			let row = new Discord.MessageActionRow().addComponents(button1)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 