module.exports = {
    name: 'roulette',
    exemple: '!roulette',
    usage: '!roulette',
    description: 'Permet de jouer à roulette russe',
    run: (client, message) => {
        const tirage = Math.floor(Math.random() * 6)
        const bullet = Math.floor(Math.random() * 6)
        if(tirage === bullet) {
            return message.channel.send(`Tu es mort ! 🪦`)
        } else {
            return message.channel.send(`Tu es toujours en vie ! 👼`)
        }
    }
}