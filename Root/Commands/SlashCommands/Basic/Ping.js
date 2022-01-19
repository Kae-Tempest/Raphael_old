const {MessageEmbed} = require('discord.js')
module.exports = {
	name: "ping",
	description: "Run this to see my ping.",
	run: async(client, interaction) => {
		const ping = new MessageEmbed()
		.setColor('RANDOM')
		.setTimestamp()
		.setTitle('🏓╎ Pong!')
		.setDescription(`🏠╎Websocket Latency: ${client.ws.ping}ms\n🤖╎Bot Latency: ${Date.now() - interaction.createdTimestamp}ms`);
		interaction.reply({ embeds: [ping] })
	}
}