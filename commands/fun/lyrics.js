const Genius = require("genius-lyrics");
const Client = new Genius.Client();
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
	allowedchannels: [config.channelsid.commands],
	requirement: `Level 20`,
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(config.rolesid.level20) && !interaction.member.roles.cache.has(config.rolesid.level25) && !interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
				.setDescription(`*Devi avere almeno il livello 20 per usare questo comando!*`)
				.setColor(`RED`);
			interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		await interaction.deferReply();

		const searches = await Client.songs.search(interaction.options.getString(`canzone`));
		const song = searches[0];

		if (!song) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
				.setDescription(`*Non riesco a trovare questa canzone*`)
				.setColor(`RED`);
			interaction.editReply({ embeds: [embed] });
			return;
		}

		const lyrics = await song.lyrics();

		let embed = new Discord.MessageEmbed()
			.setTitle(interaction.options.getString(`canzone`).toUpperCase())
			.setDescription(lyrics.toString().slice(0, 4096))
			.setColor(`YELLOW`);
		interaction.editReply({ embeds: [embed] });
	}
}