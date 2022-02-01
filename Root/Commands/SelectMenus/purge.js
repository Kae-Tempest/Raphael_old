const {stripIndent} = require("common-tags");
const {prefix} = require("../../../Config");
module.exports = {
    name: "purge",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> Purge] 

description : Permet de purger un channel d'un certain nombre de message

Utilisation: ${prefix}purge [nbr de msg]
Exemples: ${prefix}purge 10

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}