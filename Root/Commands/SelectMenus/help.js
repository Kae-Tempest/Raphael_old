const { prefix } = require('../../../Config');
const { stripIndent } = require('common-tags');
module.exports = {
    name: "help",
    run: async(client, interaction) => {
        const commandList = client.commands.messageCommands
        const commands = commandList.find(cmd => cmd.name === interaction.values[0])
        interaction.reply(stripIndent(`
            \`\`\`makefile
[Help: Command -> ${interaction.values[0]}] 

description: ${commands.description}

Utilisation: ${commands.usage}
Exemples: ${commands.exemple}

---

${prefix} = prefix à utiliser sur le bot
() = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
Ne pas inclure les caractères suivants -> [], () et <> dans vos commandes.
Si vous avez un porblème, rejoignez le serveur support.\`\`\`
        `));
    }
}
