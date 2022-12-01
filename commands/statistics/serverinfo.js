const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `serverinfo`,
	description: `Mostra informazioni su questo server`,
	data: {
		name: `serverinfo`,
		description: `Mostra informazioni sul server`,
	},
	permissionlevel: 0,
	allowedchannels: [config.idcanali.commands],
	requirement: `none`,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let server = interaction.guild;

			let embed = new Discord.MessageEmbed()
				.setTitle(server.name.toString())
				.setThumbnail(server.iconURL({ dynamic: true }))
				.setColor(`YELLOW`)
				.setDescription(server.description?.toString() || `_Nessuna Descrizione_`)
				.addField(`👑 Owner:`, client.users.cache.get(server.ownerId).toString(), true)
				.addField(`\u200b`, `\u200b`, true)
				.addField(`🚨 Server ID:`, server.id.toString(), true);
			let button1 = new Discord.MessageButton()
				.setLabel(`Più Informazioni`)
				.setStyle(`PRIMARY`)
				.setEmoji(`⬇️`)
				.setCustomId(`serverinfoplus,${interaction.member.id}`);
			let row = new Discord.MessageActionRow()
				.addComponents(button1);

			interaction.editReply({ embeds: [embed], components: [row] });
		})
	}
} 