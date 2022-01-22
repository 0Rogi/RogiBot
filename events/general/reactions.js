module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.content.toLowerCase() == `rogi`) return message.react.react(`<:Rogi:904005869799366696>`)
        if(message.content.toLowerCase() == `ciao` || message.content.toLowerCase() == `salve` || message.content.toLowerCase() == `hello` || message.content.toLowerCase() == `benvenuto`) return message.react.react(`<:RogiCiao:904001520880726036>`)
        if(message.content.toLowerCase().includes(`?`)) return message.react.react(`<:RogiDomandoso:904007044246433923>`)
        if(message.content.toLowerCase() == `f`) return message.react.react(`<:RogiF:904002259921293382>`)
        if(message.content.toLowerCase() == `gg`) return message.react.react(`<:RogiGG:904002692286922753> `)
        if(message.content.toLowerCase() == `amore` || message.content.toLowerCase() == `adoro`) return message.react.react(`<:RogiHearts:904005290905718874>`)
        if(message.content.toLowerCase() == `lol`) return message.react.react(` <:RogiLOL:904003061960282142> `)
        if(message.content.toLowerCase() == `ok` || message.content.toLowerCase() == `va bene` || message.content.toLowerCase() == `k` || message.content.toLowerCase() == `capito`) return message.react.react(`<:RogiOk:904003454350004265>`)
        if(message.content.toLocaleLowerCase() == `triste` || message.content.toLowerCase() == `sad` || message.content.toLowerCase() == `piango`) return message.react.react(`<:RogiSad:904004495611142176>`)
    }
}