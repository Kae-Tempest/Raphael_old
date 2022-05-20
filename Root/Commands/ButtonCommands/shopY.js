const { capitalize } = require('../../function/other/string');
module.exports = {
	name: 'shopY',
	run: async (client, button) => {
		const itemName = button.message.embeds[0].title;
		const Price = button.message.embeds[0].description;
		const itemPrice = Price.slice(7);
		await client.addInventory(itemName, button.member);
		await client.updateUserInfo(button.member.id, -itemPrice, 0, 0, button);
		const user = await client.getUser(button.member);
		button.update({
			content: `Vous avez bien acheter \`${capitalize(itemName)}\` Nouveau solde : ${user['PO']}PO`,
			embeds: [],
			components: [],
		});
	},
};
