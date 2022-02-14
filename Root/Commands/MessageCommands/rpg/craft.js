const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'craft',
    usage: '!craft <item_name>',
    exemple: '!craft épée',
    description: 'Permet de fabriquer un item',
    run: async (client, message, args) => {
        if(args === '') return message.reply('On craft pas l\'air');
        const itemName = args.join(' ');
        const craftItem = await client.getCraftItem(itemName, message);
        const Inventory = await client.getInventory(message.member);
        const HaveItem = Inventory.find(blueprint => blueprint['ITEM_NAME'] === `BP${itemName}`);
        if(HaveItem === undefined) return message.reply('You don\'t have BluePrint');
        let HaveMaterials = []
        for(let i = 0; craftItem["materials"].length > i; i++){
            const haveMat = Inventory.find(materials => materials['ITEM_NAME'] === craftItem['materials'][i])
            if(haveMat === undefined) return message.reply(`Material Missing ${craftItem['materials'][i]}`)
            HaveMaterials.push(craftItem['materials'][i])
        }
        for(let i = 0; HaveMaterials.length > i ; i++){
            await client.removeInventory(HaveMaterials[i], message.member);
        }
        await client.removeInventory(`BP${itemName}`, message.member)
        let rarity = Math.floor(Math.random() * (5 - 1) + 1) + 1;
        let rarityName;
        switch (rarity) {
            case 1:
                rarityName = 'Commun';
                rarity = 1
                break;
            case 2:
                rarityName = 'Rare';
                rarity = 3
                break;
            case 3:
                rarityName = 'Hyper Rare';
                rarity = 5
                break;
            case 4:
                rarityName = 'Legendary';
                rarity = 10
                break;
            case 5:
                rarityName = 'God Tier'
                rarity = 15
                break;
        }
        const strength = craftItem['strength'] * rarity
        const constitution = craftItem['constitution'] * rarity
        const agility = craftItem['agility'] * rarity
        const spirit = craftItem['spirit'] * rarity
        const intelligence = craftItem['intelligence'] * rarity
        const vitality = craftItem['vitality'] * rarity
        const name = `${rarityName}_${args}`
        await client.createCraftedItem(message.member, name ,strength, constitution, agility, spirit, intelligence, vitality, craftItem['emplacement'])
        await client.addInventory(name, message.member);
        const embed = new MessageEmbed()
            .setAuthor({name: message.member.user.username, iconURL: message.member.user.displayAvatarURL({dynamic: true})})
            .addField('Rarity', `${rarityName}`)
            .addField('Name', `${name}`)
            .addField('Stats',
                `
                Attaque : ${strength}
                Constitution : ${constitution}
                Agility : ${agility}
                Esprit : ${spirit}
                Intelligence : ${intelligence}
                Vitality : ${vitality}
                `)
            .setTimestamp()
        return message.channel.send({embeds: [embed]})
    }
}