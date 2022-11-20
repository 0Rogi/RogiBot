module.exports = {
    name: `messageCreate`,
    execute(message) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return;

        content = message.content.toLowerCase();

        let greetings = [`salve`, `ciao`, `hi`, `buongiorno`, `hey`, `we`, `hola`, `addio`, `hello`];
        if (greetings.includes(content)) {
            message.react(`<:RogiCiao:1043918448134193235>`);
            return;
        }

        let sadness = [`triste`, `sad`, `piango`, `piange`];
        if (sadness.includes(content)) {
            message.react(`<:RogiSAD:1043918454723461210>`);
            return;
        }

        if (content == `f`) {
            message.react(`<:RogiF:1043918450210373682>`);
            return;
        }

        if (content == `gg`) {
            message.react(`<:RogiGG:1043918451879727174>`);
            return;
        }

        if (content == `lol`) {
            message.react(`<:RogiLOL:1043918453322567680>`);
            return;
        }

    }
}