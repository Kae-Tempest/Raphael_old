const { battle } = require('../../../function/rpg/battle');
module.exports = {
    name: 'battle',
    run: async (client, message, args) => {
        const monsterName = args.join(' ')
        if(monsterName === '') return message.reply('Tu ne peux pas affronter le vide !')
        const monster = await client.getMonster('slime');
        const player = await client.getUser(message.member);
        await battle(client, message, player , monster)
    }
}