module.exports = {
    name: `guildMemberAdd`,
    async execute(member) {
        if (member.guild.id != config.idServer.idServer) return
        if(member.id == `853927926680911913`) {
            let testing = client.channels.cache.get(`698931027258638367`)
            testing.permissionOverwrites.create(member.id, {SEND_MESSAGES: true, VIEW_CHANNEL: true})
            return
        }
        let server = client.guilds.cache.get(config.idServer.idServer);
        let botCount = server.members.cache.filter(member => member.user.bot).size;
        let utentiCount = server.memberCount - botCount;  
        let canvas =  Canvas.createCanvas(1280, 720);
        let ctx = canvas.getContext(`2d`);
        let background = await Canvas.loadImage(`./Canvas/img/WelcomeImage.png`);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);        
        let avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: `jpg` }))
        ctx.drawImage(avatar, 470, 250, 350, 350);
        /*ctx.font = `40px Impact`;
        ctx.fillStyle = `#F8F8F8`;
        ctx.fillText(member.user.tag + `\rÈ entrato in Rogi Discord!!\rSei il nostro ` + member.guild.memberCount +  ` membro!!`, 450, 100)*/
        let embed = new Discord.MessageEmbed()
            .setDescription(`:wave: Ciao ${member.toString()}, benvenuto in ${member.guild.name}\n:eyes: Sei il nostro ${utentiCount} membro!\n:scroll: Leggi il <#698178808011948032> e rispetta le regole :wink:\n:rotating_light: Puoi vedere tutte le info del sever in <#813476709731008532>`)
            .setImage(`attachment://Welcome.png`)
            .setColor(`YELLOW`)
        client.channels.cache.get(config.idcanali.welcome).send({ embeds: [embed], files: [new Discord.MessageAttachment(canvas.toBuffer(), `Welcome.png`)]})
        member.roles.add(config.idruoli.fan)
        member.roles.add(config.idruoli.common)
    }
}