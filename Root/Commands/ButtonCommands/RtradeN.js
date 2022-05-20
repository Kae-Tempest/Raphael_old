module.exports = {
	name: 'RtradeN',
	run: async (client, button) => {
		button.update({
			content: `Vous avez refusez l'echange avec \`${button.message.embeds[0].footer.text}\``,
			embeds: [],
			components: [],
		});
	},
};
