module.exports = {
    name: `emoji`,
    onlyOwner: true,
    execute(message) {
        message.guild.emojis.create(`https://i.imgur.com/Y5F6mK1.png`, `KaiBroom`, { roles: [`927482194140758016`] })
        .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
        .catch(console.error);
        message.channel.send(`Created new emoji!`)
    }
}