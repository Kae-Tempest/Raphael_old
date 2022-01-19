const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'test',
    run : async (client, message, args, logChannel) => {
        //const guild = await client.getGuild(message.guildId);
        //console.log(guild.GUILD_ID);
        //const owner = await client.getUser(message.member);
        //console.log(owner);
        //console.log(owner.USER_ID)
        //console.log(owner.LEVEL);
        //const updatedUser = await client.updateUserInfo(message.member, 10,10);
        //console.log(updatedUser)
        const player_stats = await client.getStats(message.member);
        console.log(player_stats)

    }
}