const config = require(`../../../JSON/config.json`);
const Canvas = require(`canvas`);

module.exports = {
    name: `kiss`,
    description: `Comando per baciare qualcuno - Utilizzabile durante San Valentino`,
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        let user = interaction.options.getUser(`utente`);

        if (!user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Inserisci un utente valido*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (user == interaction.user) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Non puoi baciare te stesso!\nInserisci un utente valido*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] })
            return
        }

        let canvas = Canvas.createCanvas(1280, 720);
        let context = canvas.getContext(`2d`);

        let background = await Canvas.loadImage(`${process.cwd()}/Canvas/img/SaintValentine/KissCommand.png`);
        context.drawImage(background, 25, 25, canvas.width, canvas.height);

        let avatar = await Canvas.loadImage(user.displayAvatarURL({ format: `png` }));
        context.drawImage(avatar, 525, 300, 250, 250);

        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), `kiss-canvas.png`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`<a:KissCommand:1071381427792384072> ${interaction.user.username} ha baciato ${user.username} <a:KissCommand:1071381427792384072>`)
            .setColor(`RED`)
            .setImage(`attachment://kiss-canvas.png`)
        interaction.editReply({ embeds: [embed], files: [attachment] });
    }
} 