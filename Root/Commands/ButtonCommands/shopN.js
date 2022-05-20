module.exports = {
	name: 'shopN',
	run: async (client, button) => {
		const itemName = button.message.embeds[0].title;
		button.update({
			content: `Vous avez annulez l'achat de \`${itemName}\``,
			embeds: [],
			components: [],
		});
	},
};
