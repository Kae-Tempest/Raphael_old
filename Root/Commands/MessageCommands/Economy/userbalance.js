module.exports = {
    name: 'userbalance',
    aliases: ['ub'],
    usage: 'userbalance',
    exemple: 'userbalance',
    description: 'Permet de voir le contenue de son porteufeuille',
    run: async (client, message) => {
        const player = await client.getUser(message.member);
        return message.reply(`Tu as ${player['PO']}PO`)
    }
}