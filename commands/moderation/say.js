module.exports = {
    name: `say`,
    onlyHelpers: true,
    execute(message){
        let args = message.content.split(` `).slice(1);
        let saytext = args.join(` `);
        if(!saytext) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`*Inserisci il testo da annunciare\n\`!say [annuncio]\`*`)
                .setColor(`RED`)
                .setThumbnail(`https://i.imgur.com/6SnnI0Q.png`)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`ANNUNCIO DALLO STAFF`)
            .setColor(`YELLOW`)
            .setDescription(saytext.toString())
            .setFooter({text: `Annuncio da ${message.author.tag}`})
        global.delete = false
        message.delete()
        message.channel.send({embeds: [embed]})
    } 
}