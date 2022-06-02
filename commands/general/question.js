module.exports = {
    name: `question`,
    data: {
        name: `question`,
        description: `Fai una domanda a Rogi`,
        options: [
            {
                name: `domanda`,
                description: `La domanda da fare`,
                type: `STRING`,
                required: true
            }
        ]
    },
    execute(interaction) {
        interaction.deferReply().then(() => {
            let question = interaction.options.getString(`domanda`)
            let embed1 = new Discord.MessageEmbed()
                .setTitle(`📥Nuova Domanda📥`)
                .setColor(`YELLOW`)
                .setDescription(`Nuova domanda da ${interaction.user.toString()}`)
                .addField(`⁉️Domanda:`, question.toString())
            let embed2 = new Discord.MessageEmbed()
                .setTitle(`Domanda Inviata!`)
                .setColor(`YELLOW`)
                .setDescription(`<a:checkmark:970022827866611762> La tua domanda:\n \`\`\`\n${question}\n\`\`\`è stata inviata a **Rogi**!`)
            client.channels.cache.get(`974992886783438899`).send({ embeds: [embed1] })
            interaction.editReply({ embeds: [embed2] })
        })
    }
}