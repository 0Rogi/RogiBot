module.exports = {
	name: `tiktok`,
	data: {
		name: `tiktok`,
		description: `Mostra il profilo tiktok di Rogi`,
	},
	permissionlevel: 0,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`rogi23yt`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/DE6hAjE.png`)
				.setDescription(`Per aprire il profilo **tiktok di Rogi**,\npremi il pulsante qui sotto`)
			let row = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton()
					.setLabel(`Vedi Profilo`)
					.setStyle(`LINK`)
					.setURL(`https://www.tiktok.com/@rogi23yt?`)
					.setEmoji(`<:tiktok:959490766747611166>`)
			)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 