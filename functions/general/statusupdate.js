module.exports = function statusUpdate() {
    let status = [`/help`, `/ban kai`, `/depex BLuu`, `/mute Gabvy`, `/tiktok`, `/youtube`, `/kick Light`, `/meme`, `/suggest`, `/skin`, `/question`, `/snipe`];
    let random = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[random]);
}