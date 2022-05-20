const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { capitalize } = require('../../function/other/string');
const Builders = require('@discordjs/builders');
function createOptionSelectMenu(label, value) {
	let MenuOption = new Builders.SelectMenuOption();
	MenuOption.setLabel(label);
	MenuOption.setValue(label);
	return MenuOption;
}
module.exports = {
	name: 'DtradeY',
	run: async (client, button) => {
		let player = client.users.cache.find((user) => user.username === button.message.embeds[0].footer.text);
		let user = await client.getAllDataUser(player);
		let itemName = button.message.embeds[0].fields[0].value;
		let item = await client.getItem(itemName);
		await player.createDM().then(async (message) => {
			const itemEmbed = new MessageEmbed()
				.setTitle(`${button.user.username} veux t'échanger \`${itemName}\``)
				.addFields(
					{ name: 'Item:', value: itemName },
					{
						name: 'Stats:',
						value: `
                Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}`,
					}
				)
				.setTimestamp()
				.setFooter({ text: button.user.username });
			let Inventory = await client.getAllUserInventory(user);
			const itemList = [];
			for (let i = 0; Inventory.length > i; i++) {
				let item = await client.getItem(Inventory[i]['ITEM_NAME']);
				itemList.push(createOptionSelectMenu(capitalize(item['ITEM_NAME'])));
			}
			if (itemList == false)
				return button.update({
					content: "Le joueur n'as rien a vous echanger",
					embeds: [],
					components: [],
				});
			const rows = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('rtrade').setPlaceholder('Choose item to trade').setOptions(itemList));

			await message.send({
				content: `Vous avez reçu une demande d\'échange de ${button.user.username}`,
				embeds: [itemEmbed],
				components: [rows],
			});
			button.update({
				content: `Demande d'échange envoyé à ${player.username}`,
				embeds: [],
				components: [],
			});
		});
	},
};
