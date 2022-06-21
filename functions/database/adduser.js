module.exports = async function adduser(user) {
    database.collection(`users`).insertOne({
        name: user.user.username,
        id: user.id,
        roles: user._roles
    })
}