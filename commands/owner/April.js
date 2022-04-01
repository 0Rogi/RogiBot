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
}