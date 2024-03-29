const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `youtube`,
	description: `Mostra il canale youtube di Rogi`,
	data: {
		name: `youtube`,
		description: `Mostra il canale youtube di Rogi`,
	},
	permissionlevel: 0,
	allowedchannels: [config.channelsid.commands],
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
					.setURL(`youtube.com/@0Rogi`)
					.setEmoji(`<:youtube:1086951837808197672>`)
			)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 