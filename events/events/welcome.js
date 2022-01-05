module.exports = {
    name: `guildMemberAdd`,
    description: `Messaggio di benvenuto`,
    async execute(member) {
        if (member.guild.id != config.idServer.idServer) return
            var server = client.guilds.cache.get(config.idServer.idServer);
            var botCount = server.members.cache.filter(member => member.user.bot).size;
            var utentiCount = server.memberCount - botCount;  
            const canvas =  Canvas.createCanvas(1280, 720);
            const ctx = canvas.getContext(`2d`);
            const background = await Canvas.loadImage(`./Images/WelcomeImage.png`);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);        
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `jpg` }))
            ctx.drawImage(avatar, 470, 250, 350, 350);
            /*ctx.font = `40px Impact`;
            ctx.fillStyle = `#F8F8F8`;
            ctx.fillText(member.user.tag + `\rÈ entrato in Rogi Discord!!\rSei il nostro ` + member.guild.memberCount +  ` membro!!`, 450, 100)*/
            const embed = new Discord.MessageEmbed()
                .setDescription(`:wave: Ciao ${member.toString()}, benvenuto in ${member.guild.name}\n:eyes: Sei il nostro ${utentiCount} membro!\n:scroll: Leggi il <#698178808011948032> e rispetta le regole :wink:\n:rotating_light: Puoi vedere tutte le info del sever in <#813476709731008532>`)
                .setImage(`attachment://Welcome.png`)
                .setColor(`YELLOW`)
            client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)]})
            member.roles.add(config.idruoli.fan)
            member.roles.add(config.idruoli.common)
    }
}