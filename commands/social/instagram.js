module.exports = {
	name: `instagram`,
	data: {
		name: `instagram`,
		description: `Mostra il profilo instagram di Rogi`,
	},
	permissionlevel: 0,
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
					.setEmoji(`<:instagram:965929929147572274>`)
			)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 