module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.content.includes(`:`)) return;
        if(message.content.toLowerCase().includes(`rogi`)) message.react(`<:Rogi:904005869799366696>`)
        if(message.content.toLowerCase().includes(`ciao`) || message.content.toLowerCase().includes(`salve`) || message.content.toLowerCase().includes(`hello`) || message.content.toLowerCase().includes(`benvenuto`)) message.react(`<:RogiCiao:904001520880726036>`)
        if(message.content.toLowerCase().includes(`?`)) message.react(`<:RogiDomandoso:904007044246433923>`)
        if(message.content.toLowerCase() == `f`) message.react(`<:RogiF:904002259921293382>`)
        if(message.content.toLowerCase() == `gg`) message.react(`<:RogiGG:904002692286922753> `)
        if(message.content.toLowerCase().includes(`amore`) || message.content.toLowerCase().includes(`adoro`) || message.content.toLowerCase().includes(`adorare`)) message.react(`<:RogiHearts:904005290905718874>`)
        if(message.content.toLowerCase().includes(`lol`)) message.react(` <:RogiLOL:904003061960282142> `)
        if(message.content.toLowerCase().includes(`ok`) || message.content.toLowerCase().includes(`va bene`) || message.content.toLowerCase().includes(`capito`)) message.react(`<:RogiOk:904003454350004265>`)
        if(message.content.toLocaleLowerCase().includes(`triste`) || message.content.toLowerCase().includes(`sad`) || message.content.toLowerCase().includes(`piango`)) message.react(`<:RogiSad:904004495611142176>`)
    }
}