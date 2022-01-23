const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'test',
    run : async (client, message, args, logChannel) => {
        //const guild = await client.getGuild(message.guildId);
        //console.log(guild);
        //const owner = await client.getUser(message.member);
        //console.log(owner);
        //const updatedUser = await client.updateUserInfo(message.member, 10,10);
        //console.log(updatedUser)
        //const inventory = await client.getInventory(message.member);
        //console.log(inventory);
        await client.addInventory('dague en bois', message.member);
        const inventoryafterAdd = await client.getInventory(message.member);
        console.log(inventoryafterAdd);
        //await client.removeInventory('épée en bois', message.member);
        //const inventoryafterRemove = await client.getInventory(message.member);
        //console.log(inventoryafterRemove)
        //await client.createItem('épée en bois', 1,0,0,1,0,0, 'MH', message);
    }
}