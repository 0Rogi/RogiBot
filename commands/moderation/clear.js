module.exports = {
    name: `clear`,
    description: `Cancella dei messaggi`,
    execute(message) {
                if (!message.member.permissions.has(`MANAGE_MESSAGES`)) {
                    message.reply({embeds: [noperm]});
                    return;
                }
                var count = message.content.slice(7);
                count = parseInt(count);
                if (!count) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(`RED`)
                        .setTitle(`Errore`)
                        .setDescription(`:x: **Inserisci un numero valido!**`)
                        .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                        .setFooter(`Moderatore: ${message.author.tag}`)
                    message.reply({embeds: [embed]})
                    return
                }
                if(count>100){
                    const embed = new Discord.MessageEmbed()
                        .setColor(`RED`)
                        .setTitle(`Errore`)
                        .setDescription(`Posso cancellare solo 100 messaggi per volta`)
                        .setThumbnail(`https://i.imgur.com/lRLRIr4.png`)
                        .setFooter(`Moderatore: ${message.author.tag}`)
                    message.reply({embeds: [embed]});
                    return
                }
                message.delete()
                message.channel.bulkDelete(count, true)
                const embed = new Discord.MessageEmbed()
                    .setColor(`#25a605`)
                    .setTitle(`Riuscito!`)
                    .setDescription(`:white_check_mark: *` + count + `* **messaggi eliminati**`)
                    .setThumbnail(`https://i.imgur.com/P7xHsvc.png`)
                    .setFooter(`Moderatore: ${message.author.tag}`)
                message.channel.send({embeds: [embed]}).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 2000);
                })
    }
}