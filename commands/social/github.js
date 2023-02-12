const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `github`,
	description: `Mostra il profilo github di Rogi`,
	data: {
		name: `github`,
		description: `Mostra il profilo github di Rogi`,
	},
	permissionlevel: 0,
	allowedchannels: [config.channelsid.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`<:github:965343329913045042>Github`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/SllkUVy.png`)
				.setDescription(`Per aprire il profilo **github di Rogi**,\npremi il pulsante qui sotto`)
			let row = new Discord.MessageActionRow().addComponents(
				new Discord.MessageButton()
					.setLabel(`Vedi Profilo`)
					.setStyle(`LINK`)
					.setURL(`https://github.com/0Rogi`)
					.setEmoji(`<:github:965343329913045042>`)
			)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
} 