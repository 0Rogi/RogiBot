const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `shutdown`,
	description: `Spegne il bot`,
	data: {
		name: `shutdown`,
		description: `Spegne il bot`,
	},
	permissionlevel: 4,
	allowedchannels: [`ALL`],
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.rolesid.owner)) return;
		interaction.deferReply().then(async () => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Shutdown`)
				.setDescription(`Il bot è stato **spento** con successo!\nOra nessun comando funzionerà più`)
				.setColor(`RED`);
			console.clear()
			console.error(`SPEGNIMENTO DEL BOT`)
			await interaction.editReply({ embeds: [embed] })
			client.destroy()
		})
	}
}