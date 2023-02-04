const config = require(`../../../JSON/config.json`);
const Canvas = require(`canvas`);

module.exports = {
    name: `ship`,
    description: `Mostra la percentuale d'amore fra 2 utenti  - Utilizzabile durante San Valentino`,
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `none`,
    async execute(interaction) {

        await interaction.deferReply();

        let user1 = interaction.options.getUser(`utente1`);
        let user2 = interaction.options.getUser(`utente2`);

        if (!user1 || !user2) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setDescription(`*Inserisci due utenti validi*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        if (user2 == user1) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                .setDescription(`*Non puoi controllare la percentuale d'amore fra le stesse persone!\nInserisci due utenti diversi*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        Canvas.registerFont(`${process.cwd()}/Canvas/font/robotoBold.ttf`, { family: `robotoBold` });

        let canvas = Canvas.createCanvas(1280, 720);
        let context = canvas.getContext(`2d`);

        let background = await Canvas.loadImage(`${process.cwd()}/Canvas/img/SaintValentine/ShipCommand.jpg`);

        context.drawImage(background, 25, 25, canvas.width, canvas.height);

        let avatar1 = await Canvas.loadImage(user1.displayAvatarURL({ format: `jpg` }));
        let avatar2 = await Canvas.loadImage(user2.displayAvatarURL({ format: `jpg` }));

        context.drawImage(avatar1, 50, 350, 250, 250);
        context.drawImage(avatar2, 1000, 350, 250, 250);

        context.font = '60px "robotoBold"';
        context.fillStyle = `#ffff00`;
        context.fillText(`${user1.username.slice(0, 10)} e ${user2.username.slice(0, 10)}\nsono compatibili al ${Math.floor(Math.random() * 101)}%`, 350, 450);

        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), `ship-canvas.png`)
        let embed = new Discord.MessageEmbed()
            .setTitle(`<a:ShipCommand:1071385859963748362> SHIP <a:ShipCommand:1071385859963748362>`)
            .setColor(`RED`)
            .setImage(`attachment://ship-canvas.png`)
        interaction.editReply({ embeds: [embed], files: [attachment] })
    }
}