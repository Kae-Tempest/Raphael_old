const { prefix } = require('../../../Config');
const { stripIndent } = require('common-tags');
module.exports = {
    name: "ban",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> Ban] 

description : Permet de bannir un utilisateur du server

Utilisation: ${prefix}ban [@user] <reason>
Exemples: ${prefix}ban @Kae-Tempest@0001 c'est le dev

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}
