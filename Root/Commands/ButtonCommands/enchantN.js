module.exports = {
	name: 'enchantN',
	run: async (client, button) => {
		const title = button.message.embeds[0].title;
		const itemName = title.slice(35, title.length - 1);

		button.update({
			content: `Vous avez annulez l'enchantement de \`${itemName}\``,
			embeds: [],
			components: [],
		});
	},
};
