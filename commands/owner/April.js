module.exports = {
    name: "april",
    FromOwner: true,
    async execute(message) {
        let server = message.guild
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
        message.reply(":+1:")
    }
}
