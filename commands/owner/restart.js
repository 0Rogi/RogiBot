const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `restart`,
	data: {
		name: `restart`,
		description: `Restarta il bot`,
	},
	permissionlevel: 4,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.owner)) return;
		interaction.deferReply().then(async () => {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Restart`)
				.setDescription(`Il bot è in fase di **restart**!!\nA breve tornerà online!`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogirestart)
			console.clear()
			console.error(`Restart del bot...`)
			await interaction.editReply({ embeds: [embed] })
			process.exit()
		})
	}
}