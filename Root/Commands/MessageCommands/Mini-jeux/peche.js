module.exports = {
    name: 'peche',
    usage: '!peche',
    exemple: '!peche',
    description: 'permet de pecher pour faire passer le temps',
    run: (client, message) => {
        let number = Math.round(Math.random() * 10)
        let price;
        switch (number) {
            case 1:
                price = "un **Poisson Clown**";
                break;
            case 2:
                price = "une **Tortue**";
                break;
            case 3:
                price = "une **Planche de bois**";
                break;
            case 4:
                price = "une **Chaussette pourie**";
                break;
            case 5:
                price = "une **Pépite d'or**";
                break;
            case 6:
                price = "un **Pneu**"
                break;
            case 7:
                price = "du **Plastique**"
                break;
            case 8:
                price = "une **Daurade**"
                break;
            case 9:
                price = "un **Espadon**"
                break;
            case 10:
                price = "un **Saumon**"
                break;
        }
        message.channel.send(`tu as pecher ${price}`)
    }
}