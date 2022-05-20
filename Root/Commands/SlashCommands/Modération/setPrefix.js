module.exports = {
	name: 'setprefix',
	description: "ajoute un streamer a la liste d'annoncement",
	options: [
		{
			name: 'prefix',
			type: 'STRING',
			description: 'prefix',
			required: true,
		},
	],
	defaultPermission: 'BAN_MEMBERS',
	run: async (client, interaction) => {
		await client.setPrefix(interaction.options.getString('prefix'), interaction.guildId).then(() =>
			interaction.reply({
				content: `Prefix succefully changed | Prefix = ${interaction.options.getString('prefix')}`,
			})
		);
	},
};
