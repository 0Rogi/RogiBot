const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
	name: `embed`,
	description: `Trasforma e manda il tuo messagio in un embed`,
	data: {
		name: `embed`,
		description: `Trasforma il tuo messaggio in un embed - Disponibile dal livello 25`,
		options: [
			{
				name: `testo`,
				description: `Il testo da trasformare in embed`,
				type: `STRING`,
				required: true
			},
			{
				name: `color`,
				description: `Il colore dell'embed`,
				type: `STRING`,
				required: false,
				choices: [
					{
						name: 'Rosso',
						value: '#FF0000'
					},
					{
						name: 'Ciano',
						value: '#00FFFF'
					},
					{
						name: 'Blu',
						value: '#0000FF'
					},
					{
						name: 'Viola',
						value: '#800080'
					},
					{
						name: 'Giallo',
						value: '#FFFF00'
					},
					{
						name: 'Lime',
						value: '#00FF00'
					},
					{
						name: 'Magenta',
						value: '#FF00FF'
					},
					{
						name: 'Bianco',
						value: '#FFFFFF'
					},
					{
						name: 'Argento',
						value: '#C0C0C0'
					},
					{
						name: 'Grigio',
						value: '#808080'
					},
					{
						name: 'Nero',
						value: '#000000'
					},
					{
						name: 'Arancione',
						value: '#FFA500'
					},
					{
						name: 'Marrone',
						value: '#A52A2A'
					},
					{
						name: 'Verde',
						value: '#008000'
					},
					{
						name: 'Oliva',
						value: '#808000'
					}
				]
			}
		]
	},
	permissionlevel: 0,
	allowedchannels: [`ALL`],
	requirement: `Level 25`,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.level25) && !interaction.member.roles.cache.has(config.idruoli.level30) && !interaction.member.roles.cache.has(config.idruoli.level40) && !interaction.member.roles.cache.has(config.idruoli.level50) && !interaction.member.roles.cache.has(config.idruoli.level60) && !interaction.member.roles.cache.has(config.idruoli.level70) && !interaction.member.roles.cache.has(config.idruoli.level80) && !interaction.member.roles.cache.has(config.idruoli.level90) && !interaction.member.roles.cache.has(config.idruoli.level100) && !interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Errore`)
				.setDescription(`*Devi avere almeno il livello 25 per usare questo comando!*`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogierror);
			interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		interaction.deferReply().then(() => {
			let text = interaction.options.getString(`testo`);

			if (text.length > 4096) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*Testo troppo lungo!\npuoi usare massimo 4096 caratteri!*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror);
				interaction.editReply({ embeds: [embed] });
				return;
			}

			let embed1 = new Discord.MessageEmbed()
				.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
				.setColor(interaction.options.getString(`color`) || `YELLOW`)
				.setDescription(text.toString());
			interaction.editReply({ embeds: [embed1] });
		})
	}
}