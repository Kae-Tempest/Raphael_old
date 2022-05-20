module.exports = async function (client, message, command, isInteraction, interactionType) {
	let GuildInfo = message.guild === null ? undefined : await client.getGuild(message.guild.id);
	let logChannel = GuildInfo === undefined ? undefined : GuildInfo['LogChannel'];
	if (!command) return;
	if (await require('./Cooldown')(client, message, command, isInteraction, interactionType)) return;
	else if (await require('./OwnerOnly')(message, command)) return;
	else if (await require('./UserPermissions')(message, command)) return;
	else if (await require('./ClientPermissions')(message, command)) return;
	else if (await require('./AnyUserPermissions')(message, command)) return;
	else if (await require('./AnyClientPermissions')(message, command)) return;
	else if (await require('./RequiredAnyRole')(message, command)) return;
	else if (await require('./RequiredRoles')(message, command)) return;
	else if (await require('./OnlyChannels')(message, command)) return;
	else if (await require('./OnlyGuilds')(message, command)) return;
	else if (await require('./OnlyUsers')(client, message, command)) return;
	else {
		if (isInteraction) command.run(client, message, logChannel);
		else {
			let Guildprefix = await client.getPrefix(message.guildId);
			let prefix = Guildprefix.prefix;
			if (!message.content.toLowerCase().startsWith(prefix)) return;
			const cmdName = message.content.trim().toLowerCase().slice(prefix.length).trim().split(' ')[0];
			const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.messageCommands.aliases.get(cmdName));
			if (!command) return;
			let args = message.content.slice(prefix.length).trim();
			if (args.toLowerCase().startsWith(cmdName)) args = args.slice(cmdName.length).trim().split(' ');
			command.run(client, message, args, logChannel);
		}
	}
};
