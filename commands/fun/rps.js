const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `rps`,
	data: {
		name: `rps`,
		description: `Gioca a sasso, carta, forbice con il bot - Disponibile dal livello 15`,
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
						value: 'paper'
					}
				]
			}
		]
	},
	permissionlevel: 0,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.level5) && !interaction.member.roles.cache.has(config.idruoli.level10) && !interaction.member.roles.cache.has(config.idruoli.level15) && !interaction.member.roles.cache.has(config.idruoli.level20) && !interaction.member.roles.cache.has(config.idruoli.level25) && !interaction.member.roles.cache.has(config.idruoli.level30) && !interaction.member.roles.cache.has(config.idruoli.level40) && !interaction.member.roles.cache.has(config.idruoli.level50) && !interaction.member.roles.cache.has(config.idruoli.level60) && !interaction.member.roles.cache.has(config.idruoli.level70) && !interaction.member.roles.cache.has(config.idruoli.level80) && !interaction.member.roles.cache.has(config.idruoli.level90) && !interaction.member.roles.cache.has(config.idruoli.level100) && !interaction.member.roles.cache.has(config.idruoli.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`Errore`)
				.setDescription(`*Devi avere almeno il livello 5 per usare questo comando!*`)
				.setColor(`RED`)
				.setThumbnail(config.images.rogierror)
			interaction.reply({ embeds: [embed], ephemeral: true })
			return
		}
		interaction.deferReply().then(() => {
			let choice = interaction.options.getString(`scelta`)
			let rps = [`rock`, `paper`, `scissor`]
			let answer = Math.floor(Math.random() * rps.length)
			let title = ``
			if (choice == `rock` && rps[answer] == `rock`) title = `Pareggio`
			if (choice == `rock` && rps[answer] == `paper`) title = `Hai perso`
			if (choice == `paper` && rps[answer] == `rock`) title = `Hai vinto`
			if (choice == `paper` && rps[answer] == `paper`) title = `Pareggio`
			if (choice == `paper` && rps[answer] == `scissor`) title = `Hai perso`
			if (choice == `scissor` && rps[answer] == `paper`) title = `Hai vinto`
			if (choice == `scissor` && rps[answer] == `scissor`) title = `Pareggio`
			if (choice == `scissor` && rps[answer] == `rock`) title = `Hai perso`
			if (choice == `rock` && rps[answer] == `scissor`) title = `Hai vinto`
			let descriptionuser = ``
			if (choice == `rock`) descriptionuser = `🪨Pietra`
			if (choice == `scissor`) descriptionuser = `✂️Forbici`
			if (choice == `paper`) descriptionuser = `📰Carta`
			let descriptionbot = ``
			if (rps[answer] == `rock`) descriptionbot = `🪨Pietra`
			if (rps[answer] == `scissor`) descriptionbot = `✂️Forbici`
			if (rps[answer] == `paper`) descriptionbot = `📰Carta`
			let embed = new Discord.MessageEmbed()
				.setTitle(title.toString())
				.setDescription(`Risposta di ${interaction.member}:\n**${descriptionuser.toString()}**\nRisposta BOT:\n**${descriptionbot}**`)
				.setColor(`YELLOW`)
				.setThumbnail(`https://i.imgur.com/FydhJ7f.png`)
			interaction.editReply({ embeds: [embed] })
		})
	}
}