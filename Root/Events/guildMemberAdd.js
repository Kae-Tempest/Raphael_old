const { MessageEmbed } = require('discord.js');
const { raphael } = require('../Structures/database/connect');
module.exports = {
	name: 'guildMemberAdd',
	run: async (client, member) => {
		let GuildInfo = await raphael.query(`select * from guild where GUILD_ID = ${member.guild.id}`).then((rows, err) => {
			if (err) throw err;
			return rows[0];
		});
		let logChannel = GuildInfo['LogChannel'] === null ? '778288246806806558' : GuildInfo['LogChannel'];
		const embed = new MessageEmbed()
			.setAuthor({ name: `${member.user.username} a rejoint le serveur.`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
			.setFooter({ text: `Membres: ${member.guild.memberCount.toLocaleString()}` })
			.setTimestamp();
		await client.channels
			.resolve(logChannel)
			.send({ embeds: [embed] })
			.then(() => console.log(`guildMemberAdd -> Message envoyé pour ${member.user.tag}.`))
			.catch(() => console.log(`guildMemberAdd -> Le message n'a pas été envoyé pour ${member.user.tag}.`));
	},
};
