const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
	name: 'meme',
	description: `Cerca un meme da r/memes`,
	data: {
		name: `meme`,
		description: `Mostra un meme casuale da Reddit`,
	},
	permissionlevel: 0,
	allowedchannels: [config.channelsid.commands],
	requirement: `none`,
	async execute(interaction) {

		await interaction.deferReply();

		let url = 'https://www.reddit.com/r/memesITA/hot/.json?limit=100';
		const res = await fetch(url);
		const data = await res.json();

		let index = data.data.children[Math.floor(Math.random() * 99) + 1].data;

		let embed = new Discord.MessageEmbed()
			.setTitle(index.title)
			.setImage(index.url_overridden_by_dest)
			.setFooter({ text: `👍🏻 ${index.ups} | 💭 ${index.num_comments}` })
			.setColor(`YELLOW`);
		let button = new Discord.MessageButton()
			.setEmoji(`➡️`)
			.setCustomId(`NextMeme,${interaction.user.id}`)
			.setStyle(`PRIMARY`);
		let row = new Discord.MessageActionRow().addComponents(button);
		interaction.editReply({ embeds: [embed], components: [row] });
	}
}