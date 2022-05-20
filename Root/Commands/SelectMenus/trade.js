const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { capitalize } = require('../../function/other/string');
module.exports = {
	name: 'trade',
	run: async (client, interaction) => {
		let player = client.users.cache.find((user) => user.username === interaction.message.content.slice(44));
		const ChoiceButton = new MessageActionRow().addComponents(
			new MessageButton().setCustomId('DtradeY').setLabel('Yes').setStyle('SUCCESS'),
			new MessageButton().setCustomId('DtradeN').setLabel('No').setStyle('DANGER')
		);
		const item = await client.getItem(interaction.values[0]);
		const itemEmbed = new MessageEmbed()
			.setTitle(`Voulez-vous vraiment faire une demande d'échanger à ${player.username} pour \`${capitalize(interaction.values[0])}\``)
			.addFields(
				{ name: 'Item:', value: interaction.values[0] },
				{
					name: 'Stats:',
					value: `
                Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}`,
				}
			)
			.setTimestamp()
			.setFooter({ text: player.username });
		await interaction.update({
			embeds: [itemEmbed],
			components: [ChoiceButton],
		});
	},
};
