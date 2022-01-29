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
        //await client.addInventory('dague en bois', message.member);
        //const inventoryafterAdd = await client.getInventory(message.member);
        //console.log(inventoryafterAdd);
        //await client.removeInventory('épée en bois', message.member);
        //const inventoryafterRemove = await client.getInventory(message.member);
        //console.log(inventoryafterRemove)
        //const wooden_sword = await client.createItem('épée en bois', 1,0,0,2,0,0, 'MH', message);
        //const items = await client.getItem('épée en bois');
        //console.log(items)
        //const chevalier = await client.createClasse('Guerrier', 5,5,5,5,5,5,message)
        //const classes = await client.getClasse('Chevalier');
        //console.log(classes);
        //const human = await client.createRace('Human',1,1,1,1,1,1,message);
        //const race = await client.getRace('human');
        //console.log(race);
        //const slime = await client.createMonster('slime',1,1,1,1,message);
        //const monster = await client.getMonster('slime');
        //console.log(monster);
        //const ColumnName = await client.getColumnName('equipement')
        //await client.addEquipement('épée en bois', message.member, null, message )
        //const user = await client.getUser(message.member);
        //console.log(user);
        //await client.removeItem('dague en bois').then(() => console.log('Dague en bois remove'))
        //await client.removeItem('épée en bois').then(() => console.log('épée en bois remove'))
        //await client.removeMonster('slime').then(() => console.log('Slime remove'))
        //await client.removeRace('human').then(() => console.log('human remove'))
        //await client.removeClasse('Chevalier', message)
        //const stat = await client.getStats(message.member);
        //console.log(stat)
        //await client.updateCompetence('attaque', 1, message.member, null, message)
        //    .then(() => console.log('Attribut added'))
        await client.createUserInfo(message.member,'Guerrier', 'human', message)
    }
}