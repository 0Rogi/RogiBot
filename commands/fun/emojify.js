module.exports = {
    name: `emojify`,
    data: {
        name: `emojify`,
        description: `Trasforma il testo in emoji`,
        options: [
            {
                name: `testo`,
                description: `Il testo da trasformare`,
                type: `STRING`,
                required: true
            },
            {
                name: `stile`,
                description: `Lo stile delle emoji`,
                type: `STRING`,
                required: false,
                choices: [
                    {
                        name: 'Discord Letters',
                        value: 'Default'
                    },
                    {
                        name: 'Flowers Letters',
                        value: 'Flowers'
                    },
                ]
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [`ALL`],
    requirement: `Level 10`,
    async execute(interaction) {
        await interaction.deferReply();

        let text = interaction.options.getString(`testo`);
        let style = interaction.options.getString(`stile`);
        if (!style) style = `Default`;

        text = text.toLowerCase();
        text = text.replace(/[^a-z0-9]/gi, '');

        if (style == `Default`) {
            text = text
                .replace(eval(`/a/g`), `🇦 `)
                .replace(eval(`/b/g`), `🇧 `)
                .replace(eval(`/c/g`), `🇨 `)
                .replace(eval(`/d/g`), `🇩 `)
                .replace(eval(`/e/g`), `🇪 `)
                .replace(eval(`/f/g`), `🇫 `)
                .replace(eval(`/g/g`), `🇬 `)
                .replace(eval(`/h/g`), `🇭 `)
                .replace(eval(`/i/g`), `🇮 `)
                .replace(eval(`/j/g`), `🇯 `)
                .replace(eval(`/k/g`), `🇰 `)
                .replace(eval(`/l/g`), `🇱 `)
                .replace(eval(`/m/g`), `🇲 `)
                .replace(eval(`/n/g`), `🇳 `)
                .replace(eval(`/o/g`), `🇴 `)
                .replace(eval(`/p/g`), `🇵 `)
                .replace(eval(`/q/g`), `🇶 `)
                .replace(eval(`/r/g`), `🇷 `)
                .replace(eval(`/s/g`), `🇸 `)
                .replace(eval(`/t/g`), `🇹 `)
                .replace(eval(`/u/g`), `🇺 `)
                .replace(eval(`/v/g`), `🇻 `)
                .replace(eval(`/w/g`), `🇼 `)
                .replace(eval(`/x/g`), `🇽 `)
                .replace(eval(`/y/g`), `🇾 `)
                .replace(eval(`/z/g`), `🇿 `)
                .replace(eval(`/0/g`), `0️⃣ `)
                .replace(eval(`/1/g`), `1️⃣ `)
                .replace(eval(`/2/g`), `2️⃣ `)
                .replace(eval(`/3/g`), `3️⃣ `)
                .replace(eval(`/4/g`), `4️⃣ `)
                .replace(eval(`/5/g`), `5️⃣ `)
                .replace(eval(`/6/g`), `6️⃣ `)
                .replace(eval(`/7/g`), `7️⃣ `)
                .replace(eval(`/8/g`), `8️⃣ `)
                .replace(eval(`/9/g`), `9️⃣ `);
        }

        if (style == `Flowers`) {
            text = text
                .replace(eval(`/0/g`), ``)
                .replace(eval(`/1/g`), ``)
                .replace(eval(`/2/g`), ``)
                .replace(eval(`/3/g`), ``)
                .replace(eval(`/4/g`), ``)
                .replace(eval(`/5/g`), ``)
                .replace(eval(`/6/g`), ``)
                .replace(eval(`/7/g`), ``)
                .replace(eval(`/8/g`), ``)
                .replace(eval(`/9/g`), ``)
                .replace(eval(`/f/g`), `<:6f:1024739168728916008> `)
                .replace(eval(`/a/g`), `<:1f:1024739160759742484> `)
                .replace(eval(`/b/g`), `<:2f:1024739162164826204> `)
                .replace(eval(`/c/g`), `<:3f:1024739163980967996> `)
                .replace(eval(`/d/g`), `<:4f:1024739165587390484> `)
                .replace(eval(`/e/g`), `<:5f:1024739166933745777> `)
                .replace(eval(`/g/g`), `<:7f:1024739170201108480> `)
                .replace(eval(`/h/g`), `<:8f:1024739171732041808> `)
                .replace(eval(`/i/g`), `<:9f:1024739173086806016> `)
                .replace(eval(`/j/g`), `<:10f:1024739174487703705> `)
                .replace(eval(`/k/g`), `<:11f:1024739176215740507> `)
                .replace(eval(`/l/g`), `<:12f:1024739177650196520> `)
                .replace(eval(`/m/g`), `<:13f:1024739179365675029> `)
                .replace(eval(`/n/g`), `<:14f:1024739181253111838> `)
                .replace(eval(`/o/g`), `<:15f:1024739182888898620> `)
                .replace(eval(`/p/g`), `<:16f:1024739183895531531> `)
                .replace(eval(`/q/g`), `<:17f:1024739185875226775> `)
                .replace(eval(`/r/g`), `<:18f:1024739187519406142> `)
                .replace(eval(`/s/g`), `<:19f:1024739189532659752> `)
                .replace(eval(`/t/g`), `<:20f:1024739191021650010> `)
                .replace(eval(`/u/g`), `<:21f:1024739192422531074> `)
                .replace(eval(`/v/g`), `<:22f:1024739194184151041> `)
                .replace(eval(`/w/g`), `<:23f:1024739195895414794> `)
                .replace(eval(`/x/g`), `<:24f:1024739197933862942> `)
                .replace(eval(`/y/g`), `<:25f:1024739199871615036> `)
                .replace(eval(`/z/g`), `<:26f:1024739201364791366> `)
        }

        if (text == ``) text = `🤨`;
        interaction.editReply(text.length > 2000 ? text.slice(0, 2000) : text);
    }
}