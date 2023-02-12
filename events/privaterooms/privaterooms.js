const config = require(`${process.cwd()}/JSON/config.json`);

module.exports = {
    name: `voiceStateUpdate`,
    async execute(oldState, newState) {

        if (oldState.guild != config.idServer.idServer || newState.guild != config.idServer.idServer) return;

        //? Check if the channel is the private rooms channel
        if (newState.channelId == config.channelsid.proomschannel) {

            //? Get the server and the guildMember
            let server = client.guilds.cache.get(config.idServer.idServer);
            let member = server.members.cache.find(x => x.id == newState.id);

            //? Check if user is in maintenance
            if (serverstats.maintenance && process.env.local && !serverstats.testers.includes(member.user.id)) return;
            if (serverstats.maintenance && !process.env.local && serverstats.testers.includes(member.user.id)) return;

            //? Check if the user already has a channel
            let found = false;
            serverstats.privaterooms.forEach(room => {
                if (room.user == member.user.id) return found = true;
            })

            if (found) {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`<a:error:966371274853089280> Errore <a:error:966371274853089280>`)
                    .setDescription(`*Hai già aperto una stanza privata!*`)
                    .setColor(`RED`);
                member.send({ embeds: [embed] }).catch(() => { });
                member.voice.disconnect();
                return;
            }

            //? Create text channel

            let channeltext;
            let channelvc;

            await newState.guild.channels.create(`—͟͞͞💬】text-${member.user.username}`, {
                type: `GUILD_TEXT`,
                parent: config.channelsid.proomsparent,
                nsfw: false,
                topic: `Canale di ${member.user.username}`,
                rateLimitPerUser: 1,
                permissionOverwrites: [
                    {
                        id: config.idServer.idServer,
                        deny: [`VIEW_CHANNEL`],
                    },
                    {
                        id: member.user.id,
                        allow: [`VIEW_CHANNEL`]
                    },
                    {
                        id: config.rolesid.moderator,
                        allow: [`VIEW_CHANNEL`]
                    }
                ]
            }).then(channel => {
                channeltext = channel;
            })

            await newState.guild.channels.create(`—͟͞͞🔊】voice-${member.user.username}`, {
                type: `GUILD_VOICE`,
                parent: config.channelsid.proomsparent,
                permissionOverwrites: [
                    {
                        id: config.idServer.idServer,
                        deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`],
                    },
                    {
                        id: member.user.id,
                        allow: [`VIEW_CHANNEL`]
                    },
                    {
                        id: config.rolesid.moderator,
                        allow: [`VIEW_CHANNEL`]
                    }
                ]
            }).then(channel => {
                channelvc = channel;
            })

            //? Move user in the channel
            member.voice.setChannel(channelvc);

            //? Send a message in the channel
            let embed = new Discord.MessageEmbed()
                .setTitle(`Stanza Privata Aperta`)
                .setDescription(`Stanza privata di ${member.toString()}.\nÈ possibile modificare il **nome** e il **topic** del canale attraverso i **comandi** \`/pname (text/voice) nome\` e \`/ptopic topic\`.\nSi possono **aggiungere** o **rimuovere** utenti con i comandi \`/puser add utente\` e \`/puser kick utente\` ed è possibile **eliminare** la stanza con \`/pdelete\`, __utilizzando questo comando, entrambe le stanze *(vocale e testuale)* saranno eliminate__.\n\n⚠️ **IN QUESTO CANALE, VALGONO LE STESSE REGOLE CHE VALGONO IN TUTTO IL SERVER ⚠️**`)
                .setColor(`YELLOW`);
            let button1 = new Discord.MessageButton()
                .setEmoji(`🔞`)
                .setStyle(`SECONDARY`)
                .setCustomId(`pnsfw`);
            let button2 = new Discord.MessageButton()
                .setEmoji(`🐌`)
                .setStyle(`SECONDARY`)
                .setCustomId(`pslowmode`);
            let button3 = new Discord.MessageButton()
                .setEmoji(`👥`)
                .setStyle(`SECONDARY`)
                .setCustomId(`plimit`);
            let button4 = new Discord.MessageButton()
                .setEmoji(`📃`)
                .setStyle(`SECONDARY`)
                .setCustomId(`ptranscript`);
            let row = new Discord.MessageActionRow()
                .addComponents(button1)
                .addComponents(button2)
                .addComponents(button3)
                .addComponents(button4);
            channeltext.send({ embeds: [embed], components: [row] });

            //? Store channels in the database
            let room = {
                user: member.user.id,
                vc: channelvc.id,
                text: channeltext.id
            }

            database.collection(`ServerStats`).updateOne({}, { $push: { "privaterooms": room } });
        }
    }
}