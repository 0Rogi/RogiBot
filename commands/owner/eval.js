const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `eval`,
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
	permissionlevel: 4,
	execute(interaction) {
		if (!interaction.member.roles.cache.has(config.idruoli.owner) && interaction.guild == config.idServer.idServer) return
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
					.setTitle(`Errore`)
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