module.exports = {
    name: `say`,
    onlyHelpers: true,
    execute(message){
        let args = message.content.split(` `).slice(1);
        let saytext = args.join(` `);
        if(!saytext) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`Errore`)
                .setDescription(`:x: Inserisci il testo da annunciare`)
                .setColor(`RED`)
            message.reply({embeds: [embed]})
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`ANNUNCIO DALLO STAFF`)
            .setColor(`YELLOW`)
            .setDescription(saytext.toString())
            .setFooter(`Annuncio da ${message.author.tag}`)
        message.delete()
        message.channel.send({embeds: [embed]})
    } 
}