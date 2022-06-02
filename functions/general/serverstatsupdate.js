module.exports = function serverstatsupdate() {
    database.collection('ServerStats').find().toArray(function (err, result) {
        serverstats = result[0]
    })
}