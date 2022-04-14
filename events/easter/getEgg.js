const ms = require(`ms`)
const config = require(`${process.cwd()}/JSON/config.json`)

module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(!interaction.isButton()) return
        if(interaction.customId.split(`,`)[0] == `Egg`) {
            database.collection(`Easter`).find({id: interaction.member.id}).toArray(async function(err, result) {
                let time;
                if(result[0]) { time = result[0].cooldown }
                if(time > 0) {
                    time = ms(time)
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`Sei in cooldown!`)
                        .setDescription(`⏲️Sei in cooldown... Aspetta **${time}** per raccogliere un nuovo uovo⏲️`)
                        .setColor(`RED`)
                        .setThumbnail(config.images.rogierror)
                    interaction.reply({embeds: [embed], ephemeral: true})
                    return
                }
                if(time <= 0 || !result[0]) {
                    database.collection(`Easter`).find({id: interaction.member.id}).toArray(function(err, result) {
                        let time = 1000 * 60 * 30
                        if(!result[0]) {
                            database.collection(`Easter`).insertOne({username: interaction.user.username, id: interaction.member.id, cooldown: time, eggs: 0, points: 0, eggsopen: 0})
                        }
                        if(result[0]) {
                            database.collection(`Easter`).updateOne({id: interaction.member.id}, {$set:{cooldown: time}})
                        }
                    })
                    let game = Math.floor(Math.random() * (2 - 1 + 1) + 1)
                    if(game == 1) {
                        let row11 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg1:960930868455682078>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg1`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg2:960930868740890705>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg2`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg3:960930868451475547>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg3`)
                            )
                        let row12 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg2:960930868740890705>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg2`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg1:960930868455682078>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg1`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg3:960930868451475547>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg3`)
                            )
                        let row13 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg3:960930868451475547>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg3`)
                            )    
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg2:960930868740890705>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg2`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg1:960930868455682078>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg1`)
                            )
                        let row21 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg4:960930868375998484>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg4`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg5:960930868451504248>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg5`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg6:960930868870922340>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg6`)
                            )
                        let row22 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                    .setEmoji(`<:EasterEgg6:960930868870922340>`)
                                    .setStyle(`PRIMARY`)
                                    .setCustomId(`EasterEgg6`)
                                )    
                            .addComponents(new Discord.MessageButton()
                                    .setEmoji(`<:EasterEgg4:960930868375998484>`)
                                    .setStyle(`PRIMARY`)
                                    .setCustomId(`EasterEgg4`)
                                )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg5:960930868451504248>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg5`)
                            )
                        let row23 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg6:960930868870922340>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg6`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg5:960930868451504248>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg5`)
                            )    
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:EasterEgg4:960930868375998484>`)
                                .setStyle(`PRIMARY`)
                                .setCustomId(`EasterEgg4`)
                            )
                        let eggs = [`<:EasterEgg1:960930868455682078>`, `<:EasterEgg2:960930868740890705>`, `<:EasterEgg3:960930868451475547>`, `<:EasterEgg4:960930868375998484>`, `<:EasterEgg5:960930868451504248>`, `<:EasterEgg6:960930868870922340>`]
                        let correct = eggs[Math.floor(Math.random() * eggs.length)]
                        let answer;
                        if(correct == `<:EasterEgg1:960930868455682078>`) answer = `EasterEgg1`
                        if(correct == `<:EasterEgg2:960930868740890705>`) answer = `EasterEgg2`
                        if(correct == `<:EasterEgg3:960930868451475547>`) answer = `EasterEgg3`
                        if(correct == `<:EasterEgg4:960930868375998484>`) answer = `EasterEgg4`
                        if(correct == `<:EasterEgg5:960930868451504248>`) answer = `EasterEgg5`
                        if(correct == `<:EasterEgg6:960930868870922340>`) answer = `EasterEgg6`
                        interaction.reply({content: `Ricordati quest'uovo: ${correct}`, ephemeral: true}).then(() => {
                            setTimeout(() => {
                                let random = Math.floor(Math.random() * (3 - 1 + 1) + 1)
                                let row1;
                                if(random == 1) row1 = row11
                                if(random == 2) row1 = row12
                                if(random == 3) row1 = row13
                                let random2 = Math.floor(Math.random() * (3 - 1 + 1) + 1)
                                let row2;
                                if(random2 == 1) row2 = row21
                                if(random2 == 2) row2 = row22
                                if(random2 == 3) row2 = row23
                                interaction.editReply({content: `Qual era l'uovo?`, components: [row1, row2], ephemeral: true}).then(m => {
                                    let collector = m.createMessageComponentCollector()
                                    collector.on(`collect`, async i => {
                                        if(i.customId != answer) {
                                            let embed = new Discord.MessageEmbed()
                                                .setTitle(`Risposta sbagliata`)
                                                .setDescription(`Risposta **sbagliata**.\n\nLa risposta corretta era: ${correct}`)
                                                .setColor(`RED`)
                                            i.update({embeds: [embed], content: `​`, components: []})
                                        } else if(i.customId == answer) {
                                            let msgid = interaction.customId.split(`,`)[1]
                                            let message = await interaction.channel.messages.fetch(msgid)
                                            if(message.embeds[0].footer.text != `Ancora non Riscattato`) {
                                                let embed = new Discord.MessageEmbed()
                                                    .setTitle(`⏰Troppo tardi⏰`)
                                                    .setDescription(`**Qualcun'altro** ha già riscattato questo uovo.`)
                                                    .setColor(`RED`)
                                                i.update({embeds: [embed], content: `​`, components: []})
                                                return
                                            }
                                            let embed = new Discord.MessageEmbed()
                                                .setTitle(`Risposta corretta`)
                                                .setDescription(`Risposta **corretta**!\nHai **ottenuto** un uovo di pasqua!\n\nPer aprirlo, usa il comando \`!open\`!`)
                                                .setColor(`GREEN`)
                                            database.collection(`Easter`).find({id: i.member.id}).toArray(function(err, result) {
                                                if(result[0]) {
                                                    let eggs = result[0].eggs + 1
                                                    database.collection(`Easter`).updateOne({id: i.member.id}, {$set:{eggs: eggs}})
                                                }
                                            })
                                            i.update({embeds: [embed], content: `​`, components: []}).then(() => {
                                                let msgid = interaction.customId.split(`,`)[1]
                                                interaction.channel.messages.fetch(msgid).then(msg => {
                                                    let embed = msg.embeds[0]
                                                        .setFooter({text: `Riscattato da ${interaction.user.username}`})
                                                    
                                                    let button = new Discord.MessageButton()
                                                        .setCustomId(`Disabled`)
                                                        .setLabel(`Raccogli`)
                                                        .setEmoji(`<:EasterBaket:964153827756486686>`)
                                                        .setStyle(`PRIMARY`)
                                                        .setDisabled()
                                                
                                                    let row = new Discord.MessageActionRow()
                                                        .addComponents(button)

                                                    msg.edit({embeds: [embed], components: [row]})
                                                })
                                            })
                                        }
                                    })
                                })
                            }, 1000 * 3)
                        })
                    }
                    if(game == 2) {
                        let row1 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:Bluu:963807011068325888>`)
                                .setCustomId(`Bluu`)
                                .setStyle(`PRIMARY`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:Dream:963807010795716678>`)
                                .setCustomId(`Dream`)
                                .setStyle(`PRIMARY`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:Gabvy:963807010866987018>`)
                                .setCustomId(`Gabvy`)
                                .setStyle(`PRIMARY`)
                            )
                        let row2 = new Discord.MessageActionRow()
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:Light:963807010749554690>`)
                                .setCustomId(`Light`)
                                .setStyle(`PRIMARY`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:Rogi:963807010770522223>`)
                                .setCustomId(`Rogi`)
                                .setStyle(`PRIMARY`)
                            )
                            .addComponents(new Discord.MessageButton()
                                .setEmoji(`<:accel:963807010791522344>`)
                                .setCustomId(`Accel`)
                                .setStyle(`PRIMARY`)
                            )
                        let images = [`https://i.imgur.com/vBo3AbD.png`, `https://i.imgur.com/TjOU1Zd.png`, `https://i.imgur.com/gOHfkaT.png`, `https://i.imgur.com/GeiV3qA.png`, `https://i.imgur.com/tiiBZrl.png`, `https://i.imgur.com/XkS8Lxv.png`]
                        let image = images[Math.floor(Math.random() * images.length)]
                        let answer;
                        let emoji;
                        if(image == `https://i.imgur.com/vBo3AbD.png`) {
                            answer = `Rogi`
                            emoji = `<:Rogi:963807010770522223>`
                        }
                        if(image == `https://i.imgur.com/TjOU1Zd.png`) {
                            answer = `Light`
                            emoji = `<:Light:963807010749554690>`
                        }
                        if(image == `https://i.imgur.com/gOHfkaT.png`) {
                            answer = `Gabvy`
                            emoji = `<:Gabvy:963807010866987018>`
                        }
                        if(image == `https://i.imgur.com/GeiV3qA.png`) {
                            answer = `Dream`
                            emoji = `<:Dream:963807010795716678> `
                        }
                        if(image == `https://i.imgur.com/tiiBZrl.png`) {
                            answer = `Bluu`
                            emoji = `<:Bluu:963807011068325888>`
                        }
                        if(image == `https://i.imgur.com/XkS8Lxv.png`) {
                            answer = `Accel`
                            emoji = `<:accel:963807010791522344>`
                        }
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`Chi riconosci nell'immagine?`)
                            .setImage(image)
                            .setColor(`YELLOW`)
                        interaction.reply({embeds: [embed], ephemeral: true}).then(msg => {
                            setTimeout(() => {
                                interaction.editReply({embeds: [embed], components: [row1, row2], ephemeral: true}).then(m => {
                                    let collector = m.createMessageComponentCollector()
                                    collector.on(`collect`, async i => {
                                        if(i.customId != answer) {
                                            let embed = new Discord.MessageEmbed()
                                                .setTitle(`Risposta sbagliata`)
                                                .setDescription(`Risposta **sbagliata**.\n\nLa risposta corretta era: ${emoji}`)
                                                .setColor(`RED`)
                                            i.update({embeds: [embed], components: []})
                                        } else if(i.customId == answer) {
                                            let msgid = interaction.customId.split(`,`)[1]
                                            let message = await interaction.channel.messages.fetch(msgid)
                                            if(message.embeds[0].footer.text != `Ancora non Riscattato`) {
                                                let embed = new Discord.MessageEmbed()
                                                    .setTitle(`⏰Troppo tardi⏰`)
                                                    .setDescription(`**Qualcun'altro** ha già riscattato questo uovo.`)
                                                    .setColor(`RED`)
                                                i.update({embeds: [embed], components: []})
                                                return
                                            }
                                            let embed = new Discord.MessageEmbed()
                                                .setTitle(`Risposta corretta`)
                                                .setDescription(`Risposta **corretta**!\nHai **ottenuto** un uovo di pasqua!\n\nPer aprirlo, usa il comando \`!open\`!`)
                                                .setColor(`GREEN`)
                                            database.collection(`Easter`).find({id: i.member.id}).toArray(function(err, result) {
                                                if(result[0]) {
                                                    let eggs = result[0].eggs + 1
                                                    database.collection(`Easter`).updateOne({id: i.member.id}, {$set:{eggs: eggs}})
                                                }
                                            })
                                            i.update({embeds: [embed], components: []}).then(() => {
                                                let msgid = interaction.customId.split(`,`)[1]
                                                interaction.channel.messages.fetch(msgid).then(msg => {
                                                    let embed = msg.embeds[0]
                                                        .setFooter({text: `Riscattato da ${interaction.user.username}`})
                                                    
                                                    let button = new Discord.MessageButton()
                                                        .setCustomId(`Disabled`)
                                                        .setLabel(`Raccogli`)
                                                        .setEmoji(`<:EasterBaket:964153827756486686>`)
                                                        .setStyle(`PRIMARY`)
                                                        .setDisabled()
                                                
                                                    let row = new Discord.MessageActionRow()
                                                        .addComponents(button)
        
                                                    msg.edit({embeds: [embed], components: [row]})
                                                })
                                            })
                                        }
                                    })
                                })    
                            }, 100)
                        })
                    }
                }
            })
        }
    }
}