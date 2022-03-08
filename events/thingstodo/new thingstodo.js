module.exports = {
    name: `messageCreate`,
    async execute(message) {
        if(message.channel == config.idcanali.thingstodo && message.guild == config.idServer.idServer) {
            if(message.author.bot || !message.content || message.reference) return
            let embed = new Discord.MessageEmbed()
                .setColor(`WHITE`)
                .addField(`Stato:`, `🔲Da fare...`)
                .addField(`Thing to do:`, message.content.toString())
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
            global.delete = false
            message.delete()
            message.channel.send({embeds: [embed], components: [row]})
        }
    }
}