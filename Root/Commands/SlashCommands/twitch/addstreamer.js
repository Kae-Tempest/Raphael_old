module.exports = {
	name: 'addstreamer',
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
		if (streamer !== null) {
			await client.addStreamer(interaction.options.getString('name'), interaction.guildId);
			return interaction.reply({
				content: `${interaction.options.getString('name')} à bien été ajouter a la liste des streamers`,
			});
		}
	},
};
