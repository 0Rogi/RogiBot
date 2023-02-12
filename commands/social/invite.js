const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `invite`,
	description: `Mostra l'invito del server`,
	data: {
		name: `invite`,
		description: `Mostra l'invito del server`,
	},
	permissionlevel: 0,
	allowedchannels: [config.channelsid.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Invito del server`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/cTEqUGN.png`)
				.setDescription(`Ecco a te il **link d'invito del server** da poter condividere con chiunque tu voglia:\n\n✉️ https://discord.gg/cRXca9N5Kv ✉️`)
			interaction.editReply({ embeds: [embed] })
		})
	}
} 