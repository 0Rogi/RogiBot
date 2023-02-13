module.exports = {
    name: `messageCreate`,
    execute(message) {

        if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(message.author.id)) return;
        if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(message.author.id)) return;

        content = message.content.toLowerCase();

        if (serverstats.currentevent == `SaintValentine`) {
            if (content.includes(`amore`)) message.react(`❤️`);
            if (content.includes(`cupido`)) message.react(`👼`);
            if (content.includes(`san valentino`)) message.react(`💖`);
        }

        if (serverstats.currentevent == `ItalyFlag`) {
            if (content.includes(`italia`)) message.react(`🇮🇹`);
            if (content.includes(`colosseo`) || content.includes(`roma`)) message.react(`🏛️`);
            if (content.includes(`milano`) || content.includes(`duomo`)) message.react(`🏙️`);
            if (content.includes(`pisa`) || content.includes(`duomo`)) message.react(`🗼`);
            if (content.includes(`liberazione`) || content.includes(`lavoratori`) || content.includes(`repubblica`)) message.react(`🎉`);
        }

        if (serverstats.currentevent == `Halloween`) {
            if (content.includes(`zucca`) || content.includes(`zucche`) || content.includes(`Halloween`)) message.react(`🎃`);
            if (content.includes(`strega`) || content.includes(`streghe`) || content.includes(`witch`)) message.react(`🧙‍♀️`);
            if (content.includes(`fantasma`) || content.includes(`fantasmi`) || content.includes(`ghost`)) message.react(`👻`);
            if (content.includes(`mago`) || content.includes(`maghi`) || content.includes(`mage`)) message.react(`🧙‍♂️`);
            if (content.includes(`ragno`) || content.includes(`ragni`) || content.includes(`spider`)) message.react(`🕷`);
            if (content.includes(`ragnatela`) || content.includes(`ragnatele`)) message.react(`🕸`);
        }

        if (serverstats.currentevent == `Christmas`) {
            if (content.includes(`natale`) || content.includes(`christmas`)) message.react(`🎅🏻`);
            if (content.includes(`albero`)) message.react(`🎄`);
            if (content.includes(`regalo`) || content.includes(`regali`) || content.includes(`gift`)) message.react(`🎁`);
            if (content.includes(`befana`)) message.react(`🧙‍♀️`);
        }

        if (serverstats.currentevent == `Summer`) {
            if (content.includes(`mare`) || content.includes(`oceano`) || content.includes(`sabbia`) || content.includes(`spiaggia`)) message.react(`🏖`);
            if (content.includes(`onde`) || content.includes(`surf`)) message.react(`🌊`);
            if (content.includes(`sole`) || content.includes(`abbronza`)) message.react(`☀`);
        }

        if (serverstats.currentevent == `Easter`) {
            if (content.includes(`pasqua`) || content.includes(`easter`) || content.includes(`pulcino`)) message.react(`🐣`);
            if (content.includes(`colomba`)) message.react(`🕊️`);
            if (content.includes(`uova`)) message.react(`🥚`);
            if (content.includes(`conigli`)) message.react(`🐰`);
        }

        if (serverstats.currentevent == `Palm`) {
            if (content.includes(`palme`)) message.react(`🕊️`);
        }

        let greetings = [`salve`, `ciao`, `hi`, `buongiorno`, `hey`, `we`, `hola`, `addio`, `hello`];
        if (greetings.includes(content)) {
            message.react(`<:RogiCiao:1043918448134193235>`);
            return;
        }

        let sadness = [`triste`, `sad`, `piango`, `piange`];
        if (sadness.includes(content)) {
            message.react(`<:RogiSAD: 1043918454723461210>`);
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