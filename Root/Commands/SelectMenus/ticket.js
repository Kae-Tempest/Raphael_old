const {stripIndent} = require("common-tags");
const {prefix} = require("../../../Config");
module.exports = {
    name: "ticket",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> Ticket] 

description : Permet de crée un ticket.

Utilisation: ${prefix}ticket <Contenue du ticket>
Exemples: ${prefix}ticket j'ai un probleme avec la commande ban

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}