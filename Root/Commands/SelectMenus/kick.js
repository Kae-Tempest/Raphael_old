const {stripIndent} = require("common-tags");
const {prefix} = require("../../../Config");
module.exports = {
    name: "kick",
    run: async(client, interaction) => {
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> Kick] 

description : Permet d'expulser un utilisateur du server

Utilisation: ${prefix}kick [@user] <reason>
Exemples: ${prefix}kick @Kae-Tempest@0001 c'est le dev

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}