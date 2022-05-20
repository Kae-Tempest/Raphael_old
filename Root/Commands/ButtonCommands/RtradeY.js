module.exports = {
	name: 'RtradeY',
	run: async (client, button) => {
		let user = button.user;
		let receiver = client.users.cache.find((user) => user.username === button.message.embeds[0].footer.text);

		await client.updateInventoryUserItem(button.message.embeds[0].fields[2].value, user, receiver);
		await client.updateInventoryUserItem(button.message.embeds[0].fields[0].value, receiver, user);

		await receiver.createDM().then(async (message) => {
			await message.send({
				content: `L'échange a bien été effectué`,
			});
		});
		await button.update({
			content: `L'échange a bien été effectué`,
			embeds: [],
			components: [],
		});
	},
};
