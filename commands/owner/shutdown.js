const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `shutdown`,
	data: {
		name: `shutdown`,
		description: `Spegne il bot`,
	},
	permissionlevel: 4,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.owner)) return;
		interaction.deferReply().then(async () => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Shutdown`)
				.setDescription(`Il bot è stato **spento** con successo!\nOra nessun comando funzionerà più`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogishutdown)
			console.clear()
			console.error(`SPEGNIMENTO DEL BOT`)
			await interaction.editReply({ embeds: [embed] })
			client.destroy()
		})
	}
}