module.exports = {
    name: `invite`,
    execute(message) {
        let embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setTitle(`Invito del server`)
            .setURL(`https://discord.gg/cRXca9N5Kv`)
            .setThumbnail(`https://loghi-famosi.com/wp-content/uploads/2021/02/Discord-Emblema.png`)
            .setDescription(`<:Invite:904426570872139826>Vuoi far entrare un tuo amico ma non sai come fare?\nDagli questo link e lui potrà entrare!\n\n**https://discord.gg/cRXca9N5Kv**`)
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel(`INVITO`).setStyle(`LINK`).setURL(`https://discord.gg/cRXca9N5Kv`).setEmoji(`<:Invite:904426570872139826>`))
        message.reply({embeds: [embed], components: [row]})
    }
}