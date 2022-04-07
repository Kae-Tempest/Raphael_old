const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const Builders = require("@discordjs/builders");
const {capitalize} = require("../../../function/other/string");
function createOptionSelectMenu(label) {
    let MenuOption = new Builders.SelectMenuOption();
    MenuOption.setLabel(label);
    MenuOption.setValue(label);
    return MenuOption;
}
module.exports = {
    name: 'trade',
    usage: 'trade @User',
    exemple: 'trade @Kae-Tempest#0001',
    description: 'Permet d\'échanger un item avec un autre joueur',
    run: async (client, message, args) => {
        let player = args[0]
        const user = await client.getUser(message.member);
        if(!user) return message.reply('User doesn\'t exists');
        const Inventory = await client.getInventory(message.member);
        const itemList = []
        for(let i = 0; Inventory.length > i; i++){
            let item = await client.getItem(Inventory[i]['ITEM_NAME']);
            itemList.push(createOptionSelectMenu(capitalize(item['ITEM_NAME'])))
        }
        if(itemList == false) return message.reply({content: "tu n'as pas d'item a échanger"})
        const rows = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('trade')
                .setPlaceholder('Choose item to trade')
                .setOptions(itemList)
        )
        await message.author.send({
            content: `Choisisez l'item que vous voulez echanger a ${player}`,
            components: [rows]
        });
    }
}
