const { MessageEmbed } = require('discord.js');
const { version } = require('../../../../package.json');
module.exports = {
	name: 'botinfo',
	aliases: ['BI'],
	usage: 'botInfo',
	description: 'Permet de voir les information du bot',
	exemple: 'botinfo || !BI',
	run: (client, message) => {
		let Hours = Math.floor((client.uptime / 1000 / 60 / 60) << 0);
		let Min = Math.floor((client.uptime / 1000 / 60) << 0);
		let Sec = Math.floor((client.uptime / 1000) % 60);
		for (let i = 0; Hours <= 9; i++) {
			Hours = '0' + Hours;
			break;
		}
		for (let i = 0; Min <= 9; i++) {
			Min = '0' + Min;
			break;
		}
		for (let i = 0; Sec <= 9; i++) {
			Sec = '0' + Sec;
			break;
		}
		const embed = new MessageEmbed().setAuthor({
			name: `${client.user.username} (${client.user.id})`,
			iconURL: client.user.displayAvatarURL({ dynamic: true }),
		}).setDescription(`Owner: [Kae Tempest](https://github.com/kae-tempest)
                Uptime: ${Hours + 'h ' + Min + 'min ' + Sec + 'sec '}
                ---
                User : ${client.users.cache.size}
                Serveur: ${client.guilds.cache.size}
                Salons: ${client.channels.cache.size}
                ---
                Version: ${version}
                `);
		message.channel.send({ embeds: [embed] });
	},
};
