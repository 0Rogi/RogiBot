module.exports = {
    name: `messageCreate`,
    execute(message) {
        if(message.author.bot || message.guild != config.idServer.idServer) return
        if(message.content.toLocaleLowerCase() == `sus`) return message.react(`<:RogiSus:928954313504600064>`).catch(() => {})
        if(message.content.toLowerCase() == `rogi`) return message.react(`<:Rogi:904005869799366696>`).catch(() => {})
        if(message.content.toLowerCase() == `ciao` || message.content.toLowerCase() == `salve` || message.content.toLowerCase() == `hello` || message.content.toLowerCase() == `benvenuto`) return message.react(`<:RogiCiao:904001520880726036>`).catch(() => {})
        if(message.content.toLowerCase().includes(`?`)) return message.react(`<:RogiDomandoso:904007044246433923>`).catch(() => {})
        if(message.content.toLowerCase() == `f`) return message.react(`<:RogiF:904002259921293382>`).catch(() => {})
        if(message.content.toLowerCase() == `gg`) return message.react(`<:RogiGG:904002692286922753> `).catch(() => {})
        if(message.content.toLowerCase() == `amore` || message.content.toLowerCase() == `adoro`) return message.react(`<:RogiHearts:904005290905718874>`).catch(() => {})
        if(message.content.toLowerCase() == `lol`) return message.react(` <:RogiLOL:904003061960282142> `).catch(() => {})
        if(message.content.toLowerCase() == `ok` || message.content.toLowerCase() == `va bene` || message.content.toLowerCase() == `k` || message.content.toLowerCase() == `capito`) return message.react(`<:RogiOk:904003454350004265>`).catch(() => {})
        if(message.content.toLocaleLowerCase() == `triste` || message.content.toLowerCase() == `sad` || message.content.toLowerCase() == `piango`) return message.react(`<:RogiSad:904004495611142176>`).catch(() => {})
    }
}