const Builders = require("@discordjs/builders");
const {MessageSelectMenu} = require("discord.js");
const {MessageActionRow} = require("discord.js");
const {capitalize} = require("../../../function/other/string");
function createOptionSelectMenu(label, value) {
    let MenuOption = new Builders.SelectMenuOption();

    MenuOption.setLabel(label);
    MenuOption.setValue(label);
    MenuOption.setDescription(`Quantité: ${value}`)

    return MenuOption;
}
module.exports = {
    name : 'enchantement',
    aliases: ['enchant'],
    usage: '!(enchant)ement',
    exemple: '!enchant | !enchantement',
    description: 'Permet d\'enchanter un item crafté',
    run: async (client, message) => {
        const user = await client.getUser(message.member);
        if(!user) return message.reply('User doesn\'t exists');
        const Inventory = await client.getInventory(message.member);
        const ItemsCanBeEnchanted = [];
        for (let i = 0; Inventory.length > i; i++){
            if(Inventory[i]['CRAFT_ITEM_ID'] !== null)ItemsCanBeEnchanted.push(Inventory[i])
        }
        const itemList = [];
        for(let i = 0; ItemsCanBeEnchanted.length > i; i++){
            itemList.push(createOptionSelectMenu(capitalize(ItemsCanBeEnchanted[i]['ITEM_NAME']), ItemsCanBeEnchanted[i]['QUANTITY']))
        }
        const SelectItem = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('enchantementselectItem')
                .setPlaceholder('Choose one Item')
                .addOptions(itemList)
        )
        message.reply({
            components: [SelectItem]
        })
    }
}