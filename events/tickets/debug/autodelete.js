const config = require(`${process.cwd()}/JSON/config.json`)

setInterval(() => {
	database.collection(`Tickets`).find().toArray(function (err, result) {
		if (!result[0]) return;
		if (result[0]) {
			let ticket = client.guilds.cache.get(config.idServer.idServer).channels.cache.find((x) => x.id == result[0].channel)
			if (!ticket) database.collection(`Tickets`).deleteOne({ channel: result[0].channel })
		}
	})
}, 1000 * 60)