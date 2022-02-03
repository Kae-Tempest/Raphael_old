const {tagbattle} = require("../../../function/rpg/tagbattle");
module.exports = {
    name: 'tagbattle',
    run: async (client, message, args) => {
        if(args[0] !== message.mentions.first()) return message.reply('Missing TeamMate');
        const monsterName = args.slice(1).join(' ')
        if(monsterName === '') return message.reply('Tu ne peux pas affronter le vide !')
        const monster = await client.getMonster('slime');
        const player = await client.getUser(message.member);
        const player2 = await client.getUser(message.mentions.users.first(), message.member)
        await tagbattle(client, message, player, player2, monster)
    }
}