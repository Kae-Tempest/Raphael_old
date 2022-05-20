const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	name: 'rtrade',
	run: async (client, interaction) => {
		let player = client.users.cache.find((user) => user.username === interaction.message.embeds[0].footer.text);
		let itemName = interaction.message.embeds[0].fields[0].value;
		let item = await client.getItem(itemName);
		await player.createDM().then(async (message) => {
			const itemEmbed = new MessageEmbed()
				.setTitle(`${interaction.user.username} te propose pour l'échange \`${interaction.values[0]}\``)
				.addFields(
					{ name: 'Item:', value: interaction.values[0] },
					{
						name: 'Stats:',
						value: `
                        Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                        Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                        Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}`,
					},
					{ name: 'Propose Item:', value: `${itemName}` }
				)
				.setTimestamp()
				.setFooter({ text: interaction.user.username });
			const buttonChoice = new MessageActionRow().addComponents(
				new MessageButton().setCustomId('RtradeY').setLabel('trade').setStyle('PRIMARY'),
				new MessageButton().setCustomId('RtradeN').setLabel('Cancel').setStyle('DANGER')
			);
			await message.send({
				embeds: [itemEmbed],
				components: [buttonChoice],
			});
		});

		interaction.update({
			content: `confirmation d'échange envoyer à ${player.username}`,
			embeds: [],
			components: [],
		});
	},
};
