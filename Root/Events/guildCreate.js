const { raphael } = require('../Structures/database/connect');
module.exports = {
	name: 'guildCreate',
	run: async (client, guild) => {
		let guilds = await raphael.query(`select * from guild where GUILD_ID = ${guild.id}`).then((rows, err) => {
			if (err) throw err;
			return rows[0];
		});
		if (!guilds) {
			console.log('New Server');
			await raphael
				.query(
					`insert into guild (GUILD_ID)
                                 values (${guild.id})`
				)
				.then((rows, err) => {
					if (err) throw err;
					return rows;
				});
		}
	},
};
