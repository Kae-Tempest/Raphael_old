const chalk = require('chalk');
const { options } = require('../../Config');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'ready',
	once: true,
	run: async (client) => {
		client.user.setActivity('Création du RPG en cours... Veuillez patienter', {
			type: `PLAYING`,
		});
		console.log(chalk.bold.yellowBright('[Bot] ') + chalk.bold.blueBright(`Connected to ${client.user.tag}`));
		if (client.commands.messageCommands.size > 0) console.log(chalk.bold.redBright('[Handler]') + chalk.bold.greenBright(` Loaded ${client.commands.messageCommands.size} commands.`));
		if (client.commands.messageCommands.aliases.size > 0)
			console.log(chalk.bold.whiteBright('[Handler]') + chalk.bold.magentaBright(` Loaded ${client.commands.messageCommands.aliases.size} aliases.`));
		if (client.events.size > 0) console.log(chalk.bold.greenBright('[Handler]') + chalk.bold.cyanBright(` Loaded ${client.events.size} events.`));
		if (client.commands.buttonCommands.size > 0) console.log(chalk.bold.yellow('[Handler]') + chalk.bold.blue(` Loaded ${client.commands.buttonCommands.size} buttons.`));
		if (client.commands.selectMenus.size > 0) console.log(chalk.bold.white('[Handler]') + chalk.bold.green(` Loaded ${client.commands.selectMenus.size} selectMenus.`));
		if (client.commands.slashCommands.size > 0) console.log(chalk.bold.red('[Handler]') + chalk.bold.yellow(` Found ${client.commands.slashCommands.size} slashCommands. Starting to load.`));
		if (client.commands.contextMenus.size > 0) console.log(chalk.bold.greenBright('[Handler]') + chalk.bold.cyanBright(` Found ${client.commands.contextMenus.size} contextMenus. Starting to load.`));

		let StreamOnList = [];
		(TwitchData = async () => {
			setInterval(async () => {
				let streamer = await client.getAllStreamerName();
				let twitchAPI = `https://api.twitch.tv/helix/streams?user_login=${streamer.map((n) => n).join('&user_login=')}`;
				let res = await fetch(twitchAPI, options);
				let data = await res.json();
				sendEmbed(data);
			}, 20000);
		})();
		let sendEmbed = async (data) => {
			let streamList = data.data;
			if (streamList === undefined) return;
			for (let i = 0; streamList.length > i; i++) {
				if (!StreamOnList.find((stream) => stream === streamList[i]['user_login'])) {
					let streamerGuilds = await client.getStreamer(streamList[i]['user_login']);
					let Guilds = JSON.parse(streamerGuilds['GUILD']);
					let res = await fetch(`https://api.twitch.tv/helix/users?login=${streamList[i]['user_login']}`, options);
					let StreamerData = await res.json();
					StreamOnList.push(streamList[i]['user_login']);
					let imgstream = streamList[i]['thumbnail_url'].slice(0, streamList[i]['thumbnail_url'].length - 20);
					const embed = new MessageEmbed()
						.setAuthor({ name: `${streamList[i]['user_name']} est en stream`, iconURL: StreamerData.data[0]['profile_image_url'] })
						.setThumbnail(StreamerData.data[0]['profile_image_url'])
						.setDescription(`[${streamList[i]['title']}](https://www.twitch.tv/${streamList[i]['user_login']})`)
						.addField(`Viewers`, `${streamList[i]['viewer_count']}`, true)
						.setImage(`${imgstream}750x450.jpg`)
						.setTimestamp();
					for (let i = 0; Guilds.length > i; i++) {
						let GuildInfo = await client.getGuild(Guilds[i]);
						client.channels.resolve(GuildInfo['LogChannel']).send({
							embeds: [embed],
						});
					}
				}
			}
			if (StreamOnList !== []) {
				for (let i = 0; StreamOnList.length > i; i++) {
					if (!streamList.find((stream) => stream['user_login'] === StreamOnList[i])) {
						StreamOnList.splice(i, 1);
					}
				}
			}
		};
	},
};
