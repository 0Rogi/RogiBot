module.exports = {
	name: `channelinfo`,
	data: {
		name: `channelinfo`,
		description: `Mostra informazioni su un canale`,
		options: [
			{
				name: `canale`,
				description: `La stanza di cui mostrare le informazioni`,
				type: `CHANNEL`,
				required: false
			}
		],
	},
	permissionlevel: 0,
	execute(interaction) {
		interaction.deferReply().then(() => {
			let channel = interaction.options.getChannel(`canale`) || interaction.channel
			let embed = new Discord.MessageEmbed()
				.setTitle(channel.name)
				.setColor(`YELLOW`)
				.setDescription(channel.topic ? channel.topic : ``)
			switch (channel.type) {
				case `GUILD_TEXT`: {
					embed.addField(`📡Tipo:`, `Testuale`, true)
				} break
				case `GUILD_VOICE`: {
					embed.addField(`📡Tipo:`, `Vocale`, true)
				} break
				case `GUILD_CATEGORY`: {
					embed.addField(`📡Tipo:`, `Categoria`, true)
				} break
				case `GUILD_NEWS`: {
					embed.addField(`📡Tipo:`, `Notizie`, true)
				} break
				case `GUILD_NEWS_THREAD`: {
					embed.addField(`📡Tipo:`, `Thread in un canale notizie`, true)
				} break
				case `GUILD_PUBLIC_THREAD`: {
					embed.addField(`📡Tipo:`, `Thread Pubblico`, true)
				} break
				case `GUILD_PRIVATE_THREAD`: {
					embed.addField(`📡Tipo:`, `Thread Privato`, true)
				} break
				case `GUILD_STAGE_VOICE`: {
					embed.addField(`📡Tipo:`, `Stage`, true)
				} break
			}
			embed.addField(`\u200b`, `\u200b`, true).addField(`ID:`, channel.id.toString(), true)
			let button1 = new Discord.MessageButton()
				.setLabel(`Più Informazioni`)
				.setStyle(`PRIMARY`)
				.setEmoji(`⬇️`)
				.setCustomId(`channelinfoplus,${interaction.member.id}`)
			let row = new Discord.MessageActionRow().addComponents(button1)
			interaction.editReply({ embeds: [embed], components: [row] })
		})
	}
}