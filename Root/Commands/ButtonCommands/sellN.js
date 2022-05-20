module.exports = {
	name: 'sellN',
	run: async (client, button) => {
		const title = button.message.embeds[0].title;
		const itemName = title.slice(32, title.length - 1);
		button.update({
			content: `Vous avez annulez la vente de \`${itemName}\``,
			embeds: [],
			components: [],
		});
	},
};
