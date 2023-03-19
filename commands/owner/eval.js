const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `eval`,
	description: `Esegue un qualsiasi codice javascript sul momento`,
	data: {
		name: `eval`,
		description: `Esegue un codice javascript`,
		options: [
			{
				name: `codice`,
				description: `Il codice da eseguire`,
				type: `STRING`,
				required: true
			}
		]
	},
	permissionlevel: 3,
	allowedchannels: [`ALL`],
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.rolesid.owner) && interaction.guild == config.idServer.idServer) return
		if (interaction.guild == config.idServer.idServerTest && !interaction.member.roles.cache.has(`954438340801884261`)) return
		interaction.deferReply().then(async () => {
			let command = interaction.options.getString(`codice`)
			try {
				let evaled = eval(command)
				let embed = new Discord.MessageEmbed()
					.setColor(`YELLOW`)
					.setTitle(`📦RISULTATO`)
					.addField(`Tipo:`, `\`\`\`prolog\n${typeof evaled}\`\`\``, true)
					.addField(`Entrata:`, `\`\`\`js\n${command}\`\`\``)
					.addField(`Uscita:`, `\`\`\`js\n${evaled} \`\`\``)
				let button = new Discord.MessageButton().setCustomId(`Elimina`).setEmoji(`🗑️`).setStyle(`DANGER`)
				let row = new Discord.MessageActionRow().addComponents(button)
				interaction.editReply({ embeds: [embed], components: [row] })
			} catch (err) {
				let embed = new Discord.MessageEmbed()
					.setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
					.addField(`Entrata:`, `\`\`\`js\n${command}\`\`\``)
					.addField(`Errore:`, `\`\`\`js\n${err}\`\`\``)
					.setColor(`RED`)
				let button = new Discord.MessageButton().setCustomId(`Elimina`).setEmoji(`🗑️`).setStyle(`DANGER`)
				let row = new Discord.MessageActionRow().addComponents(button)
				interaction.editReply({ embeds: [embed], components: [row] })
			}
		})
	}
}