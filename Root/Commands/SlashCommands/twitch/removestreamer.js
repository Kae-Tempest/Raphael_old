module.exports = {
	name: 'removestreamer',
	description: "ajoute un streamer a la liste d'annoncement",
	options: [
		{
			name: 'name',
			type: 'STRING',
			description: 'name of streamer',
			required: true,
		},
	],
	defaultPermission: 'BAN_MEMBERS',
	run: async (client, interaction) => {
		let streamer = await client.getStreamer(interaction.options.getString('name'));
		if (!streamer)
			return interaction.reply({
				content: `Unknow Streamer`,
			});
		await client.removeStreamer(interaction.options.getString('name'), interaction.guildId, interaction);
		return interaction.reply({
			content: `${interaction.options.getString('name')} à bien été retirer de la liste des streamers`,
		});
	},
};
