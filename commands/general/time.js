module.exports = {
	name: `time`,
	data: {
		name: `time`,
		description: `Mostra l'ora attuale`,
	},
	permissionlevel: 0,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let date = new Date()
			if (date.getMonth() == 3 && date.getDate() == 1) {
				let embed = new Discord.MessageEmbed()
					.setColor(`YELLOW`)
					.addField(`Orario`, `⏰Sono le ore **__104:69__**😏`)
				interaction.editReply({ embeds: [embed] })
				setTimeout(() => {
					let hours = date.getHours()
					let min = date.getMinutes()
					if (min < 10) min = `0${min}`
					if (hours < 10) hours = `0${hours}`
					let embed = new Discord.MessageEmbed()
						.setColor(`YELLOW`)
						.addField(`Orario`, `⏰Sono le ore ${hours}:${min}`)
					interaction.editReply({ embeds: [embed] })
				}, 1000 * 10)
				return
			}
			let hours = date.getHours()
			let min = date.getMinutes()
			if (min < 10) min = `0${min}`
			if (hours < 10) hours = `0${hours}`
			let embed = new Discord.MessageEmbed()
				.setColor(`YELLOW`)
				.addField(`Orario`, `⏰Sono le ore ${hours}:${min}`)
			interaction.editReply({ embeds: [embed] })
		})
	}
}