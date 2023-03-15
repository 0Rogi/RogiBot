//! Handlers
const fs = require(`fs`)
const config = require(`${process.cwd()}/JSON/config.json`)

//! Commands
client.commands = new Discord.Collection();
const commandsFolder = fs.readdirSync(`${process.cwd()}/commands`);
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`${process.cwd()}/commands/${folder}`);
    for (const file of commandsFiles) {
        if (file.endsWith(`.js`)) {
            const command = require(`${process.cwd()}/commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
        else {
            const commandsFiles2 = fs.readdirSync(`${process.cwd()}/commands/${folder}/${file}`)
            for (const file2 of commandsFiles2) {
                const command = require(`${process.cwd()}/commands/${folder}/${file}/${file2}`);
                client.commands.set(command.name, command);
            }
        }
    }
}

//! Commands Creation
client.on(`ready`, async () => {
    let guild = client.guilds.cache.get(config.idServer.idServer)

    guild.commands.create(
        {
            name: 'Report',
            type: 'MESSAGE',
        }
    );

    guild.commands.create(
        {
            name: 'Report',
            type: 'MESSAGE',
        }
    );

    client.commands.forEach(command => {
        if (!command.data) return;

        if (command.name == `clear`) {
            guild = client.guilds.cache.get(config.idServer.idServerLogs)
            guild.commands.create(command.data)
            guild = client.guilds.cache.get(config.idServer.idServer)
        }
        if (command.name == `test` || command.name == `eval` || command.name == `clear`) {
            guild = client.guilds.cache.get(config.idServer.idServerTest)
            guild.commands.create(command.data)
            guild = client.guilds.cache.get(config.idServer.idServer)
        }
        if (command.name == `ping`) return;
        guild.commands.create(command.data)
    })
})

//! Commands Execution
client.on(`messageCreate`, message => {
    let prefix = `!`
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild || message.content.startsWith(`${prefix}${prefix}`) || message.content == prefix || message.guild != config.idServer.idServer || message.channel == config.channelsid.thingstodo || message.channel == config.channelsid.suggests) return

    if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return
    if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return

    let args = message.content.slice(prefix.length).trim().split(/ +/)
    let writtencommand = args.shift().toLowerCase()
    let command = client.commands.get(writtencommand)

    if (command) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
            .setDescription(`I comandi sono ora in **slash commands**!\nDigita **/** per visualizzare la **lista di tutti i comandi**!`)
            .setColor(`RED`);
        message.reply({ embeds: [embed] }).catch(() => { })
    }
})
client.on(`interactionCreate`, async interaction => {

    if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(interaction.user.id)) return
    if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(interaction.user.id)) return

    if (!interaction.isCommand()) return
    let command = client.commands.get(interaction.commandName)
    if (!command) return

    if (command.name == `ping`) return command.execute(interaction);
    if (command.name == `clear` && interaction.guild != config.idServer.idServer && interaction.member.permissions.has(`ADMINISTRATOR`)) return command.execute(interaction)
    if (command.name == `eval` && interaction.guild == config.idServer.idServerTest && interaction.member.permissions.has(`ADMINISTRATOR`)) return command.execute(interaction)
    if (command.name == `test` && interaction.guild == config.idServer.idServerTest) return command.execute(interaction)

    if (!command.allowedchannels?.includes(`ALL`) && !command.allowedchannels.includes(interaction.channel.id) && !interaction.member.permissions.has(`MANAGE_MESSAGES`) && interaction.channel != config.channelsid.testing) {
        interaction.deferReply({ ephemeral: true }).then(() => {
            let text = ``;
            command.allowedchannels.forEach(channel => {
                text += `*-<#${channel}>*\n`
            })
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setColor(`RED`)
                .setDescription(`*Questo comando, puo' essere eseguito solo in:*\n${text}`);
            interaction.editReply({ embeds: [embed], ephemeral: true });
        })
        return;
    }

    const getUserPermissionLevel = require(`${process.cwd()}/functions/helper/getUserPermissionLevel.js`)

    let userpermission = await getUserPermissionLevel(interaction.member)

    if (command.permissionlevel > userpermission) {
        interaction.deferReply({ ephemeral: true }).then(() => {
            let embed = new Discord.MessageEmbed()
                .setColor(`RED`)
                .setDescription(`*Non hai abbastanza permessi\nper eseguire il comando \`/${command.name}\`*`)
                .setTitle(`Non hai il permesso!`);
            interaction.editReply({ embeds: [embed], ephemeral: true });
        })
        return;
    } else {
        command.execute(interaction);
    }

})

//! Events
let eventsFolders = fs.readdirSync(`${process.cwd()}/events`)
for (let folder of eventsFolders) {
    let eventsFiles = fs.readdirSync(`${process.cwd()}/events/${folder}`)
    for (let file of eventsFiles) {
        if (file.endsWith(`.js`)) {
            let event = require(`${process.cwd()}/events/${folder}/${file}`)
            client.on(event.name, (...args) => event.execute(...args))
        }
        else {
            let eventsFiles2 = fs.readdirSync(`${process.cwd()}/events/${folder}/${file}`)
            for (let file2 of eventsFiles2) {
                let event = require(`${process.cwd()}/events/${folder}/${file}/${file2}`)
                client.on(event.name, (...args) => event.execute(...args))
            }
        }
    }
}

//! Errors
let errorsFolder = fs.readdirSync(`${process.cwd()}/errors`)
for (let file of errorsFolder) {
    if (file.endsWith(`.js`)) {
        let event = require(`${process.cwd()}/errors/${file}`)
        process.on(event.name, (...args) => event.execute(...args))
    }
}