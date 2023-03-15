const config = require(`${process.cwd()}/JSON/config.json`);
const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`);

module.exports = {
    name: `messageCreate`,
    async execute(message) {
        const permissionlevel = await getUserPermissionLevel(message.member);
        if (permissionlevel > 0) {
            database.collection(`Staff`).find({ id: message.author.id }).toArray(function (err, result) {
                if (!result[0]) {
                    database.collection(`Staff`).insertOne({ username: message.author.username, id: message.author.id, rank: ``, messages: 1, vctime: 0, actions: 0 });
                } else if (result[0]) {
                    database.collection(`Staff`).updateOne({ id: message.author.id }, {
                        $inc: {
                            messages: 1,
                        }
                    })
                }
            });
        }
    }
}