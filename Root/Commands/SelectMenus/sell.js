const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { capitalize } = require('../../function/other/string');
module.exports = {
	name: 'sell',
	run: async (client, interaction) => {
		const ChoiceButton = new MessageActionRow().addComponents(
			new MessageButton().setCustomId('sellY').setLabel('Yes').setStyle('SUCCESS'),
			new MessageButton().setCustomId('sellN').setLabel('No').setStyle('DANGER')
		);
		const item = await client.getItem(interaction.values[0]);
		const sellembed = new MessageEmbed()
			.setTitle(`Voulez-vous vraiment vendre => \`${capitalize(interaction.values[0])}\``)
			.addField(
				'Stats',
				`
                Attaque : ${item['ATTAQUE']} | Constitution : ${item['CONSTITUTION']}
                Agility : ${item['AGILITY']} | Esprit : ${item['ESPRIT']}
                Intelligence : ${item['INTELLIGENCE']} | Vitality : ${item['VITALITY']}
                `
			)
			.setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
		await interaction.update({
			embeds: [sellembed],
			components: [ChoiceButton],
		});
	},
};
