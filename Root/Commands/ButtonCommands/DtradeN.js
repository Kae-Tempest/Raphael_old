module.exports = {
    name : 'DtradeN',
    run : async(client, button) => {
        button.update({
            content: `Vous avez annulez l'echange avec \`${button.message.embeds[0].footer.text}\``,
            embeds: [],
            components: []
        })
    }
}