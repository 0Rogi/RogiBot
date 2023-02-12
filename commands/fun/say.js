const config = require(`${process.cwd()}/JSON/config.json`);
const badwords = require(`${process.cwd()}/JSON/badwords.json`);

module.exports = {
	name: `say`,
	description: `Fa dire una qualsiasi cosa al bot`,
	data: {
		name: `say`,
		description: `Fa dire qualcosa al bot - Disponibile solo boostando il server`,
		options: [
			{
				name: `normal`,
				description: `Fa dire qualcosa al bot - Disponibile solo boostando il server`,
				type: `SUB_COMMAND`,
				options: [
					{
						name: `testo`,
						description: `Il testo che il bot deve scrivere`,
						type: `STRING`,
						required: true
					}
				]
			},
			{
				name: `reverse`,
				description: `Fa dire qualcosa al bot, al contrario - Disponibile solo boostando il server`,
				type: `SUB_COMMAND`,
				options: [
					{
						name: `testo`,
						description: `Il testo che il bot deve scrivere al contrario`,
						type: `STRING`,
						required: true
					}
				]
			}
		]
	},
	permissionlevel: 0,
	allowedchannels: [`ALL`],
	requirement: `Server Booster`,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.rolesid.serverbooster) && !interaction.member.permissions.has(`ADMINISTRATOR`) && !interaction.member.roles.cache.has(config.rolesid.passallrewards)) {
			let embed = new Discord.MessageEmbed()
				.setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
				.setDescription(`*Devi boostare il server per usare questo comando!*`)
				.setColor(`RED`);
			interaction.reply({ embeds: [embed], ephemeral: true });
			return;
		}

		interaction.deferReply({ ephemeral: true }).then(async () => {
			let text = interaction.options.getString(`testo`)
			if (text.length > 2000) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
					.setDescription(`*Testo troppo lungo!\npuoi usare massimo 2000 caratteri!*`)
					.setColor(`RED`);
				interaction.editReply({ embeds: [embed] });
				return;
			}

			let send = true
			await badwords.forEach(b => {
				text = text.replace(/\_/g, ``)
				text = text.replace(/\*/g, ``)
				text = text.replace(/\`/g, ``)
				text = text.replace(/\~\~/g, ``)
				text = text.replace(/\|\|/g, ``)
				if (text.toLowerCase().includes(b)) send = false
			})

			if (!send) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
					.setDescription(`*Non puoi mandare parolacce con /say!\nRicorda di rispettare le regole!*`)
					.setColor(`RED`);
				interaction.editReply({ embeds: [embed] });
				return;
			}

			text = interaction.options.getString(`testo`);

			let embed = new Discord.MessageEmbed()
				.setTitle(`Messaggio Mandato`)
				.setDescription(`Il tuo messaggio **è stato mandato** con successo!`)
				.setColor(`GREEN`);
			let embedlog = new Discord.MessageEmbed()
				.setTitle(`/SAY NORMAL`)
				.addField(`👤 Utente:`, `Nome: ${interaction.user.username}, ID: ${interaction.user.id}\n||${interaction.user.toString()}||`)
				.addField(`📖 Contenuto:`, text.toString())
				.addField(`⚓ Canale:`, interaction.channel.toString())
				.setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
				.setColor(`YELLOW`);
			if (interaction.options.getSubcommand() == `reverse`) {
				let array = text.split("");
				array = array.reverse();
				text = ``;
				array.forEach(c => { text += c });
				embedlog.setTitle(`/SAY REVERSE`);
			}
			interaction.channel.send(text);
			interaction.editReply({ embeds: [embed], ephemeral: true });
			client.channels.cache.get(config.channelsid.logs.messages.say).send({ embeds: [embedlog] });
		})
	}
}