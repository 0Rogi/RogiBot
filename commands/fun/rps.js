const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
	name: `rps`,
	description: `Gioca a sasso, carta, forbice con il bot`,
	data: {
		name: `rps`,
		description: `Gioca a sasso, carta, forbice con il bot - Disponibile dal livello 5`,
		options: [
			{
				name: `scelta`,
				description: `Scegli sasso, carta o forbice`,
				type: `STRING`,
				required: true,
				choices: [
					{
						name: 'Sasso',
						value: 'rock'
					},
					{
						name: 'Carta',
						value: 'paper'
					},
					{
						name: 'Forbice',
						value: 'scissor'
					}
				]
			}
		]
	},
	permissionlevel: 0,
	allowedchannels: [config.channelsid.commands],
	requirement: `Level 5`,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.rolesid.level5) && !interaction.member.roles.cache.has(config.rolesid.level10) && !interaction.member.roles.cache.has(config.rolesid.level15) && !interaction.member.roles.cache.has(config.rolesid.level20) && !interaction.member.roles.cache.has(config.rolesid.level25) && !interaction.member.roles.cache.has(config.rolesid.level30) && !interaction.member.roles.cache.has(config.rolesid.level40) && !interaction.member.roles.cache.has(config.rolesid.level50) && !interaction.member.roles.cache.has(config.rolesid.level60) && !interaction.member.roles.cache.has(config.rolesid.level70) && !interaction.member.roles.cache.has(config.rolesid.level80) && !interaction.member.roles.cache.has(config.rolesid.level90) && !interaction.member.roles.cache.has(config.rolesid.level100) && !interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
				.setDescription(`*Devi avere almeno il livello 5 per usare questo comando!*`)
				.setColor(`RED`);
			interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		interaction.deferReply().then(() => {

			let choice = interaction.options.getString(`scelta`);
			let rps = [`rock`, `paper`, `scissor`];
			let answer = Math.floor(Math.random() * rps.length);
			let title = ``;

			if (choice == `rock` && rps[answer] == `rock`) title = `🙎‍♂️ Pareggio 🕴`;
			if (choice == `rock` && rps[answer] == `paper`) title = `😦 Hai perso 😢`;
			if (choice == `paper` && rps[answer] == `rock`) title = `🥳 Hai vinto 🎉`;
			if (choice == `paper` && rps[answer] == `paper`) title = `🙎‍♂️ Pareggio 🕴`;
			if (choice == `paper` && rps[answer] == `scissor`) title = `😦 Hai perso 😢`;
			if (choice == `scissor` && rps[answer] == `paper`) title = `🥳 Hai vinto 🎉`;
			if (choice == `scissor` && rps[answer] == `scissor`) title = `🙎‍♂️ Pareggio 🕴`;
			if (choice == `scissor` && rps[answer] == `rock`) title = `😦 Hai perso 😢`;
			if (choice == `rock` && rps[answer] == `scissor`) title = `🥳 Hai vinto 🎉`;

			let descriptionuser = ``;
			if (choice == `rock`) descriptionuser = `🪨 Pietra`;
			if (choice == `scissor`) descriptionuser = `✂️ Forbici`;
			if (choice == `paper`) descriptionuser = `📰 Carta`;

			let descriptionbot = ``;
			if (rps[answer] == `rock`) descriptionbot = `🪨 Pietra`;
			if (rps[answer] == `scissor`) descriptionbot = `✂️ Forbici`;
			if (rps[answer] == `paper`) descriptionbot = `📰 Carta`;

			let embed = new Discord.MessageEmbed()
				.setTitle(title.toString())
				.setDescription(`Risposta di ${interaction.member}:\n**${descriptionuser.toString()}**\nRisposta BOT:\n**${descriptionbot}**`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/FydhJ7f.png`);
			interaction.editReply({ embeds: [embed] });
		})
	}
}