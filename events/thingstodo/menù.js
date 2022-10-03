const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
	name: `interactionCreate`,
	async execute(interaction) {
		if (!interaction.isSelectMenu() || interaction.guild != config.idServer.idServer) return

		if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
		if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

		if (interaction.customId == `Thingstodo`) {
			if (interaction.values[0] == `Todo` || interaction.values[1] == `Todo`) {
				let embed = new Discord.MessageEmbed()
					.setColor(`WHITE`)
					.addField(`Stato:`, `🔲Da fare...`)
					.addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
				await interaction.update({ embeds: [embed] })
				if (interaction.message.pinned) interaction.message.unpin()
			}
			if (interaction.values[0] == `Completed` || interaction.values[1] == `Completed`) {
				let embed = new Discord.MessageEmbed()
					.setColor(`GREEN`)
					.addField(`Stato:`, `🟩Completato`)
					.addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
				await interaction.update({ embeds: [embed] })
				if (interaction.message.pinned) interaction.message.unpin()
			}
			if (interaction.values[0] == `Important` || interaction.values[1] == `Important`) {
				let embed = new Discord.MessageEmbed()
					.setColor(`RED`)
					.addField(`Stato:`, `🟥Importante`)
					.addField(`Thing to do:`, interaction.message.embeds[0].fields[1].value)
				interaction.update({ embeds: [embed] }).then(async () => {
					if (!interaction.message.pinned) {
						await interaction.message.pin()
						interaction.channel.bulkDelete(1)
					}
				})
			}
			if (interaction.values[0] == `Delete` || interaction.values[1] == `Delete`) {
				let message = interaction.message
				message.delete()
			}
		}
	}
}