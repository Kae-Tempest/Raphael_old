const { prefix } = require('../../../Config');
const { stripIndent } = require('common-tags')
module.exports = {
    name: "botinfo",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> BotInfo] 

description : Permet d'afficher les informations du bot

Utilisation: ${prefix}botinfo
Exemples: ${prefix}botinfo

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}