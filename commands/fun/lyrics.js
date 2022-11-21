const lyricsFinder = require(`lyrics-finder`);
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
	name: `lyrics`,
	description: `Cerca il testo di una qualsiasi canzone`,
	data: {
		name: `lyrics`,
		description: `Mostra il testo di una canzone - Disponibile dal livello 20`,
		options: [
			{
				name: `canzone`,
				description: `La canzone di cui cercare il testo`,
				type: `STRING`,
				required: true
			}
		]
	},
	permissionlevel: 0,
	allowedchannels: [config.idcanali.commands],
	requirement: `Level 20`,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.level20) && !interaction.member.roles.cache.has(config.idruoli.level25) && !interaction.member.roles.cache.has(config.idruoli.level30) && !interaction.member.roles.cache.has(config.idruoli.level40) && !interaction.member.roles.cache.has(config.idruoli.level50) && !interaction.member.roles.cache.has(config.idruoli.level60) && !interaction.member.roles.cache.has(config.idruoli.level70) && !interaction.member.roles.cache.has(config.idruoli.level80) && !interaction.member.roles.cache.has(config.idruoli.level90) && !interaction.member.roles.cache.has(config.idruoli.level100) && !interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.idruoli.allrewards)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Errore`)
				.setDescription(`*Devi avere almeno il livello 20 per usare questo comando!*`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogierror);
			interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		interaction.deferReply().then(async () => {
			let lyrics = (await lyricsFinder(interaction.options.getString(`canzone`))) || `Error`
			if (lyrics.length > 4096) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*La canzone è troppo lunga\nper essere visualizzata*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror);
				interaction.editReply({ embeds: [embed] });
				return;
			}

			if (lyrics == `Error`) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`Errore`)
					.setDescription(`*Non riesco a trovare questa canzone*`)
					.setColor(`RED`)
					.setThumbnail(config.images.rogierror);
				interaction.editReply({ embeds: [embed] });
				return;
			}

			let embed = new Discord.MessageEmbed()
				.setTitle(interaction.options.getString(`canzone`))
				.setDescription(lyrics.toString())
				.setColor(`YELLOW`);
			interaction.editReply({ embeds: [embed] });
		})
	}
}