const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const Builders = require('@discordjs/builders');
const { raphael } = require('../../../Structures/database/connect');
const { capitalize } = require('../../../function/other/string');
function createOptionSelectMenu(label, value) {
	let MenuOption = new Builders.SelectMenuOption();

	MenuOption.setLabel(label);
	MenuOption.setValue(value);

	return MenuOption;
}
module.exports = {
	name: 'setup',
	exemple: 'setup',
	usage: 'setup',
	description: 'Permet de crée et de selectionné sa race et sa classe',
	run: async (client, message) => {
		let user = await client.getUser(message.member);
		if (user && user['RACE'] !== 'null' && user['CLASSES'] !== 'null') return message.reply('You already have Character');
		if (!user) await client.createUserInfo(message.member, null, null, message);
		const races = await raphael.query(`select * from raphael.races`).then((rows, err) => {
			if (err) throw err;
			return rows;
		});
		const racesList = [];
		for (let i = 0; races.length > i; i++) {
			racesList.push(createOptionSelectMenu(capitalize(races[i]['NAME']), races[i]['NAME']));
		}
		if (racesList.length === 0) return message.reply('Any Races in database, please contact creator');
		const Race = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('race').setPlaceholder('Choose Race').setOptions(racesList));
		const classes = await raphael.query(`select * from raphael.classes`).then((rows, err) => {
			if (err) throw err;
			return rows;
		});
		const classesList = [];
		for (let i = 0; classes.length > i; i++) {
			classesList.push(createOptionSelectMenu(capitalize(classes[i]['NAME']), classes[i]['NAME']));
		}
		if (classesList.length === 0) return message.reply('Any Classes in database, please contact creator');
		const Classe = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId('classe').setPlaceholder('Choose Classe').setOptions(classesList));
		message.reply({
			content: 'Race Select Menu',
			components: [Race],
			allowedMentions: {
				repliedUser: false,
			},
		});
		message.channel.send({
			content: 'Classe Select Menu',
			components: [Classe],
			allowedMentions: {
				repliedUser: false,
			},
		});
	},
};
