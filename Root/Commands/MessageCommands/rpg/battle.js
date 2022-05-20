const { battle } = require('../../../function/rpg/battle');
module.exports = {
	name: 'battle',
	usage: 'battle <monster>',
	exemple: 'battle slime',
	description: 'Permet de combattre le monstre sélectionné',
	cooldown: 10000,
	run: async (client, message, args) => {
		const monsterName = args.join(' ');
		if (monsterName === '') return message.reply('Tu ne peux pas affronter le vide !');
		const monster = await client.getMonster(monsterName);
		const player = await client.getUser(message.member);
		await battle(client, message, player, monster);
	},
};
