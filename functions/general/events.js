
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = async function events() {
    const date = new Date()
    const server = client.guilds.cache.get(config.idServer.idServer)

    //* San Valentine
    if (date.getMonth() == 1 && date.getDate() == 14 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/8KLWK5k.png`)
    }
    if (date.getMonth() == 1 && date.getDate() == 15 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/bhSUCXi.gif`)
    }

    //* April Fools
    if (date.getMonth() == 3 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        let role1 = server.roles.cache.get(config.idruoli.owner)
        let role2 = server.roles.cache.get(config.idruoli.srmoderator)
        let role3 = server.roles.cache.get(config.idruoli.moderator)
        let role4 = server.roles.cache.get(config.idruoli.helper)
        let role5 = server.roles.cache.get(config.idruoli.staff)
        let role6 = server.roles.cache.get(config.idruoli.fan)
        role6.setName(`Owner`)
        await role6.setColor(`#e4b400`)
        await role1.setHoist(false)
        await role2.setHoist(false)
        await role3.setHoist(false)
        await role4.setHoist(false)
        await role5.setHoist(true)
        await role5.setName(`Fan`)
        await role5.setColor(`#d6680e`)
        server.setIcon(`https://i.imgur.com/3rUN1t6.png`)
        server.setName(`RoGi DiScOrD`)
    }
    if (date.getMonth() == 3 && date.getDate() == 2 && date.getHours() == 0 && date.getMinutes() == 0) {
        let role1 = server.roles.cache.get(config.idruoli.owner)
        let role2 = server.roles.cache.get(config.idruoli.srmoderator)
        let role3 = server.roles.cache.get(config.idruoli.moderator)
        let role4 = server.roles.cache.get(config.idruoli.helper)
        let role5 = server.roles.cache.get(config.idruoli.staff)
        let role6 = server.roles.cache.get(config.idruoli.fan)
        await role6.setName(`Fan`)
        await role6.setColor(`#d6680e`)
        await role1.setHoist(true)
        await role2.setHoist(true)
        await role3.setHoist(true)
        await role4.setHoist(true)
        await role5.setHoist(false)
        await role5.setName(`Staff`)
        await role5.setColor(`DEFAULT`)
        server.setIcon(`https://i.imgur.com/bhSUCXi.gif`)
        server.setName(`Rogi Discord`)
    }

    //* Palms Day
    /*if(date.getMonth() == 3 && date.getDate() == 10 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/knucbYo.png`)
    }
    if(date.getMonth() == 3 && date.getDate() == 11 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/bhSUCXi.gif`)
    }*/

    //* Easter
    /*if(date.getMonth() == 3 && date.getDate() == 14 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/V7wXdas.png`)
    }
    if(date.getMonth() == 3 && date.getDate() == 19 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/bhSUCXi.gif`)
    }*/

    //* 25 April
    if (date.getMonth() == 3 && date.getDate() == 25 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/Iz0sFFi.png`)
    }
    if (date.getMonth() == 3 && date.getDate() == 26 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/bhSUCXi.gif`)
    }

    //* Summer
    if (date.getMonth() == 6 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/rt6v0aX.png`)
    }
    if (date.getMonth() == 8 && date.getDate() == 1 && date.getHours() == 0 && date.getMinutes() == 0) {
        server.setIcon(`https://i.imgur.com/bhSUCXi.gif`)
    }
}