module.exports = {
    name: `say`,
    description: `Per annunciare qualcosa dagli staffer`,
    execute(message){
        if (!message.member.permissions.has(`MANAGE_MESSAGES`)) {
            message.reply({embeds: [noperm]});
            return;
        }
        const args = message.content.split(` `).slice(1);
        var saytext = args.join(` `);
        if(!saytext) {
            const embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setTitle(`Errore`) 
                .setDescription(`:x: Inserisci il testo da annunciare!`)
                .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
            message.reply({embeds: [embed]})
            return
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`ANNUNCIO DALLO STAFF`)
            .setColor(`RANDOM`)
            .setDescription(saytext.toString())
            .setFooter(`Annuncio da ` + message.author.tag)
        message.delete()
        message.channel.send({embeds: [embed]})
    } 
}