module.exports = {
    name: `ephiphanysend`,
    onlyOwner: true,
    execute(message) {
        let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
            .setLabel(`Apri la tua Calza`)
            .setStyle(`PRIMARY`)
            .setCustomId(`Epifania`))
        let attachment = new Discord.MessageAttachment(`./Images/Ephiphany-Sock.png`)
        message.channel.send({content: `Oggi è il giorno della **Befana**, quindi avrete ricevuto sicuramente molti dolci...\nPer festeggiare ancor di più questo giorno, potrete aprire **la vostra calza della befana** anche qui nel server discord!!\nNella calza qui sotto ci sono ben **4 regali**!!\nPremi il **pulsante qui sotto** e vedi cosa hai trovato :wink:`, components: [row], files: [attachment]})
    }
}