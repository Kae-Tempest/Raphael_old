const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Builders = require('@discordjs/builders');
function createOptionSelectMenu(value) {
	let MenuOption = new Builders.SelectMenuOption();
	MenuOption.setLabel('Dificulty: ' + value);
	MenuOption.setValue(`${value}`);
	return MenuOption;
}
module.exports = {
	name: 'donjon',
	usage: 'donjon',
	exemple: 'donjon ',
	description: 'Permet de faire un donjon de 100 étage à 1000 étages celon la difficulté',
	run: async (client, message) => {
		let difficultyList = [];
		for (let i = 1; difficultyList.length < 10; i++) {
			difficultyList.push(createOptionSelectMenu(i));
		}
		const rows = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('donjon').setPlaceholder('Select difficulty').setOptions(difficultyList));
		message.reply({
			components: [rows],
		});
		setTimeout(() => {
			message.delete();
		}, 10000);
	},
};
