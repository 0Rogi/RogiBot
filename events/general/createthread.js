const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `messageCreate`,
    async execute(message) {

        if (!message.guild) return
        if (message.channel != config.idcanali.coppersupport) return

        if (!message.author || !message.member) return
        if (message.author.bot) return

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

        let thread = await message.startThread({
            name: message.content.slice(0, 30),
            autoArchiveDuration: 60,
            rateLimitPerUser: 5
        });

        let embed = new Discord.MessageEmbed()
            .setTitle(`Thread di supporto APERTO`)
            .setDescription(`Il thread di supporto è stato aperto, attendi qualcuno che ti aiuti.\n\n**RICORDA DI:**\n\n**Non pingare** tutti, attendi e basta;\n**Non chiedere di chiedere**, ma chiedi e basta;\nSii il più **specifico** possibile nel descrivere il tuo problema.`)
            .setColor(`RED`)
        thread.send({ embeds: [embed] })
    }
}