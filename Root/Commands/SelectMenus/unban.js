const {stripIndent} = require("common-tags");
const {prefix} = require("../../../Config");
module.exports = {
    name: "unban",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> UnBan] 

description : Permet de débannir un utilisateur du server

Utilisation: ${prefix}ban [@userID]
Exemples: ${prefix}ban 401337448120057859

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}