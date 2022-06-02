const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `embed`,
	data: {
		name: `embed`,
		description: `Trasforma il tuo messaggio in un embed - Disponibile dal livello 25`,
		options: [
			{
				name: `testo`,
				description: `Il testo da trasformare in embed`,
				type: `STRING`,
				required: true
			}
		]
	},
	permissionlevel: 0,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.level25) && !interaction.member.roles.cache.has(config.idruoli.level30) && !interaction.member.roles.cache.has(config.idruoli.level40) && !interaction.member.roles.cache.has(config.idruoli.level50) && !interaction.member.roles.cache.has(config.idruoli.level60) && !interaction.member.roles.cache.has(config.idruoli.level70) && !interaction.member.roles.cache.has(config.idruoli.level80) && !interaction.member.roles.cache.has(config.idruoli.level90) && !interaction.member.roles.cache.has(config.idruoli.level100) && !interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Errore`)
				.setDescription(`*Devi avere almeno il livello 25 per usare questo comando!*`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogierror)
			interaction.reply({ embeds: [embed], ephemeral: true })
			return
		}
		interaction.deferReply().then(() => {
			let text = interaction.options.getString(`testo`)
			if (text.length > 4096) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*Testo troppo lungo!\npuoi usare massimo 4096 caratteri!*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror)
				interaction.editReply({ embeds: [embed] })
				return
			}
			let embed1 = new Discord.MessageEmbed()
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
				.setColor(`YELLOW`)
				.setDescription(text.toString())
			interaction.editReply({ embeds: [embed1] })
		})
	}
}