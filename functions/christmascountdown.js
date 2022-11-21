module.exports = function christmascountdown() {

    let date = new Date().getTime();
    let Christmas = new Date(`December 25 2022 00:00:00`).getTime();

    let remainingtime = Christmas - date;

    let days = Math.floor(remainingtime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((remainingtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((remainingtime % (1000 * 60 * 60)) / (1000 * 60));

    if (days <= 0 && hours <= 0 && minutes <= 0) {
        client.channels.cache.get("1043955565317083207").setName(`—͟͞͞🎅】BUON NATALE`);
        return;
    }
    if (days <= 0 && hours >= 1) {
        client.channels.cache.get("1043955565317083207").setName(`—͟͞͞🎅】-${hours}h ${minutes}m`);
        return;
    }
    if (days <= 0 && hours <= 0 && minutes >= 1) {
        client.channels.cache.get("1043955565317083207").setName(`—͟͞͞🎅】-${minutes}m`);
        return;
    }
    client.channels.cache.get("1043955565317083207").setName(`—͟͞͞🎅】-${days}d ${hours}h ${minutes}m`)

}