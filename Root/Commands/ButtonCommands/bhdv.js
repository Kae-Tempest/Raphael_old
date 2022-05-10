const {MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
    name : 'bhdv',
    run : async(client, button) => {
        // ! update l'interraction ( components only ) par des bouton achat direct & enchère
        const ButtonChoice = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Buy")
                .setCustomId("ibhdv"),
            new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Bid")
                .setCustomId("bid")
        )
        button.update({
            components: [ButtonChoice]
        })
        // ! si achat direct augmenter le prix de 5%
        // ! si enchere afficher 3 btn , - Prix + , cliquer sur le prix pour valider l'enchere | empecher de descendre en dessous du prix de base
        // ! si prix valider, update la BDD avec le Prix et le nom de la personne qui a encherie ( peut etre aussi le server )
    }
}