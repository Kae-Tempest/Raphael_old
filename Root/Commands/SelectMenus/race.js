const { raphael } = require('../../Structures/database/connect');
module.exports = {
	name: 'race',
	run: async (client, interaction) => {
		await interaction.update({
			content: `Vous avez choisi ${interaction.values[0]}`,
			components: [],
		});
		await raphael.query(`update raphael.user set RACE = '${interaction.values[0]}' where USER_ID = ${interaction.user.id}`);
	},
};
