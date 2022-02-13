module.exports = {
    name: `send`,
    onlyOwner: true,
    execute(message) {
        let server = message.guild
        message.delete()
        let attachment = new Discord.MessageAttachment(`./Canvas/img/SanValentineAnnouncement.png`)
        let wc = new Discord.WebhookClient({
            id: `934774825648545842`, 
            token: `uGPTMCf11i9kGoF_xjkt8w1K_MPqKVxi_lWFTWv05sHWI7jRneLDSGNJlG82tk4HRAID`
        })
        wc.send({content: `Oggi è San Valentino, il giorno dell'amore e degli innamorati, oggi potrete dichiararvi alla persona che amate o trascorrere la giornata con il vostro partner!\n\nComunque... per questo giorno così speciale, il server è stato aggiornato con una nuova immagine e in più solo per oggi sono disponibili 2 nuovi comandi:\n*\`!kiss [utente]\`* per poter dare un bacio a qualcuno❤️\n*\`!ship [utente]\`* per poter vedere la compatibilità vostra con quella di qualcun'altro!\n\nBeh, cos'altro dire? Divertitevi ad usare questi 2 comandi e buon San Valentino😉\n\n||<@&704646594506653791>||`, files: [attachment]})
        server.setIcon(`https://i.imgur.com/8KLWK5k.png`)
    }
}