module.exports = {
	name: 'messageReactionAdd',
	run: async (client, messageReaction, user) => {
		const handleAddReaction = async () => {
			let role = messageReaction.message.guild.roles.resolve('968434207200272384');
			let member = await messageReaction.message.guild.members.resolve(user.id);
			member.roles.add(role);
		};
		console.log('24');
		const filter = (reaction) => reaction.emoji.name === 'white_check_mark' && reaction.id === 968242045166682143;
		messageReaction.message.awaitReactions({ filter }).then(handleAddReaction());
	},
};
