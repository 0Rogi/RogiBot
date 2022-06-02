const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
	name: `channelDelete`,
	execute(channel) {
		if (channel.guild != config.idServer.idServer) return
		if (channel.parent != config.idcanali.helpparent) return
		database.collection(`Tickets`).deleteOne({ channel: channel.id })
	}
}