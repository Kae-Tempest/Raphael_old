/*
   ▄████████    ▄████████    ▄███████▄    ▄█    █▄       ▄████████    ▄████████  ▄█               ▄███████▄    ▄████████  ▄██████▄       ▄█    ▄████████  ▄████████     ███
  ███    ███   ███    ███   ███    ███   ███    ███     ███    ███   ███    ███ ███              ███    ███   ███    ███ ███    ███     ███   ███    ███ ███    ███ ▀█████████▄
  ███    ███   ███    ███   ███    ███   ███    ███     ███    ███   ███    █▀  ███              ███    ███   ███    ███ ███    ███     ███   ███    █▀  ███    █▀     ▀███▀▀██
 ▄███▄▄▄▄██▀   ███    ███   ███    ███  ▄███▄▄▄▄███▄▄   ███    ███  ▄███▄▄▄     ███              ███    ███  ▄███▄▄▄▄██▀ ███    ███     ███  ▄███▄▄▄     ███            ███   ▀
▀▀███▀▀▀▀▀   ▀███████████ ▀█████████▀  ▀▀███▀▀▀▀███▀  ▀███████████ ▀▀███▀▀▀     ███            ▀█████████▀  ▀▀███▀▀▀▀▀   ███    ███     ███ ▀▀███▀▀▀     ███            ███
▀███████████   ███    ███   ███          ███    ███     ███    ███   ███    █▄  ███              ███        ▀███████████ ███    ███     ███   ███    █▄  ███    █▄      ███
  ███    ███   ███    ███   ███          ███    ███     ███    ███   ███    ███ ███▌    ▄        ███          ███    ███ ███    ███     ███   ███    ███ ███    ███     ███
  ███    ███   ███    █▀   ▄████▀        ███    █▀      ███    █▀    ██████████ █████▄▄██       ▄████▀        ███    ███  ▀██████▀  █▄ ▄███   ██████████ ████████▀     ▄████▀
  ███    ███                                                                    ▀                             ███    ███            ▀▀▀▀▀▀
*/
(async () => {
	const { Client, Collection, Intents } = require('discord.js');
	const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_PRESENCES,
			Intents.FLAGS.DIRECT_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
			Intents.FLAGS.GUILD_MEMBERS,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
			Intents.FLAGS.GUILD_WEBHOOKS,
			Intents.FLAGS.GUILD_VOICE_STATES,
			Intents.FLAGS.GUILD_INVITES,
			Intents.FLAGS.GUILD_BANS,
		],
		partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
	});
	exports.client = client;
	global.ROOT = {};
	ROOT.path = __dirname;
	ROOT.config = require('./Config');
	require('./Root/Utils/function')(client);
	client.commands = {};
	client.events = new Collection();
	client.commands.messageCommands = new Collection();
	client.commands.messageCommands.aliases = new Collection();
	client.commands.contextMenus = new Collection();
	client.commands.slashCommands = new Collection();
	client.commands.buttonCommands = new Collection();
	client.commands.selectMenus = new Collection();

	const Handler = require(`${ROOT.path}/Root/Structures/Handlers/Handler`);
	await Handler.loadMessageCommands(client);
	await Handler.loadEvents(client);
	await client.login(ROOT.config.token);
	await Handler.loadSlashCommands(client);
	await Handler.loadContextMenus(client);
	await Handler.loadButtonCommands(client);
	await Handler.loadSelectMenus(client);
	const DATABASE = require(`${ROOT.path}/Root/Structures/database/connect`);
})();

/*
   ▄████████    ▄████████    ▄███████▄    ▄█    █▄       ▄████████    ▄████████  ▄█               ▄███████▄    ▄████████  ▄██████▄       ▄█    ▄████████  ▄████████     ███
  ███    ███   ███    ███   ███    ███   ███    ███     ███    ███   ███    ███ ███              ███    ███   ███    ███ ███    ███     ███   ███    ███ ███    ███ ▀█████████▄
  ███    ███   ███    ███   ███    ███   ███    ███     ███    ███   ███    █▀  ███              ███    ███   ███    ███ ███    ███     ███   ███    █▀  ███    █▀     ▀███▀▀██
 ▄███▄▄▄▄██▀   ███    ███   ███    ███  ▄███▄▄▄▄███▄▄   ███    ███  ▄███▄▄▄     ███              ███    ███  ▄███▄▄▄▄██▀ ███    ███     ███  ▄███▄▄▄     ███            ███   ▀
▀▀███▀▀▀▀▀   ▀███████████ ▀█████████▀  ▀▀███▀▀▀▀███▀  ▀███████████ ▀▀███▀▀▀     ███            ▀█████████▀  ▀▀███▀▀▀▀▀   ███    ███     ███ ▀▀███▀▀▀     ███            ███
▀███████████   ███    ███   ███          ███    ███     ███    ███   ███    █▄  ███              ███        ▀███████████ ███    ███     ███   ███    █▄  ███    █▄      ███
  ███    ███   ███    ███   ███          ███    ███     ███    ███   ███    ███ ███▌    ▄        ███          ███    ███ ███    ███     ███   ███    ███ ███    ███     ███
  ███    ███   ███    █▀   ▄████▀        ███    █▀      ███    █▀    ██████████ █████▄▄██       ▄████▀        ███    ███  ▀██████▀  █▄ ▄███   ██████████ ████████▀     ▄████▀
  ███    ███                                                                    ▀                             ███    ███            ▀▀▀▀▀▀
*/
