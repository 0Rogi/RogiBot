module.exports = {
    name: `messageReactionAdd`,
    async execute(messageReaction, user) {
        if (user.bot) return
        if (messageReaction.message.partial) await messageReaction.message.fetch();
        if (messageReaction.message.channel.id == config.idcanali.suggestions) {
            let userUp = (await messageReaction.message.reactions.cache.find(x => x._emoji.name == `👍`).users.fetch()).map(user => user.id)
            let userDown = (await messageReaction.message.reactions.cache.find(x => x._emoji.name == `👎`).users.fetch()).map(user => user.id)
            if (!userUp || !userDown) return
            if (messageReaction._emoji.name == `👍`) {
                if (userDown.includes(user.id)) {
                    messageReaction.users.remove(user);
                    return
                }
            }
            if (messageReaction._emoji.name == `👎`) {
                if (userUp.includes(user.id)) {
                    messageReaction.users.remove(user);
                    return
                }
            }
            let count = userUp.filter(x => x != `813439444417773639`).length
            if(!count) return
            if(count >= 10) {
                client.channels.cache.get(config.idcanali.thingstodo).messages.fetch()
                .then(messages => {
                    let giaMandato = false 
                    messages.forEach(msg => {
                        if (msg.embeds[0]?.fields[1].value.includes(messageReaction.message.embeds[0].description.slice(18))) giaMandato = true 
                    }) 
    
                    if (!giaMandato) {
                        let embed = new Discord.MessageEmbed()
                            .setColor(`PURPLE`)
                            .addField(`Stato:`, `🟪Suggested`)
                            .addField(`Thing to do:`, messageReaction.message.embeds[0].description.slice(18))
                        let menu = new Discord.MessageSelectMenu()
                            .setCustomId(`Thingstodo`)
                            .setPlaceholder(`Scegli uno stato`)
                            .addOptions([
                            {
                                label: 'Da fare...',
                                value: 'Todo',
                                description: 'Thing to do da fare',
                                emoji: '🔲'
                            },
                            {
                                label: 'Completato',
                                value: 'Completed',
                                description: 'Thing to do completato',
                                emoji: '🟩'
                            },
                            {
                                label: 'Importante',
                                value: 'Important',
                                description: 'Things to do importante',
                                emoji: '🟥'
                            },
                            {
                                label: 'Elimina',
                                value: 'Delete',
                                description: 'Elimina thing to do',
                                emoji: '❌'
                            },
                        ])
                        let row = new Discord.MessageActionRow()
                            .addComponents(menu)
                        client.channels.cache.get(config.idcanali.thingstodo).send({embeds: [embed], components: [row]})
                    }
                })
            }
        }
    }
}