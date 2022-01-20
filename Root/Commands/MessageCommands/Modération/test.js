const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'test',
    run : async (client, message, args, logChannel) => {
        //const guild = await client.getGuild(message.guildId);
        //console.log(guild.GUILD_ID);
        const owner = await client.getUser(message.member);
        console.log(owner);
        //const updatedUser = await client.updateUserInfo(message.member, 10,10);
        //console.log(updatedUser)

    }
}