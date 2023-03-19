const config = require(`${process.cwd()}/JSON/config.json`);
const googleTTS = require('google-tts-api');
const DiscordVoice = require(`@discordjs/voice`);

module.exports = {
    name: `tts`,
    description: `Parla con il bot in vocale`,
    data: {
        name: `tts`,
        description: `Permette di far parlare il bot in vocale`,
        options: [
            {
                name: `testo`,
                description: `Cosa deve dire il bot in vocale`,
                type: `STRING`,
                required: true
            }
        ]
    },
    permissionlevel: 0,
    allowedchannels: [config.channelsid.nomicchat, config.channelsid.generalvc],
    async execute(interaction) {
        await interaction.deferReply();

        let channel = interaction.member.voice.channel;

        if (!channel) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`<a:error:1086952752892092416> Errore <a:error:1086952752892092416>`)
                .setDescription(`*Non sei in un canale vocale*`)
                .setColor(`RED`);
            interaction.editReply({ embeds: [embed] });
            return;
        }

        let connection = DiscordVoice.joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });

        let url = googleTTS.getAudioUrl(interaction.options.getString(`testo`), {
            lang: 'it',
            slow: false,
            host: 'https://translate.google.com',
        });

        global.audioPlayer = DiscordVoice.createAudioPlayer();
        let resource = DiscordVoice.createAudioResource(url);
        connection.subscribe(audioPlayer);
        audioPlayer.play(resource);

        let embed = new Discord.MessageEmbed()
            .setTitle(`TTS`)
            .setDescription(`\`${interaction.options.getString(`testo`).toString().split(0, 500)}\` è stato riprodotto in ${channel.toString()}`)
            .setColor(`GREEN`);
        interaction.editReply({ embeds: [embed] });
    }
}