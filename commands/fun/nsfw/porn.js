const Discord = require(`discord.js`);
const NSFW = require(`discord-nsfw`);
const nsfw = new NSFW();
const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `porn`,
    data: {
        name: `porn`,
        description: `Comandi nsfw`,
        options: [
            {
                name: `4k`,
                description: `Manda un'immagine porno in 4k`,
                type: `SUB_COMMAND`
            },
            {
                name: `ass`,
                description: `Manda un'immagine di un culo`,
                type: `SUB_COMMAND`
            },
            {
                name: `gonewild`,
                description: `Manda un boh`,
                type: `SUB_COMMAND`
            },
            {
                name: `porngif`,
                description: `Manda una gif porno`,
                type: `SUB_COMMAND`
            },
            {
                name: `pussy`,
                description: `Manda una vagina`,
                type: `SUB_COMMAND`
            },
            {
                name: `boobs`,
                description: `Manda delle tette`,
                type: `SUB_COMMAND`
            },
            {
                name: `hentai`,
                description: `Manda un'immagine porno hentai`,
                type: `SUB_COMMAND`
            },
            {
                name: `hentaiass`,
                description: `Manda un culo hentai`,
                type: `SUB_COMMAND`
            },
            {
                name: `hentaithigh`,
                description: `Manda un boh`,
                type: `SUB_COMMAND`
            },
            {
                name: `kitsune`,
                description: `Manda un boh`,
                type: `SUB_COMMAND`
            },
            {
                name: `lewd`,
                description: `Manda un boh`,
                type: `SUB_COMMAND`
            },
            {
                name: `anal`,
                description: `Manda del sesso analek`,
                type: `SUB_COMMAND`
            },
            {
                name: `wallpaper`,
                description: `Manda uno sfondo porno`,
                type: `SUB_COMMAND`
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.idcanali.nsfw],
    requirement: `none`,
    async execute(interaction) {

        if (interaction.channel != config.idcanali.nsfw) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`ERRORE`)
                .setDescription(`*Puoi usare questo comando, SOLO in <#${config.idcanali.nsfw}> 😦*`)
                .setColor(`RED`);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        await interaction.deferReply();

        let type = interaction.options.getSubcommand();
        let image;
        switch (type) {
            case `4k`: {
                image = await nsfw.fourk();
                break;
            }
            case `ass`: {
                image = await nsfw.ass();
                break;
            }
            case `gonewild`: {
                image = await nsfw.gonewild();
                break;
            }
            case `porngif`: {
                image = await nsfw.pgif();
                break;
            }
            case `pussy`: {
                image = await nsfw.pussy();
                break;
            }
            case `boobs`: {
                image = await nsfw.boobs();
                break;
            }
            case `hentaiass`: {
                image = await nsfw.hentaiass();
                break;
            }
            case `hentai`: {
                image = await nsfw.hentai();
                break;
            }
            case `hentaithigh`: {
                image = await nsfw.hentaithigh();
                break;
            }
            case `kitsune`: {
                image = await nsfw.kitsune();
                break;
            }
            case `lewd`: {
                image = await nsfw.lewd();
                break;
            }
            case `anal`: {
                image = await nsfw.anal();
                break;
            }
            case `wallpaper`: {
                image = await nsfw.wallpaper();
                break;
            }
        }

        const embed = new Discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setImage(image);
        interaction.editReply({ embeds: [embed] });

    }
}