const {capitalize} = require("../../function/other/string");
const {MessageActionRow, MessageSelectMenu} = require("discord.js");
const Builders = require("@discordjs/builders");
function createOptionSelectMenuBuyHdv(label, quantity, price) {
    let MenuOption = new Builders.SelectMenuOption();
    MenuOption.setLabel(label);
    MenuOption.setValue(label);
    MenuOption.setDescription(`Quantity: ${quantity} | Price: ${price}`)
    return MenuOption;
}
module.exports = {
    name : 'nhdv',
    run : async(client, button) => {
        let itemList = [];
        let hdvItem = await client.getHdv(button.member);
        for(let i = 0; hdvItem.length > i ; i++) {
            let item = await client.getItem(hdvItem[i]['ITEM_NAME']);
            itemList.push(createOptionSelectMenuBuyHdv(capitalize(item['ITEM_NAME'])))
        }
        if(itemList == false) return button.reply({content: 'HDV vide'})
        let rows = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('bhdv')
                .setPlaceholder('Select item to buy')
                .setOptions(itemList)
        )
        await button.update({
            components: [rows]
        })
    }
}