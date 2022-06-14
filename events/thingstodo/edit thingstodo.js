const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
	name: `messageCreate`,
	execute(message) {
		if (message.channel == config.idcanali.thingstodo && message.guild == config.idServer.idServer) {
			if (message.author.bot || !message.content || !message.reference) return

			if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
			if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

			message.channel.messages.fetch(message.reference.messageId).then((msg) => {
				let embed = new Discord.MessageEmbed()
					.addField(msg.embeds[0].fields[0].name, msg.embeds[0].fields[0].value)
					.addField(msg.embeds[0].fields[1].name, message.content.toString())
					.setColor(msg.embeds[0].color)
				message.delete()
				msg.edit({ embeds: [embed] })
			})
		}
	}
}