const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `youtube`,
	data: {
		name: `youtube`,
		description: `Mostra il canale youtube di Rogi`,
	},
	permissionlevel: 0,
	allowedchannels: [config.idcanali.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Rogi`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/TzCcl4P.png`)
				.setDescription(`Per aprire il canale **youtube di Rogi**,\npremi il pulsante qui sotto`)
			let row = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton()
					.setLabel(`Vedi Canale`)
					.setStyle(`LINK`)
					.setURL(`https://youtube.com/c/RodariRogi23`)
					.setEmoji(`<:youtube:959490799177977866>`)
			)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 