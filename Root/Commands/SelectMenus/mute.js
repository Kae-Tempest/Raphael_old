const {stripIndent} = require("common-tags");
const {prefix} = require("../../../Config");
module.exports = {
    name: "mute",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> Mute] 

description : Command Work in Progress

Utilisation: ${prefix}mute [@user] <reason>
Exemples: ${prefix}mute @PikaPiki@7883 il dit trop de bétise

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}