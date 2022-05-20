const { raphael } = require('../../Structures/database/connect');
module.exports = {
	name: 'classe',
	run: async (client, interaction) => {
		await interaction.update({
			content: `Vous avez choisi ${interaction.values[0]}`,
			components: [],
		});
		await raphael.query(`update raphael.user set CLASSES = '${interaction.values[0]}' where USER_ID = ${interaction.user.id}`);
		const classe = await client.getClasse(interaction.values[0]);
		const user = await client.getUser(interaction.member);
		await raphael.query(`update raphael.user set
                        ATTAQUE = ${classe['ATTAQUE']},
                        CONSTITUTION = ${classe['CONSTITUTION']},
                        AGILITY = ${classe['AGILITY']},
                        ESPRIT = ${classe['ESPRIT']},
                        INTELLIGENCE = ${classe['INTELLIGENCE']},
                        VITALITY = ${classe['VITALITY'] + user['VITALITY']}
                        where USER_ID = ${user['USER_ID']}
                        `);
	},
};
