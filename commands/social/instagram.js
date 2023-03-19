const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `instagram`,
	description: `Mostra il profilo instagram di Rogi`,
	data: {
		name: `instagram`,
		description: `Mostra il profilo instagram di Rogi`,
	},
	permissionlevel: 0,
	allowedchannels: [config.channelsid.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`@rogi23yt`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/OyRzb6h.png`)
				.setDescription(`Per aprire il profilo **instagram di Rogi**,\npremi il pulsante qui sotto`)
			let row = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton()
					.setLabel(`Vedi Profilo`)
					.setStyle(`LINK`)
					.setURL(`https://www.instagram.com/rogi23yt/`)
					.setEmoji(`<:instagram:1086952178234699836>`)
			)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 