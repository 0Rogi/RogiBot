module.exports = {
    name: `messageCreate`,
    execute(message) {
        if (message.author.bot) return;
        let content = message.content.toLowerCase();
        if (content.includes(`halloween`)) return message.react(`🎃`);
        if (content.includes(`fantasma`) || content.includes(`ghost`)) return message.react(`👻`);
        if (content.includes(`pipistrello`) || content.includes(`bat`)) return message.react(`🦇`);
        if (content.includes(`strega`) || content.includes(`potioni`)) return message.react(`🧙‍♀️`);
        if (content.includes(`ragno`)) return message.react(`🕷`);
    }
}