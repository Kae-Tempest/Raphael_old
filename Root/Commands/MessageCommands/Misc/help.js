const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Builders = require('@discordjs/builders');
const { capitalize } = require('../../../function/other/string');
function createOptionSelectMenu(name, value) {
	let MenuOption = new Builders.SelectMenuOption();

	MenuOption.setLabel(name);
	MenuOption.setValue(value);
	MenuOption.setDescription(`${name} Help Command`);

	return MenuOption;
}
module.exports = {
	name: 'help',
	usage: 'help',
	exemple: 'help',
	description: "La commande Help permet de voir l'utilisation de la commande selectionnée",
	run: async (client, message) => {
		const commandsList = client.commands.messageCommands;
		const commandName = commandsList.map((cmd) => cmd.name);
		const commandList = [];
		for (let i = 0; commandName.length > i; i++) {
			if (commandsList.find((cmd) => cmd.name === 'eval').name === commandName[i]) continue;
			if (commandsList.find((cmd) => cmd.name === 'exec').name === commandName[i]) continue;
			if (commandsList.find((cmd) => cmd.name === 'mute').name === commandName[i]) continue;
			if (commandsList.find((cmd) => cmd.name === 'test').name === commandName[i]) continue;
			if (commandsList.find((cmd) => cmd.name === commandName[i]).ownerOnly === true) continue;
			commandList.push(createOptionSelectMenu(capitalize(commandName[i]), commandName[i]));
		}
		const rows = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('help').setPlaceholder('Choose command').setOptions(commandList));
		message.reply({
			content: 'Help Select Menu',
			components: [rows],
			allowedMentions: {
				repliedUser: false,
			},
		});
	},
};
